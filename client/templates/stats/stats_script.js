import { Template } from 'meteor/templating';

import './stats_template.html';

Template.stats.onCreated(function() {
  let template = this;
  template.stats = new ReactiveVar();
  Meteor.call('getStats', function(error, result) {
    if (error) {
      console.error(error);
    }
    if (result) {
      template.stats.set(result);
    }
  });
});

Template.stats.onRendered(function () {
  let template = this;

});

Template.stats.helpers({
  stats () {
    return Template.instance().stats.get();
  },
});

Template.stats.events({

});
