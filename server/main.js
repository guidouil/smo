import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  Reservations._ensureIndex({'officeId': 1});
});
