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
  let swipe = require('jquery-touchswipe');
  $('.main-container, .topHeader, .bottomFooter').swipe({
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
      console.log('Swiped ' + direction);
      if (direction === 'right') {
        $('.mainSidebar').sidebar('show');
      }
      if (direction === 'left') {
        $('.mainSidebar').sidebar('hide');
      }
    },
  });
});
