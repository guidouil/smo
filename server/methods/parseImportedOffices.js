Meteor.methods({
  'importeOffice': function (office) {
    let savedOffice = Offices.findOne({number: office.number});
    if (savedOffice) {
      return false;
    }
    if (office.users) {
      office.users = office.users.split(',');
    }
    let importedOffice = ImportedOffices.findOne({_id: office.number});
    if (importedOffice) {
      ImportedOffices.update({_id: importedOffice._id}, {$set: office});
      return true;
    }
    office._id = office.number;
    ImportedOffices.insert(office);
    return true;
  },
});
