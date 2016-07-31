Meteor.publish('MyOffices', function () {
  if (this.userId) {
    return Offices.find({ 'owners': this.userId });
  }
  return false;
});

Meteor.publish('Office', function (officeId) {
  check(officeId, String);
  return Offices.find({ _id: officeId });
});

Meteor.publish('Reservations', function (officeId) {
  check(officeId, String);
  return Reservations.find({ officeId: officeId });
});

Meteor.publish('MyReservations', function () {
  if (this.userId) {
    return Reservations.find({ creator: this.userId });
  }
  return false;
});
