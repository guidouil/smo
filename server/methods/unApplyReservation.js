Meteor.methods({
  'unApplyReservation': function (officeId, date) {
    check(officeId, String);
    check(date, Date);
    let office = Offices.findOne({ _id: officeId });
    if (office && office.availabilities && office.availabilities.length > 0) {
      let moment = require('moment');
      _.each( office.availabilities, function( availability ) {
        if (moment(availability.date).isSame(date, 'day')) {
          Offices.update({_id: office._id, 'availabilities.date': date}, {$set: {
            'availabilities.$.available': true,
          }});
        }
      });
    }
  },
});
