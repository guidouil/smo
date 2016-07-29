Template.mainSidebar.helpers({
});

Template.mainSidebar.events({
  'click .item' () {
    $('.mainSidebar').sidebar('hide');
  },
});

Template.mainSidebar.onRendered(function () {
});
