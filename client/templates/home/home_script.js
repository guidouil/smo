Template.home.helpers({
  userName() {
    if (Meteor.user()) {
      let email = contactEmail(Meteor.user());
      if (email) {
        let piece = email.split('@');
        return piece[0];
      }
    }
    return '';
  },
  hasOffice () {
    if (Meteor.userId()) {
      if (Offices.find({ 'owners': Meteor.userId() }).count() >= 1) {
        return true;
      }
    }
    return false;
  },
});

Template.home.events({
  'click .myOffice' () {
    Router.go('myOffice');
  },
});

Template.home.onRendered(function () {
});
