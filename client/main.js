Meteor.subscribe('MyOffices');

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

Template.registerHelper('nl2br', function (string) {
  check(string, String);
  return string.replace(/\n/g, '<br>');
});
