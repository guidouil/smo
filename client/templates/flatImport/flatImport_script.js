let Papa = require('papaparse');

Template.flatImport.onCreated(function () {
  this.subscribe('ImportedOffices');
});

Template.flatImport.onRendered(function () {
  if (! Meteor.userId()) {
    Router.go('uid');
  }
});

Template.flatImport.helpers({
});

Template.flatImport.events({
  'click #csvImportedOfficesText, click #csvImportedOfficesIcon' () {
    $('#csvImportedOffices').click();
  },
  'change #csvImportedOffices' (evt, tmpl) {
    var csvImportedOffices = tmpl.find('#csvImportedOffices').files[0];
    if (csvImportedOffices && csvImportedOffices.type === 'text/csv') {
      $('#csvImportedOfficesText').val(csvImportedOffices.name);
      Papa.parse(tmpl.find('#csvImportedOffices').files[0], {
        header: true,
        complete: function(results) {
          let counter = 0;
          $('#csvImportedOfficesText').val('Imported 0 office');
          if (results && results.data && results.data.length > 0) {
            _.each( results.data, function (office) {
              if (office.number && office.number !== '') {
                Meteor.call('importeOffice', office, function(error, result){
                  if (error) {
                    console.error(error);
                  }
                  if (result) {
                    counter++;
                    $('#csvImportedOfficesText').val('Imported ' + counter + ' office(s)');
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
    $('#csvImportedOffices').val('');
  },
});
