let Papa = require('papaparse');

Template.uidImport.onCreated(function () {
});

Template.uidImport.onRendered(function () {
  if (! Meteor.userId()) {
    Router.go('uid');
  }
});

Template.uidImport.helpers({
});

Template.uidImport.events({
  'click .close' (evt) {
    $(evt.target).closest('.message').transition('fade');
  },
  'click #csvImportedUidsText, click #csvImportedUidsIcon' () {
    $('#csvImportedUids').click();
  },
  'change #csvImportedUids' (evt, tmpl) {
    let csvImportedUids = tmpl.find('#csvImportedUids').files[0];
    if (csvImportedUids && csvImportedUids.type === 'text/csv') {
      $('#csvImportedUidsText').val(csvImportedUids.name);
      Papa.parse(csvImportedUids, {
        header: true,
        complete: function(results) {
          let counter = 0;
          $('#csvImportedUidsText').val('Imported 0 UID');
          if (results && results.data && results.data.length > 0) {
            _.each( results.data, function (uidInfo) {
              if (uidInfo.uid && uidInfo.uid !== '') {
                Meteor.call('importUid', uidInfo, function(error, result){
                  if (error) {
                    console.error(error);
                  }
                  if (result) {
                    counter++;
                    $('#csvImportedUidsText').val('Imported ' + counter + ' UID(s)');
                  }
                });
              }
            });
          }
        },
      });
    } else {
      alert('Sorry, this must be a CSV file.');
    }
    $('#csvImportedUids').val('');
  },
});
