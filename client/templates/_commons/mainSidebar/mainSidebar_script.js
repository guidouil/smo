Template.mainSidebar.helpers({
});

Template.mainSidebar.events({
  'click .mainSidebar > .item' () {
    $('.mainSidebar').sidebar('hide');
  },
});

Template.mainSidebar.onRendered(function () {
});
