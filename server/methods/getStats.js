Meteor.methods({
  'getStats': function () {
    let usersCount = Meteor.users.find({}).count();
    let officesCount = Offices.find({}).count();
    let reservationsCount = Reservations.find({}).count();
    return {
      users: usersCount,
      offices: officesCount,
      reservations: reservationsCount,
    };
  },
});
