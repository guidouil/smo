Template.editProfile.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

Template.editProfile.helpers({
  currentUpload () {
    return Template.instance().currentUpload.get();
  },
});

Template.editProfile.events({
  'click .uploadImage' (e) {
    $('input:file', $(e.target).parents()).click();
  },
  'change #imageInput' (e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      let name = e.currentTarget.files[0].name;
      $('.imageText', $(e.currentTarget).parent()).val(name);
      // We upload only one file, in case
      // multiple files were selected
      let upload = Images.insert({
        file: e.currentTarget.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      upload.on('start', function () {
        template.currentUpload.set(this);
        $('#uploadProgress')
          .progress({
            duration: 200,
            total: 100,
          });
      });

      upload.on('end', function (error, fileRef) {
        if (error) {
          console.error('Error during upload: ' + error);
        } else {
          let query = {};
          query['profile.image'] = Meteor.absoluteUrl() + fileRef.path.replace('/data/', '');
          Meteor.users.update(Meteor.userId(), { $set: query });
        }
        template.currentUpload.set(false);
      });

      upload.start();
    }
  },
});

Template.editProfile.onRendered(function () {
});
