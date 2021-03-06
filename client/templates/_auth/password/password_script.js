import { Meteor } from 'meteor/meteor';

Template.password.helpers({
  uid () {
    return Router.current().params.uid;
  }
});

Template.password.events({
  'submit .ui.form' (evt) {
    evt.preventDefault();
    let password = $('#passwordInput').val();
    if (! password) {
      $('.passwordField').addClass('error');
      $('.ui.form').addClass('error');
      return false;
    }
    Meteor.loginWithPassword(Router.current().params.uid, password, function (error) {
      if (error) {
        alert('Wrong password or UID.\nPlease try again.');
      } else {
        Router.go('home');
      }
    });
  },
  'input #passwordInput' () {
    $('.passwordField').removeClass('error');
    $('.ui.form').removeClass('error');
  },
});

Template.password.onRendered(function (){
});
