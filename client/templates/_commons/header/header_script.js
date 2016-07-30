Template.header.helpers({
  isHome () {
    return Router.current().route.getName() === 'home';
  },
});

Template.header.events({
  'click .showMainSidebar' () {
    $('.mainSidebar')
    .sidebar({
      transition: 'push',
      onVisible: function () {
      },
    }).sidebar('show');
  },
  'click .signOutBtn' () {
    Meteor.logout(function () {
      Router.go('home');
    });
  },
  'click .goBack' () {
    window.history.back();
  },
});

Template.header.onRendered(function () {
  setTimeout(function () {
    $('.profileDropdown').dropdown();
  }, 500);
});
