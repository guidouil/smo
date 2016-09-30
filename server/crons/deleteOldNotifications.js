let moment = require('moment');

SyncedCron.add({
  name: 'deleteOldNotifications',
  schedule: function(parser) {
    return parser.text('every day');
  },
  job: function(intendedAt) {
    let lastWeek = moment(intendedAt).subtract(7, 'days').startOf('day').toDate();
    Notifications.remove({
      isRead: true,
      day: {$lte: lastWeek},
    });
  },
});
