Template.search.onCreated(function () {
  this.offices = new ReactiveVar();
});

Template.search.onRendered(function () {
  $('#searchOfficesInput').focus();
});

Template.search.helpers({
  offices () {
    return Template.instance().offices.get();
  },
});

Template.search.events({
  'click .searchOfficesButton' (e, tmpl) {
    let query = $('#searchOfficesInput').val();
    Meteor.call('searchOffices', query, function (error, result) {
      if (error) {
        console.error(error);
      }
      if (result) {
        tmpl.offices.set(result);
      }
    });
  },
  'keyup #searchOfficesInput': function(event) {
    if (event.which === 13) {
      event.stopPropagation();
      $('.searchOfficesButton').click();
    }
  },
});
