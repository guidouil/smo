Reservations = new Mongo.Collection('reservations');

Reservations.allow({
  insert: function (userId, doc) {
    return userId && doc.creator === userId;
  },
  update: function (userId, doc) {
    return userId && doc.creator === userId;
  },
  remove: function(userId, doc) {
    return userId && doc.creator === userId;
  },
  fetch: ['creator'],
});

let ReservationsSchema = new SimpleSchema({
  officeId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  officeNumber: {
    type: String,
    label: 'Office number',
  },
  date: {
    type: Date,
  },
  creator: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  createdAt: {
    type: Date,
  },
});

Reservations.attachSchema(ReservationsSchema);
