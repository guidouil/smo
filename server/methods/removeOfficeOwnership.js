Meteor.methods({
  'removeOfficeOwnership': function (officeId, userId) {
    check(officeId, String);
    check(userId, String);
    if (isOfficeOwner(officeId, this.userId)) {
      Offices.update({ _id: officeId }, { $pull: {
        owners: userId,
      }});
      return true;
    }
    return false;
  },
});
