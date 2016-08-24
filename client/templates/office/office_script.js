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
        disable: result,
      });
    }
  });
  let office = Offices.findOne({ _id: Router.current().params.officeId });
  if (office) {
    let availability = _.find( office.availabilities, function (availability) {
      if (Session.get('searchedDate')) {
        return availability.available === true && moment(Session.get('searchedDate')).isSame(availability.date, 'day');
      }
      return availability.available === true;
    });
    let opens = availability.startTime.split(':');
    let min = moment().startOf('day').add(opens[0], 'hours').add(opens[1], 'minutes').toDate();
    let closes = availability.endTime.split(':');
    let startMax = moment().startOf('day').add(closes[0], 'hours').add(closes[1], 'minutes').subtract(30, 'minutes').toDate();
    let endMax = moment().startOf('day').add(closes[0], 'hours').add(closes[1], 'minutes').toDate();
    let startTimeInput = $('#startTime').pickatime({
      formatLabel: 'Commence à H:i',
      min: min,
      max: startMax,
    });
    startTimePicker = startTimeInput.pickatime('picker');
    let endTimeInput = $('#endTime').pickatime({
      formatLabel: 'F!in!i à H:i',
      min: min,
      max: endMax,
    });
    endTimePicker = endTimeInput.pickatime('picker');
  }
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
      availability.date = moment(availability.date).format('YYYY-MM-DD');
      return availability;
    }
    return '';
  },
});

Template.office.events({
  'click .bookOffice' () {
    $('.field').removeClass('error');
    let reservationDay = new Date($('#reservationDay_hidden').val() + ' 00:00');
    if (!reservationDay) {
      $('#reservationDay').parent('.field').addClass('error');
      return false;
    }
    let startTime = $('#startTime_hidden').val();
    let endTime = $('#endTime_hidden').val();
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
    let reservationDayDate = new Date($('#reservationDay_hidden').val());
    let office = Offices.findOne({ _id: Router.current().params.officeId });
    let availability = _.find( office.availabilities, function (availability) {
      return availability.available === true && moment(reservationDayDate).isSame(availability.date, 'day');
    });
    let opens = availability.startTime.split(':');
    let min = moment(reservationDayDate).startOf('day').add(opens[0], 'hours').add(opens[1], 'minutes').toDate();
    let closes = availability.endTime.split(':');
    let startMax = moment(reservationDayDate).startOf('day').add(closes[0], 'hours').add(closes[1], 'minutes').subtract(30, 'minutes').toDate();
    let endMax = moment(reservationDayDate).startOf('day').add(closes[0], 'hours').add(closes[1], 'minutes').toDate();
    startTimePicker.set({
      'min': min,
      'max': startMax,
      'select': min,
    });
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
    let opens =  $('#startTime_hidden').val().split(':');
    let min = moment().startOf('day').add(opens[0], 'hours').add(opens[1], 'minutes').add(30, 'minutes').toDate();
    endTimePicker.set({
      'min': min,
      'select': min,
    });
  },
});
