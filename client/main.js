Meteor.subscribe('MyOwnedOffices');
Meteor.subscribe('MyUsageOffices');
Meteor.subscribe('MyReservations');

escapeHtml = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

Template.main.onRendered(function () {
  // let swipe = require('jquery-touchswipe');
  // $('body').swipe({
  //   //Generic swipe handler for all directions
  //   swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
  //     if (direction === 'right') {
  //       $('.mainSidebar').sidebar('show');
  //     }
  //     if (direction === 'left') {
  //       $('.mainSidebar').sidebar('hide');
  //     }
  //     if (direction === 'up') {
  //       window.scrollBy(0, distance);
  //     }
  //     if (direction === 'down') {
  //       window.scrollBy(0, distance * -1);
  //     }
  //   },
  // });
});

Template.main.helpers({
  isHomeOrHelp () {
    if (Router.current().route) {
      return Router.current().route.getName() === 'home' || Router.current().route.getName() === 'help';
    }
    return false;
  },
});

Template.registerHelper('toLowerCase', function (string) {
  check(string, String);
  return string.toLowerCase();
});

Template.registerHelper('toUpperCase', function (string) {
  check(string, String);
  return string.toUpperCase();
});

Template.registerHelper('capitalize', function (string) {
  check(string, String);
  return string.charAt(0).toUpperCase() + string.slice(1);
});

Template.registerHelper('plural', function (number) {
  if (number > 1) {
    return 's';
  }
  return '';
});

Template.registerHelper('toFurnitureName', function (furniture) {
  check(furniture, String);
  let furnitures = {
    printer: 'imprimante',
    whiteboard: 'tableau blanc',
    multiphone: 'pieuvre',
    plugs: 'multiprise',
    beamer: 'projecteur',
    coffee: 'machine à café',
  };
  return furnitures[furniture];
});

Template.registerHelper('isOfficeOwner', function (officeId) {
  if (Meteor.userId()) {
    if (! officeId) {
      officeId = Router.current().params.officeId;
    }
    if (officeId) {
      return isOfficeOwner(officeId, Meteor.userId());
    }
  }
  return false;
});

Template.registerHelper('isOfficeOwnerOrUser', function (officeId) {
  if (Meteor.userId()) {
    if (! officeId) {
      officeId = Router.current().params.officeId;
    }
    if (officeId) {
      return isOfficeOwnerOrUser(officeId, Meteor.userId());
    }
  }
  return false;
});

Template.registerHelper('nl2br', function (string) {
  check(string, String);
  return string.replace(/\n/g, '<br>');
});

Template.registerHelper('isAllFalse', function (object) {
  check(object, Object);
  let allFalse = true;
  _.each( object, function ( available ) {
    if (available === true) {
      allFalse = false;
    }
  });
  return allFalse;
});

Template.registerHelper('profileImageUrl', function () {
  let profileImage = '';
  if (Meteor.user()) {
    let email = contactEmail(Meteor.user());
    if (email) {
      profileImage = Gravatar.imageUrl(email);
    }
  }
  return profileImage;
});

Template.registerHelper('userName', function (email) {
  if (Meteor.user()) {
    email = email || contactEmail(Meteor.user());
    if (email) {
      let piece = email.split('@');
      if (piece[0].search('.') !== -1) {
        return piece[0].split('.')[0];
      }
      return piece[0];
    }
  }
  return '';
});

Template.registerHelper('myEmail', function () {
  if (Meteor.user()) {
    return contactEmail(Meteor.user());
  }
  return '';
});

Template.registerHelper('toDate', function (date) {
  check(date, Date);
  let moment = require('moment');
  moment.locale('fr');
  return moment(date).format('DD/MM/YYYY');
});

Template.registerHelper('equals', function (a, b) {
  return a === b;
});
