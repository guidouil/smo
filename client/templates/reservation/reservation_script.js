Template.reservation.helpers({
  reservation () {
    return Reservations.findOne({_id: Router.current().params.reservationId});
  },
  office () {
    let reservation = Reservations.findOne({_id: Router.current().params.reservationId});
    let office = Offices.findOne({_id: reservation.officeId});
    return office;
  },
});

Template.reservation.events({
});

Template.reservation.onRendered(function () {
});
