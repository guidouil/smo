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
    $('.ui.form').removeClass('error');
    let number = escapeHtml($('#number').val());
    if (!number || number < 1) {
      $('#number').parent('.field').addClass('error');
      $('.ui.form').addClass('error');
      return false;
    }
    let capacity = $('#capacity').val();
    if (!capacity || capacity < 1) {
      $('#capacity').parent('.field').addClass('error');
      $('.ui.form').addClass('error');
      return false;
    }
    let address = escapeHtml($('#address').val());
    if (!address) {
      $('#address').parent('.field').addClass('error');
      $('.ui.form').addClass('error');
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
});

Template.editMyOffice.onRendered(function () {
});
