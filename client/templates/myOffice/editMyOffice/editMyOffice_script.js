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
    let address = $('#address').val();
    if (!address) {
      $('#address').parent('.field').addClass('error');
      return false;
    }
    let number = $('#number').val();
    if (!number || number < 1) {
      $('#number').parent('.field').addClass('error');
      return false;
    }
    let capacity = $('#capacity').val();
    if (!capacity || capacity < 1) {
      $('.ui.accordion').accordion('open', 1);
      $('#capacity').parent('.field').addClass('error');
      return false;
    }
    let furnitures = {};
    $('.furniture').each(function(index, el) {
      furnitures[el.id] = el.checked;
    });
    let comment = $('#comment').val();
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
    swal({
      title: 'Effacer ce bureau ?',
      text: 'Les informations liées a ce bureau seront détruite définitivement.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Effacer',
      cancelButtonText: 'Anuller',
    }).then(function() {
      Offices.remove({_id: Router.current().params.officeId});
      Router.go('home');
    });
  },
});

Template.editMyOffice.onRendered(function () {
});
