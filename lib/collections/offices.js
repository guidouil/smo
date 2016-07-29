Offices = new Mongo.Collection('offices');

Offices.allow({
  insert: function (userId, doc) {
    return userId && _.contains(doc.owners, userId);
  },
  update: function (userId, doc) {
    return userId && _.contains(doc.owners, userId);
  },
  remove: function (userId, doc) {
    return userId && _.contains(doc.owners, userId);
  },
  fetch: ['owners'],
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
