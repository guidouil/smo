Template.myOffice.helpers({
  myOffices () {
    return Offices.find({$or: [{owners: Meteor.userId()}, {users: Meteor.userId()}]});
  },
  onlyOneOffice () {
    if (Offices.find({$or: [{owners: Meteor.userId()}, {users: Meteor.userId()}]}).count() === 1) {
      return true;
    }
    return false;
  },
});

Template.myOffice.events({
});

Template.myOffice.onRendered(function () {
  $('body').animate({scrollTop: 0}, 'fast');
});
