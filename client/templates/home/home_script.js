Template.home.helpers({
  hasOffice () {
    if (Meteor.userId()) {
      if (Offices.find({$or: [{owners: Meteor.userId()}, {users: Meteor.userId()}]}).count() > 0) {
        return true;
      }
    }
    return false;
  },
  onlyOneOffice () {
    if (Offices.find({$or: [{owners: Meteor.userId()}, {users: Meteor.userId()}]}).count() <= 1) {
      return true;
    }
    return false;
  },
});

Template.home.events({
  'click .shareMyOffice' () {
    if (Offices.find({$or: [{owners: Meteor.userId()}, {users: Meteor.userId()}]}).count() > 1) {
      Router.go('myOffice');
      return true;
    }
    let myOffice = Offices.findOne({$or: [{owners: Meteor.userId()}, {users: Meteor.userId()}]});
    if (myOffice) {
      Router.go('myOfficeAvailabilities', {officeId: myOffice._id});
    }
    return true;
  },
});

Template.home.onRendered(function () {
  $('body').animate({scrollTop: 0}, 'fast');
});
