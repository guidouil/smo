Template.uidInfo.onCreated(function(){
  const uid = Router.current().params.uid;
  const handle = this.subscribe('LocalUid', uid);
  Tracker.autorun(function () {
    const isReady = handle.ready();
    if (isReady) {
      let localUid = LocalUids.findOne({_id: uid});
      if (! localUid) {
        Meteor.call('searchByUid', uid, function(error, result){
          if (error) {
            console.error(error);
          }
          console.log(result);
          if (result === false) {
            alert('UID not found');
            Router.go('uid');
          }
        });
      }
    }
  });
});

Template.uidInfo.onRendered(function () {
});

Template.uidInfo.helpers({
  localUid () {
    return LocalUids.findOne({_id: Router.current().params.uid});
  },
  uid () {
    return Router.current().params.uid;
  },
});

Template.uidInfo.events({
  'click .sendMail' () {
    let token = Random.id();
    let localUid = LocalUids.findOne({_id: Router.current().params.uid});
    if (localUid) {
      LocalUids.update({_id: localUid._id}, {$set: {
        token: token
      }});
      let text = 'Hello ' + localUid.firstname + ' ' + localUid.lastname + ',\nPlease click the following link to create your account on the Share my office app.\n' + Meteor.absoluteUrl('create-account/' + localUid._id + '/' + token);
      Meteor.call('sendEmail',
        localUid.mail,
        'paris_itg_digital_working_lab@bnpparibas.com',
        'Share my office - Identity validation',
        text);
      $('.ui.basic.modal').modal({
        closable  : false,
        onApprove : function() {
          Router.go('password', {uid: localUid._id});
        }
      })
      .modal('show');
    }
  },
});
