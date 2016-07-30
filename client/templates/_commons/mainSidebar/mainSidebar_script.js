Template.mainSidebar.helpers({
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
