let moment = require('moment');
moment.locale('fr');

Template.search.onRendered(function () {
  $('#searchOfficesInput').focus();
  $('.furnituresFilter').hide();
  $('#dateFilter').pickadate({
    firstDay: 1,
    min: new Date(),
    formatSubmit: 'yyyy-mm-dd',
    format: 'dd/mm/yyyy',
    disable: [6, 7]
  });
  $('body').animate({scrollTop: 0}, 'fast');
});

Template.search.helpers({
  offices () {
    return Session.get('offices');
  },
  searchedDate () {
    let date = Session.get('searchedDate') || new Date();
    return moment(date).format('YYYY-MM-DD');
  },
});

Template.search.events({
  'click .goToOffice' () {
    Router.go('/office/' + this._id);
  },
  'click .searchOfficesButton' () {
    let query = $('#searchOfficesInput').val();
    let date = moment($('[name="dateFilter_submit"]').val()).startOf('day').toDate();

    let capacity = Number($('#capacityFilter').val()) || 1;
    Session.set('searchedDate', date);
    Meteor.call('searchOffices', query, date, capacity, function (error, result) {
      if (error) {
        console.error(error);
      }
      if (result) {
        let wantedFurnitures = [];
        $('.furniture').each(function(index, el) {
          if (el.checked === true) {
            wantedFurnitures.push(el.id);
          }
        });
        if (wantedFurnitures.length > 0) {
          _.each( wantedFurnitures, function(wantedFurniture) {
            result = _.filter(result, function (office) {
              return office.furnitures[wantedFurniture] === true;
            });
          });
        }
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
    Session.set('wantedFurnitures', wantedFurnitures);
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
  'change #dateFilter, change #capacityFilter, click .searchOfficesBigButton' () {
    $('.searchOfficesButton').click();
  },
  'click .furnituresLabel, click .furnituresFilterSelected' () {
    $('.furnituresFilter').toggle();
    $('.furnituresFilterSelected').toggle();
  },
});
