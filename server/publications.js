Meteor.publish('MyOwnedOffices', function () {
  if (this.userId) {
    return Offices.find({ 'owners': this.userId });
  }
  return false;
});

Meteor.publish('MyUsageOffices', function () {
  if (this.userId) {
    return Offices.find({ 'users': this.userId });
  }
  return false;
});

Meteor.publish('Office', function (officeId) {
  check(officeId, String);
  return Offices.find({ _id: officeId });
});

Meteor.publish('Reservations', function (officeId) {
  check(officeId, String);
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1); // yesterday
  return Reservations.find({ officeId: officeId, date: {$gt: yesterday} });
});

Meteor.publish('MyReservations', function () {
  if (this.userId) {
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); // yesterday
    return Reservations.find({ creator: this.userId, day: {$gte: yesterday}});
  }
  return false;
});

Meteor.publish('LocalUids', function () {
  return LocalUids.find({});
});

Meteor.publish('LocalUid', function (uid) {
  return LocalUids.find({_id: uid});
});
