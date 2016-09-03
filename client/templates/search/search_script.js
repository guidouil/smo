let moment = require('moment');
moment.locale('fr');

Template.search.onRendered(function () {
  $('#searchOfficesInput').focus();
  $('.furnituresFilter').hide();
  $('#dateFilter').pickadate({disable: [6, 7]});
  $('body').animate({scrollTop: 0}, 'fast');
});

Template.search.helpers({
  offices () {
    return Session.get('offices');
  },
  now () {
    return moment(new Date()).format('YYYY-MM-DD');
  },
  wantedFurnitures () {
    let wantedFurnitures = Session.get('wantedFurnitures');
    if (wantedFurnitures && wantedFurnitures.length > 0) {
      let wantedFurnituresIcons = [];
      _.each( wantedFurnitures, function(furniture) {
        switch (furniture) {
        case 'printer':
          wantedFurnituresIcons.push('<i class="print icon"></i>');
          break;
        case 'whiteboard':
          wantedFurnituresIcons.push('<i class="sticky note outline icon"></i>');
          break;
        case 'multiphone':
          wantedFurnituresIcons.push('<i class="call icon"></i>');
          break;
        case 'plugs':
          wantedFurnituresIcons.push('<i class="plug icon"></i>');
          break;
        case 'beamer':
          wantedFurnituresIcons.push('<i class="record icon"></i>');
          break;
        case 'coffee':
          wantedFurnituresIcons.push('<i class="coffee icon"></i>');
          break;
        }
      });
      return wantedFurnituresIcons;
    }
    return false;
  },
});

Template.search.events({
  'click .searchOfficesButton' () {
    let query = $('#searchOfficesInput').val();
    let date = moment($('#dateFilter_hidden').val() + ' 00:00').toDate();
    Session.set('searchedDate', date);
    Meteor.call('searchOffices', query, date, function (error, result) {
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
  'change #dateFilter' () {
    $('.searchOfficesButton').click();
  },
  'click .furnituresLabel, click .furnituresFilterSelected' () {
    $('.furnituresFilter').toggle();
    $('.furnituresFilterSelected').toggle();
  },
});
