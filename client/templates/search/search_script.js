Template.search.onCreated(function () {
  this.offices = new ReactiveVar();
});

Template.search.onRendered(function () {
  $('#searchOfficesInput').focus();
  setTimeout(function () {
    $('.furnituresFilter').dropdown();
  }, 500);
  $('#dateFilter').pickadate();
});

Template.search.helpers({
  offices () {
    return Template.instance().offices.get();
  },
  now () {
    let moment = require('moment');
    moment.locale('fr');
    return moment(new Date()).format('YYYY-MM-DD');
  },
});

Template.search.events({
  'click .searchOfficesButton' (e, tmpl) {
    let query = $('#searchOfficesInput').val();
    let moment = require('moment');
    let date = new Date($('#dateFilter_hidden').val() + ' 00:00');
    Meteor.call('searchOffices', query, date, function (error, result) {
      if (error) {
        console.error(error);
      }
      if (result) {
        if ($('#furnituresFilterInput').val() != '') {
          let wantedFurnitures = $('#furnituresFilterInput').val().split(',');
          _.each( wantedFurnitures, function(wantedFurniture) {
            result = _.filter(result, function (office) {
              return office.furnitures[wantedFurniture] === true;
            });
          });
        }
        tmpl.offices.set(result);
      }
    });
  },
  'keyup #searchOfficesInput': function(event) {
    if (event.which === 13) {
      event.stopPropagation();
      $('.searchOfficesButton').click();
    }
  },
  'change #furnituresFilterInput' (evt, tmpl) {
    if (evt.currentTarget.value != '') {
      let wantedFurnitures = evt.currentTarget.value.split(',');
      let offices = tmpl.offices.get();
      _.each( wantedFurnitures, function(wantedFurniture) {
        offices = _.filter(offices, function (office) {
          return office.furnitures[wantedFurniture] === true;
        });
      });
      tmpl.offices.set(offices);
    } else {
      $('.searchOfficesButton').click();
    }
  },
  'change #dateFilter' () {
    $('.searchOfficesButton').click();
  },
});
