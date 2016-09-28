contactEmail = function (user) {
  let email;
  if (user.emails && user.emails.length) {
    email = user.emails[0].address;
  }
  if (user.services && user.services.facebook && user.services.facebook.email) {
    email = user.services.facebook.email;
  }
  if (user.services && user.services.google && user.services.google.email) {
    email = user.services.google.email;
  }
  if (user.services && user.services.twitter && user.services.twitter.screenName) {
    email = user.services.twitter.screenName + '@gmail.com';
  }
  return email;
};

validateEmail = function (email) {
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
};
