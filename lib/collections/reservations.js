Reservations = new Mongo.Collection('reservations');

Reservations.allow({
  insert: function (userId, doc) {
    return userId && doc.creator === userId;
  },
  update: function (userId, doc, fields) {
    return userId && doc.creator === userId && !_.contains(fields, 'createdAt') && !_.contains(fields, 'creator') && !_.contains(fields, 'creatorEmail');
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
    label: 'Reserved office ID',
  },
  officeNumber: {
    type: String,
    label: 'Office number',
  },
  day: {
    type: Date,
    label: 'Reservation day date',
  },
  startTime: {
    type: String,
    label: 'Reservation start time',
  },
  endTime: {
    type: String,
    label: 'Reservation end time',
  },
  creator: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: 'Reservation creator UserId',
  },
  creatorEmail: {
    type: String,
    label: 'Reservation creator email',
  },
  rated: {
    type: Boolean,
    label: 'Is reservation rated ?',
    autoValue: function () {
      if (this.isInsert) {
        return false;
      } else if (this.isUpsert) {
        return {$setOnInsert: false};
      }
    },
  },
  rating: {
    type: Number,
    label: 'Reservtion rating',
    optional: true,
  },
  comment: {
    type: String,
    label: 'Reservation comment',
    optional: true,
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();
      }
    },
  },
  updatedAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert || this.isUpdate) {
        return new Date();
      }
    },
    optional: true,
  },
});

Reservations.attachSchema(ReservationsSchema);
