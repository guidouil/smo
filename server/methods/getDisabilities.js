Meteor.methods({
  getDisabilities: function (officeId) {
    check(officeId, String);
    let office = Offices.findOne({ _id: officeId });
    let disabilities = [true]; // disable all but availables availabilities
    _.each( office.availabilities, function( availability ) {
      if (availability.available === true) {
        disabilities.push(availability.date);
      }
    });
    return disabilities;
  },
});
