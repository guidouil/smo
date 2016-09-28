Meteor.methods({
  'searchOffices': function (query, date, capacity) {
    check(query, String);
    check(date, Date);
    check(capacity, Number);
    let user = Meteor.users.findOne({_id: this.userId});
    return Offices.find({
      $and: [
        {
          $or: [
            {number: { $regex: query, $options: 'i' }},
            {address: { $regex: query, $options: 'i' }},
          ],
        },
        {
          $or: [
            {users: user.username},
            {users: {$exists: false}},
            {users: {$size: 0}},
            {users: null},
          ],
        },
        {
          capacity: {$gte: capacity},
        },
        {
          availabilities: { $elemMatch: {date: date, available: true}},
        },
      ],
    }).fetch();
  },
});
