Template.createAccount.onCreated(function(){
  let template = this;
  const uid = Router.current().params.uid;
  const handle = template.subscribe('LocalUid', uid);
  template.isValid = new ReactiveVar('false');
  Tracker.autorun(function () {
    const isReady = handle.ready();
    if (isReady) {
      let localUid = LocalUids.findOne({_id: uid});
      if (localUid && localUid.token === Router.current().params.token) {
        template.isValid.set(true);
      }
    }
  });
});

Template.createAccount.helpers({
  isValid () {
    return Template.instance().isValid.get();
  }
});

Template.createAccount.events({
  'submit .ui.form' (evt) {
    evt.preventDefault();
    $('.field').removeClass('error');
    $('.ui.form').removeClass('error');
    let password = $('#passwordInput').val();
    let passwordConfirm = $('#passwordConfirmInput').val();
    if (! password || password.length < 8) {
      $('.passwordField').addClass('error');
      $('.ui.form').addClass('error');
      return false;
    }
    if (! passwordConfirm) {
      $('.passwordConfirmField').addClass('error');
      return false;
    }
    if (password !== passwordConfirm) {
      $('.passwordField').addClass('error');
      $('.ui.form').addClass('error');
      return false;
    }
    let localUid = LocalUids.findOne({_id: Router.current().params.uid});
    Accounts.createUser({
      username: localUid._id,
      email: localUid.mail,
      password: password,
      profile: {
        firstname: localUid.firstname,
        lastname: localUid.lastname
      }
    }, function () {
      Router.go('home');
    });
  },
  'input #passwordInput, input #passwordConfirmInput' () {
    $('.field').removeClass('error');
    $('.ui.form').removeClass('error');
  },
});

Template.createAccount.onRendered(function () {
});
