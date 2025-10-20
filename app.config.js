module.exports = {
  expo: {
    name: 'HNTA',
    slug: 'hnta',
    version: '1.0.3',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'hntamobile',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      supportsTablet: false,
      bundleIdentifier: 'ba.talentakademija.app',
      googleServicesFile: './GoogleService-Info.plist',
      entitlements: {
        'aps-environment': 'production',
      },
      infoPlist: {
        UIBackgroundModes: ['remote-notification'],
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#333366',
      },
      versionCode: 1,
      package: 'ba.talentakademija.app',
      edgeToEdgeEnabled: true,
      googleServicesFile: './google-services.json',
      permissions: [
        'android.permission.WAKE_LOCK',
        'android.permission.VIBRATE',
        'android.permission.RECEIVE_BOOT_COMPLETED',
        'android.permission.USE_FULL_SCREEN_INTENT',
      ],
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#333366',
        },
      ],
      '@react-native-firebase/app',
      '@react-native-firebase/messaging',
      [
        'expo-build-properties',
        {
          ios: {
            useFrameworks: 'static',
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      eas: {
        projectId: '2deb3322-36ce-41e2-9e98-d073eaefb0c7',
      },
    },
  },
};
