Template.header.helpers({
  isHome () {
    if (Router.current().route) {
      return Router.current().route.getName() === 'home';
    }
    return false;
  },
});

Template.header.events({
  'click .showMainSidebar' () {
    $('.mainSidebar').sidebar('show');
  },
  'click .goBack' () {
    window.history.back();
  },
});

Template.header.onRendered(function () {
});
