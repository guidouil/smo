Template.profile.helpers({
});

Template.profile.events({
});

Template.profile.onRendered(function () {
  if (! Meteor.userId()) {
    Router.go('/uid');
  }
  $('.ui.progress').progress({
    duration: 200,
    total: 200,
    text: {
      active: '{value} Points',
    },
  });
  $('body').animate({scrollTop: 0}, 'fast');
});
