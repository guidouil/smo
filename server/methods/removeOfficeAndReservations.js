Meteor.methods({
  'removeOfficeAndReservations': function (officeId) {
    check(officeId, String);
    if (isOfficeOwner(officeId, this.userId)) {
      Reservations.remove({officeId: officeId}, {multi: true}, function() {});
      Offices.remove({_id: officeId}, function() {});
    }
    return true;
  },
});
