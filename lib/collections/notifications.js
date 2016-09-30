Notifications = new Mongo.Collection('notifications');

Notifications.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function () {
    return true;
  },
});

let NotificationsSchema = new SimpleSchema({
  fromLabel: {
    type: String,
    label: 'Notification is from Label',
  },
  from: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: 'Notification is from userId',
    optional: true,
  },
  to: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: 'Notification is to userId',
  },
  title: {
    type: String,
    label: 'Notification title',
  },
  text: {
    type: String,
    label: 'Notification text',
    optional: true,
  },
  url: {
    type: String,
    label: 'Notification url',
    optional: true,
  },
  type: {
    type: String,
    label: 'Notification type',
    optional: true,
  },
  isRead: {
    type: Boolean,
    label: 'Is notification read ?',
    autoValue: function () {
      if (this.isInsert) {
        return false;
      } else if (this.isUpsert) {
        return {$setOnInsert: false};
      }
    },
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

Notifications.attachSchema(NotificationsSchema);
