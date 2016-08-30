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
    $('.mainSidebar').sidebar('toggle');
  },
  'click .goBack' () {
    $('.mainSidebar').sidebar('hide');
    window.history.back();
  },
});

Template.header.onRendered(function () {
});
