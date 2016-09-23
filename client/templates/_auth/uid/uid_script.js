Template.uid.onCreated(function(){
  this.subscribe('LocalUids');
});

Template.uid.onRendered(function ( ){
})

Template.uid.helpers({
});

Template.uid.events({
  'submit .ui.form' (evt) {
    evt.preventDefault();
    let uid = $('#uidInput').val();
    if (! uid) {
      $('.uidField').addClass('error');
      $('.ui.form').addClass('error');
      return false;
    }
    let localUid = LocalUids.findOne({_id: uid});
    if (! localUid) {
      Router.go('uidInfo', {uid: uid});
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
