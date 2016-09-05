// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: 'com.bnpparibas.sharemyoffice',
  name: 'Share my office',
  description: 'Le partage des bureaux en temps-réel chez BNP Paribas',
  author: 'Guillaume Darbonne',
  email: 'guillaume.darbonne@businessdecision.com',
  website: 'http://92.222.92.44:3000/'
});
// Set up resources such as icons and launch screens.
// App.icons({
//   'iphone': 'icons/icon-60.png',
//   'iphone_2x': 'icons/icon-60@2x.png',
//   // ... more screen sizes and platforms ...
// });
// App.launchScreens({
//   'iphone': 'splash/Default~iphone.png',
//   'iphone_2x': 'splash/Default@2x~iphone.png',
//   // ... more screen sizes and platforms ...
// });
// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');
// Pass preferences for a particular PhoneGap/Cordova plugin
// App.configurePlugin('com.phonegap.plugins.facebookconnect', {
//   APP_ID: '1234567890',
//   API_KEY: 'supersecretapikey'
// });
