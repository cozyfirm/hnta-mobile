import React from 'react';

import {
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuthStore } from '@/store';

interface DrawerProps {
  isVisible: boolean;
  onClose: () => void;
}

const menuItems = [
  { id: 1, title: 'Vijesti', route: '/authenticated/news' },
  { id: 2, title: 'Važni kontakti', route: '/authenticated/contacts' },
  { id: 3, title: 'Lokacije', route: '/authenticated/locations' },
  { id: 4, title: 'Predavači', route: '/authenticated/presenters' },
  { id: 5, title: 'Studenti', route: '/authenticated/attendees' },
  { id: 6, title: 'O nama', route: '/authenticated/about' },
  { id: 7, title: 'Pravila privatnosti', route: '/authenticated/privacy' },
  { id: 8, title: 'Odjavi se', route: '/logout' },
] as const;

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = SCREEN_WIDTH;

const Drawer = ({ isVisible, onClose }: DrawerProps) => {
  const { setUser } = useAuthStore();
  const insets = useSafeAreaInsets();
  const translateX = React.useRef(new Animated.Value(DRAWER_WIDTH)).current;

  React.useEffect(() => {
    Animated.timing(translateX, {
      toValue: isVisible ? 0 : DRAWER_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  const handleMenuItemPress = (route: string) => {
    onClose();
    if (route === '/logout') {
      setUser(null);
      router.push('/guest');
    } else {
      router.push(route as any); // Using type assertion as a temporary solution
    }
  };

  if (!isVisible) return null;

  return (
    <View
      className="absolute inset-0 z-50"
      style={{
        top: -insets.top, // Extend above safe area
        bottom: -insets.bottom, // Extend below safe area
      }}
    >
      <TouchableOpacity
        className="absolute inset-0 bg-black/50"
        activeOpacity={1}
        onPress={onClose}
      />
      <Animated.View
        className="absolute right-0 top-0 bottom-0 bg-background"
        style={{
          transform: [{ translateX }],
          width: DRAWER_WIDTH,
          paddingTop: insets.top, // Add padding for safe area
          paddingBottom: insets.bottom, // Add padding for safe area
        }}
      >
        <View className="flex-row justify-end p-4">
          <TouchableOpacity
            onPress={onClose}
            className="w-10 h-10 rounded-full bg-white/40 items-center justify-center"
          >
            <MaterialIcons name="close" size={24} color="#66CCCC" />
          </TouchableOpacity>
        </View>
        <View className="px-6 py-4">
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="py-4"
              onPress={() => handleMenuItemPress(item.route)}
            >
              <Text className="text-primary text-xl font-gimlet-regular">
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    </View>
  );
};

export default Drawer;
