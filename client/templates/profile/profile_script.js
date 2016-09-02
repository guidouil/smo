Template.profile.helpers({
});

Template.profile.events({
});

Template.profile.onRendered(function () {
  $('.ui.progress').progress({
    duration: 200,
    total: 200,
    text: {
      active: '{value}/{total}',
    },
  });
  $('body').animate({scrollTop: 0}, 'fast');
});
