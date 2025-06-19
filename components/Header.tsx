import React, { useState } from 'react';

import { Image, Text, TouchableOpacity, View } from 'react-native';

import { router } from 'expo-router';

import BackArrowIcon from '@/icons/BackArrowIcon';
import BellIcon from '@/icons/BellIcon';
import ThreeDotsIcon from '@/icons/ThreeDotsIcon';
import { useAuthStore } from '@/store';
import Drawer from './Drawer';

interface HeaderProps {
  showBackButton?: boolean;
}

const Header = ({ showBackButton = false }: HeaderProps) => {
  const { user } = useAuthStore();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  return (
    <>
      <View className="bg-primary p-5 flex-row justify-between items-center">
        <View className="flex flex-row justify-center items-center gap-2 w-fit">
          <Image
            source={{
              uri: user?.photo?.hasPhoto
                ? 'https://staging.talentakademija.ba' +
                  user?.photo?.path +
                  user?.photo?.photo_uri
                : 'https://ui-avatars.com/api/?name=' + user?.name,
            }}
            className="h-12 w-12 rounded-full"
          />
          <Text className="font-gimlet-regular text-background text-xl tracking-widest -mb-2">
            {user?.name}
          </Text>
        </View>
        <View className="flex-row justify-center items-center gap-2">
          {showBackButton && (
            <TouchableOpacity
              activeOpacity={0.8}
              className="h-12 w-12 rounded-full bg-white/40 justify-center items-center"
              onPress={() => router.back()}
            >
              <BackArrowIcon />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            activeOpacity={0.8}
            className="h-12 w-12 rounded-full bg-white/40 justify-center items-center"
          >
            <BellIcon />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            className="h-12 w-12 rounded-full bg-white/40 justify-center items-center"
            onPress={() => setIsDrawerVisible(true)}
          >
            <ThreeDotsIcon />
          </TouchableOpacity>
        </View>
      </View>
      <Drawer isVisible={isDrawerVisible} onClose={() => setIsDrawerVisible(false)} />
    </>
  );
};

export default Header;
