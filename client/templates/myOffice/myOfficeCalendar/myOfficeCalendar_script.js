let moment = require('moment');
require('twix');

Template.myOfficeCalendar.onCreated(function(){
  this.closedDays = new ReactiveVar([]);
});

Template.myOfficeCalendar.onRendered(function () {
  let template = this;
  $('.checkbox').checkbox();
  let office = Offices.findOne({_id: Router.current().params.officeId});
  if (office) {
    let closedDays = openDaysToClosedNumbers(office.openDays);
    _.each( office.availabilities, function( availability ) {
      closedDays.push(availability.date);
    });
    if (closedDays) {
      template.closedDays.set(closedDays);
      let startAtInput = $('#startAt').pickadate({
        disable: closedDays,
      });
      startAtPicker = startAtInput.pickadate('picker');
      let endAtInput = $('#endAt').pickadate({
        disable: closedDays,
      });
      endAtPicker = endAtInput.pickadate('picker');
    }
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
  toPeriod (duration) {
    check(duration, String);
    switch (duration) {
    default:
    case 'allDay':
      return 'Journée';
    case 'morning':
      return 'Matin';
    case 'afternoon':
      return 'Après-midi';
    }
  },
});

Template.myOfficeCalendar.events({
  'click .addAvailability' () {
    $('.field').removeClass('error');
    $('.fields').removeClass('error');
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
    let duration = 'day';
    $('.duration').each(function(index, el) {
      if (el.checked === true) {
        duration = el.value;
      }
    });
    let startTime = '8:00';
    let endTime = '18:00';
    if (duration === 'am') {
      endTime = '12:00';
    } else if (duration === 'pm') {
      startTime = '13:00';
    }
    startAt = moment(startAt + ' ' + startTime).toDate();
    endAt = moment(endAt + ' ' + endTime).toDate();
    if (startAt > endAt) {
      $('#startAt').parent('.field').addClass('error');
      $('#endAt').parent('.field').addClass('error');
      return false;
    }
    let itr = moment.twix(startAt, endAt).iterate('days');
    let office = Offices.findOne({_id: Router.current().params.officeId});
    let range = [];
    while (itr.hasNext()) {
      range.push(itr.next().toDate());
    }
    let disabledDays = openDaysToClosedNumbers(office.openDays);
    let groupId = Random.id();
    let lastAvailabilityDate = false;
    _.each(range, function(availabilityDate) {
      if (! _.contains( disabledDays, Number(moment(availabilityDate).format('d')))) {
        let availability = {
          groupId: groupId,
          date: availabilityDate,
          available: true,
          startTime: startTime,
          endTime: endTime,
          creator: Meteor.userId(),
          createdAt: new Date(),
        };
        Offices.update({_id: office._id}, {$push: {
          availabilities: availability,
        }});
        lastAvailabilityDate = availabilityDate;
      }
    });
    let nextAvailableDate = moment(lastAvailabilityDate).add(1, 'day').toDate();
    startAtPicker.set('min', nextAvailableDate).clear();
    endAtPicker.set('min', nextAvailableDate).clear();
    return true;
  },
  'click .deleteAvailability' () {
    Offices.update({_id: Router.current().params.officeId}, {$pull: {
      availabilities: this,
    }});
  },
  'change #startAt' () {
    let startAtDate = moment($('#startAt_hidden').val()).toDate();
    endAtPicker.set({
      'min': startAtDate,
      'select': startAtDate,
    });
  },
  // 'change #startTime' () {
  //   let opens =  $('#startTime_hidden').val().split(':');
  //   let min = moment().startOf('day').add(opens[0], 'hours').add(opens[1], 'minutes').add(4, 'hours').toDate();
  //   endTimePicker.set({
  //     'min': min,
  //     'select': min,
  //   });
  // },
});
