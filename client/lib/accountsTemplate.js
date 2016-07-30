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

  texts: {
    title: {
      changePwd: 'Password Share My Office',
      enrollAccount: 'Enroll Share My Office',
      forgotPwd: 'Forgot Password Share My Office',
      resetPwd: 'Reset Password Share My Office',
      signIn: 'Sign In Share My Office',
      signUp: 'Sign Up Share My Office',
      verifyEmail: 'Verify Email Share My Office',
    },
  },
});

//Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');
