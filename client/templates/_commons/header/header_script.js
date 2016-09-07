Template.header.helpers({
  isLevelOnePage () {
    if (Router.current().route) {
      if (Router.current().params.officeId) {
        return false; // trick for agenda
      }
      let levelOnePages = ['home', 'search', 'profile', 'help', 'myOffice', 'agenda'];
      if (_.contains( levelOnePages, Router.current().route.getName())) {
        return true;
      }
    }
    return false;
  },
  isMyOffice () {
    if (Router.current().route) {
      return Router.current().route.getName() === 'myOffice';
    }
    return false;
  },
  isEditMyOffice () {
    if (Router.current().route) {
      return Router.current().route.getName() === 'editMyOffice';
    }
    return false;
  },
  isProfile () {
    if (Router.current().route) {
      return Router.current().route.getName() === 'profile';
    }
    return false;
  },
  isEditProfile () {
    if (Router.current().route) {
      return Router.current().route.getName() === 'editProfile';
    }
    return false;
  },
  routeName () {
    let routeName = Router.current().route.getName();
    if (routeName) {
      switch (routeName) {
      default:
        routeName = 'share my office';
        break;
      case 'home':
        routeName = 'accueil';
        break;
      case 'profile':
        routeName = 'profil';
        break;
      case 'editProfile':
        routeName = 'éditer profil';
        break;
      case 'reservation':
        routeName = 'réservation';
        break;
      case 'search':
        routeName = 'recherche bureau';
        break;
      case 'help':
        routeName = 'à propos';
        break;
      case 'myOffice':
        if (Offices.find({$or: [{owners: Meteor.userId()}, {users: Meteor.userId()}]}).count() <= 1) {
          routeName = 'mon bureau';
        } else {
          routeName = 'mes bureaux';
        }
        break;
      case 'office':
        routeName = 'Bureau';
        if (Router.current().route && Router.current().params.officeId) {
          let office = Offices.findOne({_id: Router.current().params.officeId});
          if (office) {
            routeName += ' ' + office.number;
          }
        }
        break;
      case 'createMyOffice':
        routeName = 'enregistrer un bureau';
        break;
      case 'editMyOffice':
        routeName = 'éditer mon bureau';
        break;
      case 'myOfficeCalendar':
        routeName = 'disponibilités';
        break;
      case 'myOfficeUsers':
        routeName = 'droits de mon bureau';
        break;
      case 'agenda':
        routeName = 'calendrier';
        break;
      }
    }
    return routeName;
  },
});

Template.header.events({
  'click .showMainSidebar' () {
    $('.mainSidebar').sidebar('toggle');
  },
  'click .goBack' () {
    $('.mainSidebar').sidebar('hide');
    window.history.back();
  },
  'click .deleteOffice' () {
    $('.deleteOfficeModal').modal({
      onApprove: function() {
        Meteor.call('removeOfficeAndReservations', Router.current().params.officeId, function(){
          return true;
        });
        Router.go('myOffice');
      },
    }).modal('show');
  },
  'click .headerTitle' () {
    $('body').animate({scrollTop: 0}, 'fast');
  },
});

Template.header.onRendered(function () {
  $('body').animate({scrollTop: 0}, 'fast');
});
