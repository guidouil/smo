Template.myOfficeCalendar.onCreated(function(){
  this.closedDays = new ReactiveVar([]);
});

Template.myOfficeCalendar.onRendered(function () {
  let template = this;
  $('.checkbox').checkbox();
  $('#openAt').pickatime({
    formatLabel: 'Ouvert à H:i',
  });
  $('#closeAt').pickatime({
    formatLabel: 'Fermé à H:i',
  });
  let office = Offices.findOne({_id: Router.current().params.officeId});
  if (office) {
    let closedDays = openDaysToClosedNumbers(office.openDays);
    _.each( office.availabilities, function( availability ) {
      closedDays.push(availability.date);
    });
    if (closedDays) {
      template.closedDays.set(closedDays);
      $('#startAt').pickadate({
        disable: closedDays,
      });
    } else {
      $('#startAt').pickadate();
    }
    $('.userIcon').popup({hoverable: true});
  }
});

Template.myOfficeCalendar.helpers({
  office () {
    return Offices.findOne({_id: Router.current().params.officeId});
  },
  isOpen (day) {
    let office = Offices.findOne({_id: Router.current().params.officeId});
    if (office && office.openDays[day] === true) {
      return 'checked';
    }
    return '';
  },
  days () {
    return [
      {
        value: 'monday',
        label: 'lundi',
      },
      {
        value: 'tuesday',
        label: 'mardi',
      },
      {
        value: 'wednesday',
        label: 'mercredi',
      },
      {
        value: 'thursday',
        label: 'jeudi',
      },
      {
        value: 'friday',
        label: 'vendredi',
      },
      {
        value: 'saturday',
        label: 'samedi',
      },
      {
        value: 'sunday',
        label: 'dimanche',
      },
    ];
  },
  sortDate (availabilities) {
    check(availabilities, Array);
    let yesterday = new Date(); // today
    yesterday.setDate(yesterday.getDate() - 1); // yesterday
    availabilities = _.filter( availabilities, function (availability) {
      if (availability.date > yesterday) {
        return true;
      }
    });
    return _.sortBy(availabilities, 'date').reverse();
  },
});

Template.myOfficeCalendar.events({
  'click .saveOpenHours' () {
    $('.field').removeClass('error');
    let openDays = {};
    $('.day').each(function(index, el) {
      openDays[el.id] = el.checked;
    });
    let openAt = $('#openAt').val();
    let closeAt = $('#closeAt').val();
    if (!openAt) {
      $('#openAt').parent('.field').addClass('error');
      return false;
    }
    if (!closeAt) {
      $('#closeAt').parent('.field').addClass('error');
      return false;
    }
    if (Number(openAt.replace(':', '')) > Number(closeAt.replace(':', ''))) {
      $('#openAt').parent('.field').addClass('error');
      $('#closeAt').parent('.field').addClass('error');
      return false;
    }
    Offices.update({_id: Router.current().params.officeId}, {$set: {
      openDays: openDays,
      openAt: openAt,
      closeAt: closeAt,
    }});
    return true;
  },
  'click .addAvailability' () {
    $('.field').removeClass('error');
    let startAt = $('#startAt_hidden').val();
    let endAt = $('#endAt_hidden').val();

    if (!startAt) {
      $('#startAt').parent('.field').addClass('error');
      return false;
    }
    if (!endAt) {
      $('#endAt').parent('.field').addClass('error');
      return false;
    }
    startAt = new Date(startAt + ' ' + $('#openAt').val());
    endAt = new Date(endAt + ' ' + $('#closeAt').val());
    if (startAt > endAt) {
      $('#startAt').parent('.field').addClass('error');
      $('#endAt').parent('.field').addClass('error');
      return false;
    }
    let itr = moment.twix(startAt, endAt).iterate('days');
    let range = [];
    while (itr.hasNext()) {
      range.push(itr.next().toDate());
    }
    let office = Offices.findOne({_id: Router.current().params.officeId});
    let disabledDays = openDaysToClosedNumbers(office.openDays);
    _.each( range, function(availabilityDate) {
      if (! _.contains( disabledDays, Number(moment(availabilityDate).format('d')))) {
        let availability = {
          date: availabilityDate,
          available: true,
          creator: Meteor.userId(),
          createdAt: new Date(),
        };
        Offices.update({_id: office._id}, {$push: {
          availabilities: availability,
        }});
      }
    });
    $('#startAt').val('');
    $('#endAt').val('');
    Router.go('agenda', {officeId: office._id});
    return true;
  },
  'click .deleteAvailability' () {
    Offices.update({_id: Router.current().params.officeId}, {$pull: {
      availabilities: this,
    }});
  },
  'change #startAt' () {
    let closedDays = Template.instance().closedDays.get();
    $('#endAt').data('value', $('#startAt_hidden').val());
    $('#endAt').removeAttr('disabled');
    $('#endAt').pickadate({
      min: new Date($('#startAt_hidden').val()),
      disable: closedDays,
    });
  },
});
