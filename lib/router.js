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

Router.route('/edit-profile', {
  name: 'editProfile',
  title: 'Edit profile',
});

Router.route('/help', {
  name: 'help',
  title: 'Help',
});

Router.route('/notifications', {
  name: 'notifications',
  title: 'Notifications',
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

Router.route('/my-office-availabilities/:officeId', {
  name: 'myOfficeAvailabilities',
  title: 'My office availabilities',
});

Router.route('/my-office-reservations/:officeId', {
  name: 'myOfficeReservations',
  title: 'My office reservations',
});

Router.route('/my-office-users/:officeId', {
  name: 'myOfficeUsers',
  title: 'My office users',
});

Router.route('/office/:officeId', {
  name: 'office',
  title: 'View office',
});

Router.route('/rate-office/:officeId/:reservationId', {
  name: 'rateOffice',
  title: 'Rate office',
});

Router.route('/search/:query?', {
  name: 'search',
  title: 'Search',
});

Router.route('/agenda/:officeId?', {
  name: 'agenda',
  title: 'Agenda',
});

Router.route('/reservation/:reservationId?', {
  name: 'reservation',
  title: 'Reservation',
});

Router.route('/splash', {
  name: 'splash',
  title: 'Splash',
});

// Router.route('/stats', {
//   name: 'stats',
//   title: 'Stats',
// });

Router.route('/flatimport', {
  name: 'flatImport',
  title: 'flatImport',
});

Router.route('/uidimport', {
  name: 'uidImport',
  title: 'uidImport',
});

// Auth
Router.route('/uid', {
  name: 'uid',
  title: 'UID',
});

Router.route('/uid-info/:uid', {
  name: 'uidInfo',
  title: 'UID Info',
});

Router.route('/create-account/:uid/:token', {
  name: 'createAccount',
  title: 'Create account',
});

Router.route('/password/:uid', {
  name: 'password',
  title: 'Password',
});
