Meteor.methods({
  'importUid': function (uidInfo) {
    if (this.userId) {
      LocalUids.upsert({_id: uidInfo.uid}, {$set: uidInfo});
      return true;
    }
    return false;
  },
});
