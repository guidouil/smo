Template.createMyOffice.onCreated(function () {
  this.subscribe('MyImportedOffices');
});

Template.createMyOffice.onRendered(function () {
  if (! Meteor.userId()) {
    Router.go('/uid');
  }
  $('.ui.checkbox').checkbox();
  $('body').animate({scrollTop: 0}, 'fast');
});

Template.createMyOffice.helpers({
  importedOffice () {
    return ImportedOffices.findOne();
  },
});

Template.createMyOffice.events({
  'click .shareOffice' () {
    $('.field').removeClass('error');
    $('.ui.form').removeClass('error');
    let number = escapeHtml($('#number').val());
    if (!number || number < 1) {
      $('.ui.accordion').accordion('open', 0);
      $('#number').parent('.field').addClass('error');
      $('.ui.form').addClass('error');
      return false;
    }
    let capacity = $('#capacity').val();
    if (!capacity || capacity < 1) {
      $('.ui.accordion').accordion('open', 1);
      $('#capacity').parent('.field').addClass('error');
      $('.ui.form').addClass('error');
      return false;
    }
    let address = escapeHtml($('#address').val());
    if (!address) {
      $('.ui.accordion').accordion('open', 0);
      $('#address').parent('.field').addClass('error');
      $('.ui.form').addClass('error');
      return false;
    }
    let furnitures = {};
    $('.furniture').each(function(index, el) {
      furnitures[el.id] = el.checked;
    });
    let comment = escapeHtml($('#comment').val());
    let officeId = Offices.insert({
      number: number,
      address: address,
      capacity: capacity,
      furnitures: furnitures,
      comment: comment,
    });
    let importedOffice = ImportedOffices.findOne({_id: number});
    if (importedOffice && importedOffice.users && importedOffice.users.length > 0 ) {
      Offices.update({_id: officeId}, {$set: {
        users: importedOffice.users,
      }});
    }
    ImportedOffices.remove({_id: number});
    Router.go('myOffice');
    return true;
  },
  'input #number' (evt) {
    if (evt.target.value) {
      $('#number').parent('.field').removeClass('error');
      $('.ui.form').removeClass('error');
    }
  },
  'input #capacity' (evt) {
    if (evt.target.value) {
      $('#capacity').parent('.field').removeClass('error');
      $('.ui.form').removeClass('error');
    }
  },
  'input #address' (evt) {
    if (evt.target.value) {
      $('#address').parent('.field').removeClass('error');
      $('.ui.form').removeClass('error');
    }
  },
});
