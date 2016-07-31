import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  Offices._ensureIndex({'owners': 1});
  Reservations._ensureIndex({'officeId': 1});
  Reservations._ensureIndex({'creator': 1});
});
