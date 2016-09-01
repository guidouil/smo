let moment = require('moment');
moment.locale('fr');

Template.search.onRendered(function () {
  $('#searchOfficesInput').focus();
  $('.furnituresFilter').hide();
  $('#dateFilter').pickadate();
});

Template.search.helpers({
  offices () {
    return Session.get('offices');
  },
  now () {
    return moment(new Date()).format('YYYY-MM-DD');
  },
});

Template.search.events({
  'click .searchOfficesButton' () {
    let query = $('#searchOfficesInput').val();
    let date = new Date($('#dateFilter_hidden').val() + ' 00:00');
    Session.set('searchedDate', date);
    Meteor.call('searchOffices', query, date, function (error, result) {
      if (error) {
        console.error(error);
      }
      if (result) {
        // if ($('#furnituresFilterInput').val() != '') {
        //   let wantedFurnitures = $('#furnituresFilterInput').val().split(',');
        //   _.each( wantedFurnitures, function(wantedFurniture) {
        //     result = _.filter(result, function (office) {
        //       return office.furnitures[wantedFurniture] === true;
        //     });
        //   });
        // }
        Session.set('offices', result);
      }
    });
  },
  'keyup #searchOfficesInput': function(event) {
    if (event.which === 13) {
      event.stopPropagation();
      $('.searchOfficesButton').click();
    }
  },
  'click .furniture' () {
    let wantedFurnitures = [];
    $('.furniture').each(function(index, el) {
      if (el.checked === true) {
        wantedFurnitures.push(el.id);
      }
    });
    if (wantedFurnitures.length > 0) {
      let offices = Session.get('offices');
      _.each( wantedFurnitures, function(wantedFurniture) {
        offices = _.filter(offices, function (office) {
          return office.furnitures[wantedFurniture] === true;
        });
      });
      Session.set('offices', offices);
    } else {
      $('.searchOfficesButton').click();
    }
  },
  'change #dateFilter' () {
    $('.searchOfficesButton').click();
  },
  'click .furnituresLabel' () {
    $('.furnituresFilter').toggle();
  },
});
