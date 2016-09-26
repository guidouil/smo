Meteor.subscribe('MyOwnedOffices');
Meteor.subscribe('MyUsageOffices');
Meteor.subscribe('MyReservations');

escapeHtml = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

Template.main.onRendered(function () {
  let Hammer = require('hammerjs');
  let body = document.body;
  let hammertime = new Hammer(body);
  hammertime.on('swipeleft', function() {
    $('.mainSidebar').sidebar('hide');
  });
  hammertime.on('swiperight', function() {
    $('.mainSidebar').sidebar('show');
  });
});

Template.main.helpers({
  showFooter () {
    if (! Meteor.userId()) {
      return true;
    }
    if (Router.current().route) {
      let showFooterRoutes = ['home', 'help', 'splash'];
      return _.contains(showFooterRoutes, Router.current().route.getName());
    }
    return false;
  },
  isFluid () {
    if ($(document).width() < 1024) {
      return 'fluid';
    }
    return '';
  },
});

Template.registerHelper('toLowerCase', function (string) {
  if (string) {
    check(string, String);
    return string.toLowerCase();
  }
});

Template.registerHelper('toUpperCase', function (string) {
  if (string) {
    check(string, String);
    return string.toUpperCase();
  }
});

Template.registerHelper('capitalize', function (string) {
  if (string) {
    check(string, String);
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
});

Template.registerHelper('truncate', function (string, length) {
  if (string) {
    check(string, String);
    check(length, Number);
    let ending = '';
    if (string.length > length) {
      ending = '...';
    }
    return string.slice(0, length) + ending;
  }
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
  let profileImage = '/male.png';
  // if (Meteor.user()) {
  //   let email = contactEmail(Meteor.user());
  //   if (email) {
  //     profileImage = Gravatar.imageUrl(email);
  //   }
  // }
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
