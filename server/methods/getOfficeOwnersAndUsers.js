Meteor.methods({
  getOfficeOwnersAndUsers: function (officeId) {
    check(officeId, String);
    if (isOfficeOwner(officeId, this.userId)) {
      let office = Offices.findOne({_id: officeId});
      let owners = [];
      _.each(office.owners, function (ownerId) {
        let owner = Meteor.users.findOne({_id: ownerId});
        owners.push({
          userId: owner._id,
          uid: owner.username,
          fullname: owner.profile.firstname + ' ' + owner.profile.lastname,
          email: contactEmail(owner),
        });
      });
      let users = [];
      if (office.users) {
        _.each(office.users, function (userUid) {
          let user = Meteor.users.findOne({username: userUid});
          if (user) {
            users.push({
              userId: user._id,
              uid: user.username,
              fullname: user.profile.firstname + ' ' + user.profile.lastname,
              email: contactEmail(user),
            });
          } else {
            users.push({ fullname: 'Not connected yet', uid: userUid });
          }
        });
      }
      return {'owners': owners, 'users': users};
    }
    return false;
  },
});
