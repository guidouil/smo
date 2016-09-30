let moment = require('moment');

SyncedCron.add({
  name: 'reservationsNotCancelable',
  schedule: function(parser) {
    return parser.text('every 30 minutes');
  },
  job: function(intendedAt) {
    let now = moment(intendedAt).format('HH:mm');
    let today = moment(intendedAt).startOf('day').toDate();
    Reservations.update(
      {
        day: {$lte: today},
        startTime: {$lte: now},
        $or: [
          {cancelable: true},
          {cancelable: null},
        ],
      },
      { $set: {cancelable: false}},
      {multi: true},
    );
  },
});
