LocalUids = new Mongo.Collection('localuids');
LocalUids.allow({
  insert: function(){
    return false;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return false;
  }
});
