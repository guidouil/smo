Template.createMyOffice.helpers({
});

Template.createMyOffice.events({
  'click .title' (evt) {
    if ($(evt.currentTarget).hasClass('active')) {
      $('.goStepOne').toggle();
      $('.goStepTwo').toggle();
    }
  },
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
    $('.goStepOne').show();
    $('.goStepTwo').hide();
    return true;
  },
  'click .goStepOne' () {
    $('.field').removeClass('error');
    let capacity = $('#capacity').val();
    if (!capacity || capacity < 1) {
      $('#capacity').parent('.field').addClass('error');
      return false;
    }
    $('.ui.accordion').accordion('open', 0);
    $('.goStepOne').hide();
    $('.goStepTwo').show();
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
      $('.goStepOne').show();
      $('.goStepTwo').hide();
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
    Router.go('myOfficeAvailabilities', {officeId: officeId});
    return true;
  },
});

Template.createMyOffice.onRendered(function () {
  $('.goStepOne').hide();
  $('.ui.accordion').accordion();
  $('.ui.checkbox').checkbox();
  $('body').animate({scrollTop: 0}, 'fast');
});
