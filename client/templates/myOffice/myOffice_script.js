Template.myOffice.helpers({
  myOffices () {
    return Offices.find({owners: Meteor.userId()});
  },
  onlyOneOffice () {
    if (Offices.find({owners: Meteor.userId()}).count() === 1) {
      return true;
    }
    return false;
  },
});

Template.myOffice.events({
});

Template.myOffice.onRendered(function () {
});
