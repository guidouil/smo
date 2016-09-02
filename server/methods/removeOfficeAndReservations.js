Meteor.methods({
  'removeOfficeAndReservations': function (officeId) {
    check(officeId, String);
    if (isOfficeOwner(officeId, this.userId)) {
      Reservations.remove({officeId: officeId}, {multi: true});
      Offices.remove({_id: officeId});
    }
    return true;
  },
});
