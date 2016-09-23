Meteor.methods({
  'getUserFromUid': function (uid) {
    check(uid, String);
    return Meteor.users.findOne({username: uid});
  }
});
