Template.mainSidebar.helpers({
  onlyOneOffice () {
    if (Offices.find({$or: [{owners: Meteor.userId()}, {users: Meteor.userId()}]}).count() <= 1) {
      return true;
    }
    return false;
  },
});

Template.mainSidebar.events({
  'click .signOutBtn' () {
    Meteor.logout();
    Router.go('/');
  },
  'click .mainSidebar > .item' () {
    $('.mainSidebar').sidebar('hide');
  },
});

Template.mainSidebar.onRendered(function () {
});
