Template.mainSidebar.helpers({
  onlyOneOffice () {
    if (Offices.find({$or: [{owners: Meteor.userId()}, {users: Meteor.userId()}]}).count() === 1) {
      return true;
    }
    return false;
  },
});

Template.mainSidebar.events({
  'click .mainSidebar > .item' () {
    $('.mainSidebar').sidebar('hide');
  },
  'click .signOutBtn' () {
    Meteor.logout(function () {
      Router.go('home');
    });
  },
});

Template.mainSidebar.onRendered(function () {
});
