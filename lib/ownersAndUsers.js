isOfficeOwner = function (officeId, userId) {
  check(officeId, String);
  check(userId, String);
  // check if given userId is one of the office owners
  let office = Offices.findOne({_id: officeId});
  if (office && office.owners && office.owners.length >= 1) {
    if (_.contains(office.owners, userId)) {
      return true;
    }
  }
  return false;
};

isOfficeUser = function (officeId, userId) {
  check(officeId, String);
  check(userId, String);
  // check if given userId is one of the office users
  let office = Offices.findOne({_id: officeId});
  if (office && office.users && office.users.length >= 1) {
    if (_.contains(office.users, userId)) {
      return true;
    }
  }
  return false;
};
