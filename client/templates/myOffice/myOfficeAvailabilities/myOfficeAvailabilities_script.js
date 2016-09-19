let moment = require('moment');
require('twix');

Template.myOfficeAvailabilities.onCreated(function () {
  this.subscribe('Office', Router.current().params.officeId);
  this.subscribe('Reservations', Router.current().params.officeId);
  this.closedDays = new ReactiveVar([]);
});

Template.myOfficeAvailabilities.onRendered(function () {
  let template = this;
  $('.checkbox').checkbox();
  let office = Offices.findOne({_id: Router.current().params.officeId});
  if (office) {
    let closedDays = [6, 7];
    if (office.availabilities && office.availabilities.length > 0) {
      _.each(office.availabilities, function (availability) {
        closedDays.push(availability.date);
      });
    }
    let reservations = Reservations.find({officeId: Router.current().params.officeId}).fetch();
    if (reservations && reservations.length > 0) {
      _.each(reservations, function (reservation) {
        closedDays.push(reservation.day);
      });
    }
    if (closedDays) {
      template.closedDays.set(closedDays);
      $('#startAt').pickadate({
        firstDay: 1,
        min: new Date(),
        formatSubmit: 'yyyy-mm-dd',
        format: 'dd/mm/yyyy',
        disable: closedDays,
      });
      $('#endAt').pickadate({
        firstDay: 1,
        min: new Date(),
        formatSubmit: 'yyyy-mm-dd',
        format: 'dd/mm/yyyy',
        disable: closedDays,
      });
    }
  }
});

Template.myOfficeAvailabilities.helpers({
  office () {
    return Offices.findOne({_id: Router.current().params.officeId});
  },
  selectedDate () {
    if (Session.get('searchedDate')) {
      return moment(Session.get('searchedDate')).format('YYYY-MM-DD');
    }
    return '';
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

Template.myOfficeAvailabilities.events({
  'click .addAvailability' (evt, tmpl) {
    $('.field').removeClass('error');
    $('.fields').removeClass('error');
    let startAt = $('[name="startAt_submit"]').val();
    let endAt = $('[name="endAt_submit"]').val();
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
    let closedDays = tmpl.closedDays.get();
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
        closedDays.push(availabilityDate);
      }
    });
    let startAtPicker = $('#startAt').pickadate('picker');
    startAtPicker.set('disable', false).set('disable', closedDays).clear().render();
    let endAtPicker = $('#endAt').pickadate('picker');
    endAtPicker.set('disable', false).set('disable', closedDays).clear().render();
    tmpl.closedDays.set(closedDays);
    Session.delete('searchedDate');
    return true;
  },
  'click .deleteAvailability' (evt, tmpl) {
    Offices.update({_id: Router.current().params.officeId}, {$pull: {
      availabilities: this,
    }});
    let closedDays = tmpl.closedDays.get();
    let removedDay = new Date(this.date);
    closedDays = _.reject(closedDays, function(disabledDay, index) {
      return moment(disabledDay).isSame(removedDay, 'day');
    });
    let startAtPicker = $('#startAt').pickadate('picker');
    startAtPicker.set('disable', false).set('disable', closedDays).clear().render();
    let endAtPicker = $('#endAt').pickadate('picker');
    endAtPicker.set('disable', false).set('disable', closedDays).clear().render();
    tmpl.closedDays.set(closedDays);
    Session.delete('searchedDate');
    return true;
  },
  'change #startAt' () {
    let startAtDate = moment($('[name="startAt_submit"]').val()).toDate();
    let endAtPicker = $('#endAt').pickadate('picker');
    endAtPicker.set({
      'min': startAtDate,
      'select': startAtDate,
    });
  },
});
