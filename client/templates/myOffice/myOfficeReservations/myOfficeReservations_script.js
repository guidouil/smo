let moment = require('moment');

Template.myOfficeReservations.onCreated(function () {
  this.subscribe('Office', Router.current().params.officeId);
  this.subscribe('Reservations', Router.current().params.officeId);
});

Template.myOfficeReservations.helpers({
  commingReservations () {
    let today = moment().startOf('day').toDate();
    return Reservations.find({officeId: Router.current().params.officeId, day: {$gte: today}}, {sort: {day: 1}}).fetch();
  },
  previousReservations () {
    let today = moment().startOf('day').toDate();
    return Reservations.find({officeId: Router.current().params.officeId, day: {$lt: today}}, {sort: {day: -1}}).fetch();
  },
});

Template.myOfficeReservations.events({
  'click .reservation' () {
    Router.go('/reservation/' + this._id);
  },
});

Template.myOfficeReservations.onRendered(function () {
});
