Offices = new Mongo.Collection('offices');

Offices.allow({
  insert: function (userId, doc) {
    return userId && _.contains(doc.owners, userId);
  },
  update: function (userId, doc, fields) {
    return userId && !_.contains(fields, 'createdAt') && (_.contains(doc.owners, userId) || (_.contains(doc.users, userId) && !_.contains(fields, 'owners')));
  },
  remove: function (userId, doc) {
    return userId && _.contains(doc.owners, userId);
  },
  fetch: ['owners', 'users'],
});

let availabilitySchema = new SimpleSchema({
  date: {
    type: Date,
    label: 'Availability date',
  },
  available: {
    type: Boolean,
    label: 'Availability status',
  },
  user: {
    type: String,
    optional: true,
  },
  reservedAt: {
    type: Date,
    optional: true,
  },
  creator: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  createdAt: {
    type: Date,
  },
});

let OfficesSchema = new SimpleSchema({
  number: {
    type: String,
    label: 'Office number',
  },
  address: {
    type: String,
    label: 'Office address',
  },
  capacity: {
    type: Number,
    label: 'Office capacity',
  },
  comment: {
    type: String,
    label: 'Office comment',
    optional: true,
  },
  furnitures: {
    type: Object,
    label: 'Office furnitures',
    blackbox: true,
    optional: true,
  },
  owners: {
    type: [String],
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
    autoValue: function () { if (this.isInsert) { return [this.userId]; }}
  },
  users: {
    type: [String],
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
  },
  openDays: {
    type: Object,
    label: 'Office open days',
    blackbox: true,
    optional: true,
    autoValue: function () {
      if (this.isInsert) {
        return {monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: false, sunday: false};
      }
    },
  },
  openAt: {
    type: String,
    autoValue: function () {
      if (this.isInsert) {
        return '9:00';
      }
    },
    optional: true,
  },
  closeAt: {
    type: String,
    autoValue: function () {
      if (this.isInsert) {
        return '18:00';
      }
    },
    optional: true,
  },
  availabilities: {
    type: [availabilitySchema],
    label: 'Office availabilities',
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

Offices.attachSchema(OfficesSchema);
