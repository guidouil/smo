Template.myOfficeUsers.onCreated(function(){
  this.owners = new ReactiveVar();
  this.users = new ReactiveVar();
});

Template.myOfficeUsers.onRendered(function () {
  var template = this;
  Meteor.call('getOfficeOwnersAndUsers', Router.current().params.officeId, function (err, result) {
    if (result.owners) {
      template.owners.set( result.owners);
    }
    if (result.users) {
      template.users.set(result.users);
    }
  });
});

Template.myOfficeUsers.helpers({
  office: function () {
    return Offices.findOne({_id: Router.current().params.officeId});
  },
  owners () {
    return Template.instance().owners.get();
  },
  users () {
    return Template.instance().users.get();
  },
});

Template.myOfficeUsers.events({
});
