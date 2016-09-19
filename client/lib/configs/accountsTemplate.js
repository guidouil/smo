// Options
AccountsTemplates.configure({
  defaultLayout: 'main',
  showForgotPasswordLink: true,
  overrideLoginErrors: true,
  enablePasswordChange: true,
  sendVerificationEmail: false,

  // enforceEmailVerification: true,
  // confirmPassword: true,
  continuousValidation: true,
  // displayFormLabels: true,
  // forbidClientAccountCreation: false,
  // formValidationFeedback: true,
  homeRoutePath: '/',
  showAddRemoveServices: true,
  showPlaceholders: true,

  negativeValidation: true,
  positiveValidation: true,
  negativeFeedback: false,
  positiveFeedback: true,

  // Privacy Policy and Terms of Use
  // privacyUrl: 'privacy',
  // termsUrl: 'terms-of-use',
});

// T9n.setLanguage('fr');

//Routes
AccountsTemplates.configureRoute('changePwd', {
  layoutTemplate: 'accountsLayout',
  redirect: '/',
});
AccountsTemplates.configureRoute('enrollAccount', {
  layoutTemplate: 'accountsLayout',
  redirect: '/',
});
AccountsTemplates.configureRoute('forgotPwd', {
  layoutTemplate: 'accountsLayout',
  redirect: '/',
});
AccountsTemplates.configureRoute('resetPwd', {
  layoutTemplate: 'accountsLayout',
  redirect: '/',
});
AccountsTemplates.configureRoute('signIn', {
  layoutTemplate: 'accountsLayout',
  redirect: '/',
});
AccountsTemplates.configureRoute('signUp', {
  layoutTemplate: 'accountsLayout',
  redirect: '/',
});
AccountsTemplates.configureRoute('verifyEmail', {
  layoutTemplate: 'accountsLayout',
  redirect: '/',
});
