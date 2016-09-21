Template.accountsLayout.helpers({
  noCenterAtTable () {
    $('.ui.stacked.segment').addClass('left aligned');
  },
});

Template.accountsLayout.events({
});

Template.accountsLayout.onRendered(function () {
  $('.ui.stacked.segment').addClass('left aligned');
});
