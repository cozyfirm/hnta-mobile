import { useEffect, useState } from 'react';

import { Platform } from 'react-native';

import messaging from '@react-native-firebase/messaging';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import { Slot, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import ToastManager, { Toast } from 'toastify-react-native';

import '../global.css';

import { getBaseURL } from '@/helpers';
import { initializeApp } from '@/services/app-init';
import { useAuthStore } from '@/store';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

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
  const { setFcmToken } = useAuthStore();
  const [isAppInitialized, setIsAppInitialized] = useState(false);

  const requestUserPermission = async () => {
    try {
      // Request permission for iOS
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      // For Android, request additional permissions if needed
      if (Platform.OS === 'android') {
        // Request notification permission for Android
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();

        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== 'granted') {
          console.log(
            'Android notification permission not granted:',
            finalStatus
          );
        } else {
          console.log('Android notification permission granted');
        }
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  const handleNotificationNavigation = (remoteMessage: any) => {
    try {
      const { data } = remoteMessage;

      if (!data || !data.type) {
        console.log('No notification type found in data');
        return;
      }

      switch (data.type) {
        case 'blog':
          // Navigate to news detail with post ID
          router.replace({
            pathname: '/authenticated/news-detail',
            params: { id: data.inbox_to_id },
          });
          break;

        case 'inbox':
          // Navigate to notification detail with inbox ID
          router.replace({
            pathname: '/authenticated/notification-detail',
            params: { id: data.inbox_to },
          });
          break;

        case 'message':
          // Navigate to chat detail with message data
          try {
            const chatData = data.chat ? JSON.parse(data.chat) : null;
            if (chatData) {
              router.replace({
                pathname: '/authenticated/chat-detail',
                params: {
                  id:
                    chatData.conversation_id?.toString() ||
                    chatData.id?.toString(),
                  userId: data.sender_id,
                  name: chatData.name || 'Chat',
                },
              });
            } else {
              // Fallback: if no chat data, try to navigate with just sender_id
              router.replace({
                pathname: '/authenticated/chat-detail',
                params: {
                  userId: data.sender_id,
                  name: 'Chat',
                },
              });
            }
          } catch (error) {
            console.error('Error parsing chat data:', error);
            // Fallback: navigate with sender_id only
            router.push({
              pathname: '/authenticated/chat-detail',
              params: {
                userId: data.sender_id,
                name: 'Chat',
              },
            });
          }
          break;

        default:
          console.log('Unknown notification type:', data.type);
      }
    } catch (error) {
      console.error('Error handling notification navigation:', error);
    }
  };

  // Initialize app with dynamic base URL
  useEffect(() => {
    const initApp = async () => {
      try {
        await initializeApp();
        setIsAppInitialized(true);
      } catch (error) {
        console.error('Failed to initialize app:', error);
        // Still set as initialized to prevent blocking the app
        setIsAppInitialized(true);
      }
    };

    initApp();
  }, []);

  // Register Firebase messaging and notifications
  useEffect(() => {
    const registerForMessages = async () => {
      try {
        await Notifications.setBadgeCountAsync(0);
        await requestUserPermission();

        const token = await messaging().getToken();
        if (token) {
          console.log('FCM Token:', token);
          setFcmToken(token);
        } else {
          console.error('Failed to retrieve FCM token');
        }

        const unsubscribeOnMessage = messaging().onMessage(
          async (remoteMessage) => {
            console.log('Message received in the foreground!', remoteMessage);

            // Extract notification title and body
            const title =
              remoteMessage.notification?.title || 'New Notification';
            const body =
              remoteMessage.notification?.body || 'You have a new message';

            Toast.show({
              text1: title,
              text2: body,
              type: 'info',
              onPress: () => {
                handleNotificationNavigation(remoteMessage);
              },
            });
          }
        );

        const unsubscribeOnNotificationOpened =
          messaging().onNotificationOpenedApp((remoteMessage) => {
            console.log(
              'Notification caused app to open from background state:',
              remoteMessage
            );
            handleNotificationNavigation(remoteMessage);
          });

        messaging()
          .getInitialNotification()
          .then((remoteMessage) => {
            if (remoteMessage) {
              console.log(
                'Notification caused app to open from quit state:',
                remoteMessage
              );
              handleNotificationNavigation(remoteMessage);
            }
          });

        return () => {
          unsubscribeOnMessage();
          unsubscribeOnNotificationOpened();
        };
      } catch (error) {
        console.error('Error setting up FCM:', error);
      }
    };

    registerForMessages();
  }, []);

  // Hide splash screen when everything is ready
  useEffect(() => {
    const hideSplashScreen = async () => {
      if (fontsLoaded && isAppInitialized) {
        await SplashScreen.hideAsync();
      }
    };

    hideSplashScreen();
  }, [fontsLoaded, isAppInitialized]);

  if (!fontsLoaded || !isAppInitialized) {
    return null; // Return null instead of LoadingScreen to keep splash screen visible
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
      <ToastManager />
    </QueryClientProvider>
  );
};

export default Layout;
