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
