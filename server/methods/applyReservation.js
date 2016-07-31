Meteor.methods({
  'applyReservation': function (reservationId) {
    check(reservationId, String);
    if (this.userId) {
      let moment = require('moment');
      let reservation = Reservations.findOne({ _id: reservationId });
      if (reservation && reservation.officeId) {
        let office = Offices.findOne({ _id: reservation.officeId });
        if (office && office.availabilities && office.availabilities.length > 0) {
          _.each( office.availabilities, function( availability ){
            if (moment(availability.date).isSame(reservation.date, 'day')) {
              if (availability.available === false) {
                // Invalid resevation must be destroyed
                Reservations.remove({_id: reservationId});
                return false
              }
              Offices.update({_id: office._id, 'availabilities.date': reservation.date}, {$set:{
                'availabilities.$.available': false,
                'availabilities.$.user': this.userId,
                'availabilities.$.reservedAt': new Date(),
              }});
            }
          });
        }
      }
    }
    return false;
  },
});
