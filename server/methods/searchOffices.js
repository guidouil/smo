Meteor.methods({
  'searchOffices': function (query, limit) {
    check(query, String);
    if (! limit) {
      limit = 10;
    }
    check(limit, Number);
    return Offices.find({ $or: [
      {number: { $regex: query, $options: 'i' }},
      {address: { $regex: query, $options: 'i' }},
    ] }, { reactive: true, limit: limit }).fetch();
  },
});
