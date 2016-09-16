// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: 'com.bnpparibas.sharemyoffice',
  name: 'Share my office',
  description: 'Realtime Desk Sharing @ BNP Paribas',
  author: 'BNP Digital Lab',
  email: 'franck.sarrazin@bnpparibas.com',
  website: 'http://sharemyoffice.eu-gb.mybluemix.net/'
});
// Set up resources such as icons and launch screens.
App.icons({
  'ios_settings': 'resources/icons/Icon-Small.png', // 29x29
  'ios_settings_2x': 'resources/icons/Icon-Small@2x.png', // 58x58
  // 'ios_settings_3x': 'resources/icons/icon-87x87.png', // 87x87
  // 'ios_spotlight': 'resources/icons/icon-40x40.png', // 40x40
  'ios_spotlight_2x': 'resources/icons/Icon-Small-40@2x.png', // 80x80
  'iphone_2x': 'resources/icons/Icon-60@2x.png', // 120x120
  'iphone_3x': 'resources/icons/Icon-60@3x.png', // 180x180
  // 'ipad': 'resources/icons/icon-76x76.png', // 76x76
  // 'ipad_2x': 'resources/icons/icon-152x152.png', // 152x152
  // 'ipad_pro': 'resources/icons/icon-167x167.png', //167x167
});
App.launchScreens({
  'iphone_2x': 'resources/splash/Default@2x.png', // 640x960
  'iphone5': 'resources/splash/Default-568h@2x.png', // 640x1136
  'iphone6': 'resources/splash/Default-667h@2x.png', // 750x1334
  'iphone6p_portrait': 'resources/splash/Default-Portrait-736h@3x.png', // 1242x2208
  'iphone6p_landscape': 'resources/splash/Default-Landscape-736h@3x.png', // 2208x1242
  // 'ipad_portrait': 'resources/splash/Default-Portrait.png', // 768x1024
  // 'ipad_landscape': 'resources/splash/Default-Landscape.png', // 1024x768
  // 'ipad_portrait_2x': 'resources/splash/Default-Portrait@2x.png', // 1536x2048
  // 'ipad_landscape_2x': 'resources/splash/Default-Landscape@2x.png', // 2048x1536
  // 'ipad_pro_portrait': 'resources/splash/Default-Portrait@3x.png', // 2048x2732
  // 'ipad_pro_landscape': 'resources/splash/Default-Landscape@3x.png', // 2732x2048
});
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
App.accessRule('*');
