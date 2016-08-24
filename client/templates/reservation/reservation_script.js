Template.reservation.helpers({
  reservation () {
    return Reservations.findOne({_id: Router.current().params.reservationId});
  },
  office () {
    let reservation = Reservations.findOne({_id: Router.current().params.reservationId});
    if (reservation) {
      let office = Offices.findOne({_id: reservation.officeId});
      return office;
    }
    return false;
  },
});

Template.reservation.events({
  'click .cancelReservation' () {
    let reservationId = Router.current().params.reservationId;
    Meteor.call('cancelReservation', reservationId, function (error, result) {
      if (error) {
        console.log(error);
      }
      if (result) {
        window.history.back();
      }
    });
  },
});

Template.reservation.onRendered(function () {
});
