Meteor.methods({
  giveOfficeUsership: function (email, officeId) {
    check(email, String);
    check(officeId, String);
    if (isOfficeOwner(officeId, this.userId)) {
      let user = Meteor.users.findOne({$or: [
        { 'emails.address': email },
        { 'user.services.facebook.email': email },
        { 'user.services.google.email': email },
      ]});
      if (user && user._id) {
        Offices.update({_id: officeId}, {$addToSet: {
          users: user._id,
        }});
        return true;
      }
    }
    return false;
  },
});
