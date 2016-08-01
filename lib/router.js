Router.configure({
  layoutTemplate: 'main',
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading',
  templateNameConverter: 'camelCase',
  routeControllerNameConverter: 'camelCase',
});

Router.route('/', {
  name: 'home',
  title: 'Home',
});

Router.route('/profile', {
  name: 'profile',
  title: 'Profile',
});

Router.route('/my-office/:officeId?', {
  name: 'myOffice',
  title: 'My office',
});

Router.route('/share-my-office/', {
  name: 'createMyOffice',
  title: 'Share my office',
});

Router.route('/edit-my-office/:officeId', {
  name: 'editMyOffice',
  title: 'Edit my office',
});

Router.route('/my-office-calendar/:officeId', {
  name: 'myOfficeCalendar',
  title: 'My office calendar',
});

Router.route('/my-office-users/:officeId', {
  name: 'myOfficeUsers',
  title: 'My office users',
});

Router.route('/office/:officeId', {
  name: 'office',
  title: 'View office',
});

Router.route('/search/:query?', {
  name: 'search',
  title: 'Search',
});

Router.route('/agenda/:officeId?', {
  name: 'agenda',
  title: 'Agenda',
});

Router.plugin('ensureSignedIn', {
  only: ['profile', 'myOffice', 'createMyOffice', 'editMyOffice', 'office', 'search', 'agenda']
});
