import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';

import '../global.css';

const Layout = () => {
  const [fontsLoaded, fontError] = useFonts({
    'GimletSansVariable-Light': require('../assets/fonts/GimletSansVariable-Light.ttf'),
    'GimletSansVariable-Regular': require('../assets/fonts/GimletSansVariable-Regular.ttf'),
    'GimletSansVariable-Medium': require('../assets/fonts/GimletSansVariable-Medium.ttf'),
    'GimletSansVariable-SemiBold': require('../assets/fonts/GimletSansVariable-SemiBold.ttf'),
    'GimletSansVariable-Bold': require('../assets/fonts/GimletSansVariable-Bold.ttf'),
    'GimletSansVariable-Black': require('../assets/fonts/GimletSansVariable-Black.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <Slot />;
};

export default Layout;
