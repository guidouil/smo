Template.uid.onCreated(function () {
});

Template.uid.onRendered(function () {
});

Template.uid.helpers({
});

Template.uid.events({
  'submit .ui.form' (evt) {
    evt.preventDefault();
    $('.signInBtn').addClass('loading');
    let uid = $('#uidInput').val();
    if (! uid) {
      $('.uidField').addClass('error');
      $('.ui.form').addClass('error');
      $('.signInBtn').removeClass('loading');
      return false;
    }
    // Does this user has a password ?
    Meteor.call('getUserFromUid', uid, function(error, result){
      if(error){
        console.error(error);
      }
      // console.log(result);
      if (! result) {
        Router.go('uidInfo', {uid: uid});
        return false;
      }
      Router.go('password', {uid: result.username});
      return true;
    });
  },
  'input #uidInput' () {
    $('.uidField').removeClass('error');
    $('.ui.form').removeClass('error');
  },
});
