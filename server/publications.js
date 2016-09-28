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
  if (this.userId) {
    check(officeId, String);
    let user = Meteor.users.findOne({_id: this.userId});
    return Offices.find({ _id: officeId, $or: [
      {owners: this.userId},
      {users: user.username},
      {users: {$exists: false}},
      {users: {$size: 0}},
      {users: null},
    ]});
  }
  return false;
});

Meteor.publish('Reservations', function (officeId) {
  if (this.userId) {
    check(officeId, String);
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); // yesterday
    return Reservations.find({ officeId: officeId, date: {$gt: yesterday} });
  }
  return false;
});

Meteor.publish('MyReservations', function () {
  if (this.userId) {
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); // yesterday
    return Reservations.find({ creator: this.userId, day: {$gte: yesterday}});
  }
  return false;
});

Meteor.publish('LocalUid', function (uid) {
  return LocalUids.find({_id: uid});
});

Meteor.publish('ImportedOffices', function () {
  if (this.userId) {
    return ImportedOffices.find({});
  }
  return false;
});

Meteor.publish('MyImportedOffices', function () {
  if (this.userId) {
    let user = Meteor.users.findOne({_id: this.userId});
    return ImportedOffices.find({owner: user.username});
  }
  return false;
});
