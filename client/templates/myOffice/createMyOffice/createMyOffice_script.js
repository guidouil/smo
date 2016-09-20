Template.createMyOffice.helpers({
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
  $('.goStepOne').hide();
  $('.ui.accordion').accordion();
  $('.ui.checkbox').checkbox();
  $('body').animate({scrollTop: 0}, 'fast');
});
