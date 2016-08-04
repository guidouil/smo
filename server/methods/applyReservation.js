Meteor.methods({
  'applyReservation': function (reservationId, userEmail) {
    check(reservationId, String);
    if (this.userId) {
      let moment = require('moment');
      let reservation = Reservations.findOne({ _id: reservationId });
      if (reservation && reservation.officeId) {
        let office = Offices.findOne({ _id: reservation.officeId });
        if (office && office.availabilities && office.availabilities.length > 0) {
          let availability = _.find( office.availabilities, function (availability) {
            return availability.available === true
            && moment(availability.date).isSame(reservation.day, 'day')
            && Number(availability.startTime.replace(':', '')) <= Number(reservation.startTime.replace(':', ''))
            && Number(availability.endTime.replace(':', '')) >= Number(reservation.endTime.replace(':', ''));
          });
          console.log(availability);

          if (!availability) {
            // Invalid resevation must be destroyed
            // Reservations.remove({_id: reservationId});

            return false;
          }
          if (Number(availability.startTime.replace(':', '')) === Number(reservation.startTime.replace(':', '')) && Number(availability.endTime.replace(':', '')) === Number(reservation.endTime.replace(':', ''))) {
            Offices.update({_id: office._id}, {$pull: {availabilities: availability}});
            return true;
          }
          if (Number(availability.startTime.replace(':', '')) === Number(reservation.startTime.replace(':', ''))) {
            Offices.update({_id: office._id, availabilities: { $elemMatch: {date: availability.date, startTime: availability.startTime}}}, {$set: {
              'availabilities.$.startTime': reservation.endTime,
            }});
            return true;
          }
          if (Number(availability.endTime.replace(':', '')) === Number(reservation.endTime.replace(':', ''))) {
            Offices.update({_id: office._id, availabilities: { $elemMatch: {date: availability.date, endTime: availability.endTime}}}, {$set: {
              'availabilities.$.endTime': reservation.startTime,
            }});
            return true;
          }
          // the reservation is in the middle of the availability so we cut it
          Offices.update({_id: office._id, availabilities: { $elemMatch: {date: availability.date, startTime: availability.startTime}}}, {$set: {
            'availabilities.$.endTime': reservation.startTime,
          }});
          availability.startTime = reservation.endTime;
          Offices.update({_id: office._id}, {$push: {availabilities: availability}});
          return true;
        }
      }
    }
    return false;
  },
});
