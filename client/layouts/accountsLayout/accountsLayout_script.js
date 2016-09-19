Template.accountsLayout.helpers({
  noCenterAtTable () {
    $('.at-grid').removeClass('centered');
  },
});

Template.accountsLayout.events({
});

Template.accountsLayout.onRendered(function () {
  $('.at-grid').removeClass('centered');
});
