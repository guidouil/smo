Meteor.methods({
  'removeReservations': function (officeId) {
    check(officeId, String);
    if (isOfficeOwner(officeId, this.userId)) {
      Reservations.remove({officeId: officeId}, {multi: true});
    }
    return true;
  },
});
