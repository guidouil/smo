import { Template } from 'meteor/templating';

import './rateOffice_template.html';

Template.rateOffice.onCreated(function() {
  let template = this;
  template.subscribe('Office', Router.current().params.officeId);
  template.subscribe('Reservation', Router.current().params.reservationId);
});

Template.rateOffice.onRendered(function () {
  let template = this;

});

Template.rateOffice.helpers({
  office () {
    return Offices.findOne({ _id: Router.current().params.officeId});
  },
  reservation () {
    return Reservations.findOne({ _id: Router.current().params.reservationId});
  },
  initRating () {
    setTimeout(function () {
      $('.rating').rating({
        initialRating: 0,
        maxRating: 5,
      });
    }, 500);
  },
  initRatingReadOnly () {
    setTimeout(function () {
      $('.rating').rating({
        maxRating: 5,
        interactive: false,
      });
    }, 500);
  },
  isRated () {
    let reservation = Reservations.findOne({_id: Router.current().params.reservationId});
    if (reservation) {
      return reservation.rated;
    }
    return false;
  },
});

Template.rateOffice.events({
  'click .submitRating' () {
    let rating = $('.rating').rating('get rating');
    let reservationId = Router.current().params.reservationId;
    if (! rating) {
      return false;
    }
    let comments = $('.ratingComments').val();
    Meteor.call('submitRating', reservationId, rating, comments, function(error, result) {
      if (error) {
        console.error(error);
      }
      if (result) {

      }
    });
  },
});
