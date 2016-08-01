Meteor.methods({
  getOfficeOwnersAndUsers: function (officeId) {
    check(officeId, String);
    if (isOfficeOwner(officeId, this.userId)) {
      let office = Offices.findOne({_id: officeId});
      let owners = [];
      _.each(office.owners, function (ownerId) {
        let owner = Meteor.users.findOne({_id: ownerId});
        owners.push({
          userId: ownerId,
          email: contactEmail(owner),
        });
      });
      let users = [];
      if (office.users) {
        _.each(office.users, function (sellerId) {
          let seller = Meteor.users.findOne({_id: sellerId});
          users.push({
            userId: sellerId,
            email: contactEmail(seller),
          });
        });
      }
      return {'owners': owners, 'users': users};
    }
    return false;
  },
});
