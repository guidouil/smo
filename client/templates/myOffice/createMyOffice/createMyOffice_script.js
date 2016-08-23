Template.createMyOffice.helpers({
});

Template.createMyOffice.events({
  'click .goStepTwo' () {
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
    $('.ui.accordion').accordion('open', 1);
    return true;
  },
  'click .goStepThree' () {
    $('.field').removeClass('error');
    let capacity = $('#capacity').val();
    if (!capacity || capacity < 1) {
      $('#capacity').parent('.field').addClass('error');
      return false;
    }
    $('.ui.accordion').accordion('open', 2);
    return true;
  },
  'click .shareOffice' () {
    $('.field').removeClass('error');
    let address = escapeHtml($('#address').val());
    if (!address) {
      $('.ui.accordion').accordion('open', 0);
      $('#address').parent('.field').addClass('error');
      return false;
    }
    let number = escapeHtml($('#number').val());
    if (!number || number < 1) {
      $('.ui.accordion').accordion('open', 0);
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
    let comment = escapeHtml($('#comment').val());
    Offices.insert({
      number: number,
      address: address,
      capacity: capacity,
      furnitures: furnitures,
      comment: comment,
    });
    Router.go('myOffice');
    return true;
  },
});

Template.createMyOffice.onRendered(function () {
  $('.ui.accordion').accordion();
  $('.ui.checkbox').checkbox();
});
