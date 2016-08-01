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
  let date = new Date();
  date.setDate(date.getDate() - 1); // yesterday
  return Reservations.find({ officeId: officeId, date: {$gt: date} });
});

Meteor.publish('MyReservations', function () {
  if (this.userId) {
    let date = new Date();
    date.setDate(date.getDate() - 1); // yesterday
    return Reservations.find({ creator: this.userId, date: {$gt: date}});
  }
  return false;
});
