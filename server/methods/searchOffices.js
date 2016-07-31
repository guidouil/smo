Meteor.methods({
  'searchOffices': function (query, date) {
    check(query, String);
    check(date, Date);
    return Offices.find({
      $or: [
        {number: { $regex: query, $options: 'i' }},
        {address: { $regex: query, $options: 'i' }},
      ],
      availabilities: { $elemMatch: {date: date, available: true}},
    }).fetch();
  },
});
