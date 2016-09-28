Meteor.methods({
  'removeOfficeUsership': function (officeId, userUid) {
    check(officeId, String);
    check(userUid, String);
    if (isOfficeOwner(officeId, this.userId)) {
      Offices.update({ _id: officeId }, { $pull: {
        users: userUid,
      }});
      return true;
    }
    return false;
  },
});
