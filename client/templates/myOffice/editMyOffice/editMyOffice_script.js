Template.editMyOffice.helpers({
  office () {
    return Offices.findOne({_id: Router.current().params.officeId});
  },
  hasFurniture (furniture) {
    if (furniture) {
      return 'checked';
    }
    return '';
  },
});

Template.editMyOffice.events({
  'click .saveOffice' () {
    $('.field').removeClass('error');
    let address = escapeHtml($('#address').val());
    if (!address) {
      $('#address').parent('.field').addClass('error');
      return false;
    }
    let number = escapeHtml($('#number').val());
    if (!number || number < 1) {
      $('#number').parent('.field').addClass('error');
      return false;
    }
    let capacity = $('#capacity').val();
    if (!capacity || capacity < 1) {
      $('#capacity').parent('.field').addClass('error');
      return false;
    }
    let furnitures = {};
    $('.furniture').each(function(index, el) {
      furnitures[el.id] = el.checked;
    });
    let comment = escapeHtml($('#comment').val());
    Offices.update({_id: Router.current().params.officeId}, { $set: {
      number: number,
      address: address,
      capacity: capacity,
      furnitures: furnitures,
      comment: comment,
    }});
    Router.go('myOffice');
    return true;
  },
  'click .deleteOffice' () {
    $('.deleteOfficeModal').modal({
      onApprove: function() {
        Meteor.call('removeReservations', Router.current().params.officeId, function () {
          Offices.remove({_id: Router.current().params.officeId});
          Router.go('home');
        });
      },
    }).modal('show');
  },
});

Template.editMyOffice.onRendered(function () {
});
