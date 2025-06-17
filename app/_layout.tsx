import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import ToastManager from 'toastify-react-native';

import '../global.css';

const queryClient = new QueryClient();

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

  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
      <ToastManager />
    </QueryClientProvider>
  );
};

export default Layout;
