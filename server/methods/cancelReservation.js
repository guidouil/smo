Meteor.methods({
  'cancelReservation': function (reservationId) {
    let reservation = Reservations.findOne({_id: reservationId});
    let office = Offices.findOne({_id: reservation.officeId});
    if (reservation && office && (reservation.creator === this.userId || isOfficeOwnerOrUser(office._id, this.userId))) {
      let moment = require('moment');
      let availability = _.find( office.availabilities, function (availability) {
        return availability.available === true && moment(availability.date).isSame(reservation.day, 'day');
      });
      if (availability && Number(availability.startTime.replace(':', '')) === Number(reservation.endTime.replace(':', ''))) {
        // availability from same day starts when resevation was ending -> expand availability to reservation startTime
        Offices.update({_id: office._id, availabilities: { $elemMatch: {date: availability.date, startTime: availability.startTime}}}, {$set: {
          'availabilities.$.startTime': reservation.startTime,
        }});
      } else if (availability && Number(availability.endTime.replace(':', '')) === Number(reservation.startTime.replace(':', ''))) {
        // availability from same day ends when resevation was starting -> expand availability to reservation endTime
        Offices.update({_id: office._id, availabilities: { $elemMatch: {date: availability.date, endTime: availability.endTime}}}, {$set: {
          'availabilities.$.endTime': reservation.endTime,
        }});
      } else {
        // no availability or no touching availability -> insert a new one
        availability = {
          groupId: Random.id(),
          date: reservation.day,
          available: true,
          startTime: reservation.startTime,
          endTime: reservation.endTime,
          creator: this.userId,
          createdAt: new Date(),
        };
        Offices.update({_id: office._id}, {$push: {
          availabilities: availability,
        }});
      }
      // finaly delete reservation
      Reservations.remove({_id: reservation._id});
      return true;
    }
    return false;
  },
});
