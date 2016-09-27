import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  Offices._ensureIndex({'owners': 1});
  Offices._ensureIndex({'users': 1});
  Reservations._ensureIndex({'officeId': 1});
  Reservations._ensureIndex({'creator': 1});
  if (LocalUids.find().count() === 0) {
    // this is not a bouchon
    LocalUids.insert({
      _id: 123456,
      firstname: 'John',
      lastname: 'DOE',
      mail: 'john.doe@bnpparibas.com',
    });
  }
});
