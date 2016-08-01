Meteor.methods({
  giveOfficeOrwnership: function (email, officeId) {
    check(email, String);
    check(officeId, String);
    if (isOfficeOwner(officeId, this.userId)) {
      let owner = Meteor.users.findOne({$or: [
        { 'emails.address': email },
        { 'user.services.facebook.email': email },
        { 'user.services.google.email': email },
      ]});
      if (owner && owner._id) {
        Offices.update({_id: officeId}, {$addToSet: {
          owners: owner._id,
        }});
        return true;
      }
    }
    return false;
  },
});
