let moment = require('moment');

SyncedCron.add({
  name: 'reservationsEndNotifications',
  schedule: function(parser) {
    return parser.text('every 30 minutes');
  },
  job: function(intendedAt) {
    let now = moment(intendedAt).format('HH:mm');
    let today = moment(intendedAt).startOf('day').toDate();
    let reservations = Reservations.find({day: today, endTime: now}).fetch();
    if (reservations && reservations.length > 0) {
      _.each(reservations, function (reservation) {
        Notifications.insert({
          fromLabel: 'System',
          to: reservation.creator,
          title: 'Rate office ' + reservation.officeNumber,
          url: Meteor.absoluteUrl('rate-office/' + reservation.officeId + '/' + reservation._id),
        });
      });
    }
  },
});
