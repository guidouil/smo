let moment = require('moment');
require('twix');

Template.office.onCreated(function () {
  this.subscribe('Office', Router.current().params.officeId);
  this.subscribe('Reservations', Router.current().params.officeId);
  this.closedDays = new ReactiveVar([]);
});

Template.office.onRendered(function () {
  let template = this;
  Meteor.call('getDisabilities', Router.current().params.officeId, function (error, result) {
    if (result) {
      template.closedDays.set(result);
      $('#reservationDay').pickadate({
        firstDay: 1,
        min: new Date(),
        formatSubmit: 'yyyy-mm-dd',
        format: 'dd/mm/yyyy',
        disable: result,
      });
    }
  });
  Tracker.autorun(function () {
    let office = Offices.findOne({ _id: Router.current().params.officeId });
    if (office) {
      let availability = _.find( office.availabilities, function (availabilityItem) {
        if (Session.get('searchedDate')) {
          return availabilityItem.available === true && moment(Session.get('searchedDate')).isSame(availabilityItem.date, 'day');
        }
        return availabilityItem.available === true;
      });
      if (availability) {
        let opens = availability.startTime.split(':');
        let min = moment().startOf('day').add(opens[0], 'hours').add(opens[1], 'minutes').toDate();
        let closes = availability.endTime.split(':');
        let startMax = moment().startOf('day').add(closes[0], 'hours').add(closes[1], 'minutes').subtract(30, 'minutes').toDate();
        let endMax = moment().startOf('day').add(closes[0], 'hours').add(closes[1], 'minutes').toDate();
        $('#startTime').pickatime({
          format: 'HH:i',
          formatSubmit: 'HH:i',
          formatLabel: 'H:i',
          min: min,
          max: startMax,
        });

        $('#endTime').pickatime({
          format: 'HH:i',
          formatSubmit: 'HH:i',
          formatLabel: 'H:i',
          min: min,
          max: endMax,
        });
      }
    }
    console.log('autorun');
  });
});

Template.office.helpers({
  office () {
    return Offices.findOne({ _id: Router.current().params.officeId });
  },
  reservations () {
    if (Meteor.userId()) {
      return Reservations.find({ officeId: Router.current().params.officeId, creator: Meteor.userId() }, {sort: {day: -1}}).fetch();
    }
    return false;
  },
  availability () {
    let office = Offices.findOne({ _id: Router.current().params.officeId });
    if (office) {
      let availability = _.find( office.availabilities, function (availability) {
        if (Session.get('searchedDate')) {
          return availability.available === true && moment(Session.get('searchedDate')).isSame(availability.date, 'day');
        }
        return availability.available === true;
      });
      if (availability) {
        availability.date = moment(availability.date).format('YYYY-MM-DD');
        return availability;
      }
    }
    return '';
  },
});

Template.office.events({
  'click .bookOffice' () {
    $('.field').removeClass('error');
    let reservationDay = $('[name="reservationDay_submit"]').val();
    if (!reservationDay) {
      $('#reservationDay').parent('.field').addClass('error');
      return false;
    }
    let startTime = $('[name="startTime_submit"]').val();
    let endTime = $('[name="endTime_submit"]').val();
    if (!startTime) {
      $('#startTime').parent('.field').addClass('error');
      return false;
    }
    if (!endTime) {
      $('#endTime').parent('.field').addClass('error');
      return false;
    }
    let office = Offices.findOne({ _id: Router.current().params.officeId });
    if (office && office.availabilities && office.availabilities.length > 0) {
      if (Number(startTime.replace(':', '')) >= Number(endTime.replace(':', ''))) {
        $('#startTime').parent('.field').addClass('error');
        $('#endTime').parent('.field').addClass('error');
        return false;
      }
      reservationDay = moment(reservationDay).startOf('day').toDate();
      let reservation = {
        officeId: office._id,
        officeNumber: office.number,
        day: reservationDay,
        startTime: startTime,
        endTime: endTime,
        creator: Meteor.userId(),
        creatorEmail: contactEmail(Meteor.user()),
        createdAt: new Date(),
      };
      let reservationId = Reservations.insert(reservation);
      Meteor.call('applyReservation', reservationId);
      Router.go('agenda');
      return true;
    }
    return false;
  },
  'change #reservationDay' () {
    let reservationDayDate = moment($('[name="reservationDay_submit"]').val()).toDate();
    let office = Offices.findOne({ _id: Router.current().params.officeId });
    let availability = _.find( office.availabilities, function (availabilityItem) {
      return availabilityItem.available === true && moment(reservationDayDate).isSame(availabilityItem.date, 'day');
    });
    let opens = availability.startTime.split(':');
    let min = moment(reservationDayDate).startOf('day').add(opens[0], 'hours').add(opens[1], 'minutes').toDate();
    let closes = availability.endTime.split(':');
    let startMax = moment(reservationDayDate).startOf('day').add(closes[0], 'hours').add(closes[1], 'minutes').subtract(30, 'minutes').toDate();
    let endMax = moment(reservationDayDate).startOf('day').add(closes[0], 'hours').add(closes[1], 'minutes').toDate();
    let startTimePicker = $('#startTime').pickatime('picker');
    startTimePicker.set({
      'min': min,
      'max': startMax,
      'select': min,
    });
    let endTimePicker = $('#endTime').pickatime('picker');
    endTimePicker.set({
      'min': min,
      'max': endMax,
      'select': endMax,
    });
  },
  'click .detailReservation' () {
    Router.go('reservation', {reservationId: this._id});
  },
  'change #startTime' () {
    let opens =  $('[name="startTime_submit"]').val().split(':');
    let min = moment().startOf('day').add(opens[0], 'hours').add(opens[1], 'minutes').add(30, 'minutes').toDate();
    let endTimePicker = $('#endTime').pickatime('picker');
    endTimePicker.set({
      'min': min,
      'select': min,
    });
  },
});
