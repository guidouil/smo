Meteor.methods({
  'submitRating': function (reservationId, rating, comment) {
    check(reservationId, String);
    check(rating, Number);
    if (comment) {
      check(comment, String);
    }
    let reservation = Reservations.findOne({_id: reservationId});
    if (! reservation || reservation.rated === true || ! this.userId || reservation.creator !== this.userId) {
      return false;
    }
    Reservations.update({_id: reservationId}, {$set: {
      rated: true,
      rating: rating,
      comment: comment,
    }});
    return true;
  },
});
