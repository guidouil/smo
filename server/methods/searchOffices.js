Meteor.methods({
  'searchOffices': function (query, date, capacity) {
    check(query, String);
    check(date, Date);
    check(capacity, Number);
    return Offices.find({
      $or: [
        {number: { $regex: query, $options: 'i' }},
        {address: { $regex: query, $options: 'i' }},
      ],
      capacity: {$gte: capacity},
      availabilities: { $elemMatch: {date: date, available: true}},
    }).fetch();
  },
});
