Template.createMyOffice.helpers({
});

Template.createMyOffice.events({
  'click .goStepTwo' () {
    $('.ui.accordion').accordion('open', 1);
  },
  'click .goStepThree' () {
    $('.ui.accordion').accordion('open', 2);
  },
  'click .shareOffice' () {
    $('.field').removeClass('error');
    let address = $('#address').val();
    if (!address) {
      $('.ui.accordion').accordion('open', 0);
      $('#address').parent('.field').addClass('error');
      return false;
    }
    let number = $('#number').val();
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
    let comment = $('#comment').val();
    Offices.insert({
      number: number,
      address: address,
      capacity: capacity,
      furnitures: furnitures,
      comment: comment,
    });
    Router.go('myOffice');
  },
});

Template.createMyOffice.onRendered(function () {
  $('.ui.accordion').accordion();
  $('.ui.checkbox').checkbox();
});
