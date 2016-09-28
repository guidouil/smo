LocalUids = new Mongo.Collection('localuids');
LocalUids.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return false;
  }
});
