Template.office.onCreated(function () {
  this.subscribe('Office', Router.current().params.officeId);
});

Template.office.onRendered(function () {
});

Template.office.helpers({
  office () {
    return Offices.findOne({ _id: Router.current().params.officeId });
  },
});

Template.office.events({
});
