Template.home.helpers({
  hasOffice () {
    if (Meteor.userId()) {
      if (Offices.find({ 'owners': Meteor.userId() }).count() >= 1) {
        return true;
      }
    }
    return false;
  },
  onlyOneOffice () {
    if (Offices.find({$or: [{owners: Meteor.userId()}, {users: Meteor.userId()}]}).count() <= 1) {
      return true;
    }
    return false;
  },
});

Template.home.events({
  'click .myOffice' () {
    Router.go('myOffice');
  },
});

Template.home.onRendered(function () {
});
