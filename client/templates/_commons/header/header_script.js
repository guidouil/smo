Template.header.onCreated(function () {
  let template = this;
  template.subscribe('MyUnreadNotifications');
});

Template.header.onRendered(function () {
  $('body').animate({scrollTop: 0}, 'fast');
});

Template.header.helpers({
  notificationsCount () {
    if (Meteor.userId()) {
      return Notifications.find({to: Meteor.userId(), isRead: false}).count();
    }
    return false;
  },
  officeId () {
    if (Router.current().params.officeId) {
      return Router.current().params.officeId;
    }
    return false;
  },
  isLevelOnePage () {
    if (Router.current().route) {
      if (Router.current().params.officeId) {
        return false; // trick for agenda and availabilities
      }
      let levelOnePages = ['home', 'search', 'profile', 'help', 'myOffice', 'agenda', 'uid'];
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
  isMyOfficeCalendar () {
    if (Router.current().route) {
      return Router.current().route.getName() === 'agenda' && Router.current().params.officeId;
    }
    return false;
  },
  isMyOfficeReservations () {
    if (Router.current().route) {
      return Router.current().route.getName() === 'myOfficeReservations' && Router.current().params.officeId;
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
    if (Router.current().route) {
      let routeName = Router.current().route.getName();
      if (routeName) {
        switch (routeName) {
        default:
          routeName = 'share my office';
          break;
        case 'home':
          routeName = 'home';
          break;
        case 'profile':
          routeName = 'profile';
          break;
        case 'editProfile':
          routeName = 'edit profile';
          break;
        case 'reservation':
          routeName = 'reservation';
          break;
        case 'myOfficeReservations':
          routeName = 'reservations';
          break;
        case 'search':
          routeName = 'book an office';
          break;
        case 'help':
          routeName = 'about';
          break;
        case 'myOffice':
          if (Offices.find({$or: [{owners: Meteor.userId()}, {users: Meteor.userId()}]}).count() <= 1) {
            routeName = 'my office';
          } else {
            routeName = 'my offices';
          }
          break;
        case 'office':
          routeName = 'office';
          if (Router.current().route && Router.current().params.officeId) {
            let office = Offices.findOne({_id: Router.current().params.officeId});
            if (office) {
              routeName += ' ' + office.number;
            }
          }
          break;
        case 'rateOffice':
          routeName = 'rate office';
          if (Router.current().route && Router.current().params.officeId) {
            let office = Offices.findOne({_id: Router.current().params.officeId});
            if (office) {
              routeName += ' ' + office.number;
            }
          }
          break;
        case 'createMyOffice':
          routeName = 'add my office';
          break;
        case 'editMyOffice':
          routeName = 'edit my office';
          break;
        case 'myOfficeAvailabilities':
          routeName = 'availabilities';
          break;
        case 'myOfficeUsers':
          routeName = 'owners & users';
          break;
        case 'agenda':
          routeName = 'calendar';
          break;
        case 'notifications':
          routeName = 'notifications';
          break;
        case 'stats':
          routeName = 'statistics';
          break;
        case 'flatImport':
          routeName = 'import offices';
          break;
        case 'uidImport':
          routeName = 'import uids';
          break;
        }
      }
      return routeName;
    }
    return '404';
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
