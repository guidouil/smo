import { Template } from 'meteor/templating';

import './notifications_template.html';

Template.notifications.onCreated(function() {
  let template = this;
  template.subscribe('MyNotifications');
});

Template.notifications.onRendered(function () {
  let template = this;

});

Template.notifications.helpers({
  notifications () {
    return Notifications.find({to: Meteor.userId()}, {sort: {isRead: 1, createdAt: -1}});
  },
});

Template.notifications.events({
  'click .notification' () {
    if (! this.isRead) {
      Notifications.update({_id: this._id}, {$set: {
        isRead: true,
      }});
    }
  },
});
