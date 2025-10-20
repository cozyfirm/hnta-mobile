import React, { useState } from 'react';

import { Image, Text, TouchableOpacity, View } from 'react-native';

import { router } from 'expo-router';

import Drawer from './Drawer';
import { getBaseURL } from '@/helpers';
import BackArrowIcon from '@/icons/BackArrowIcon';
import BellIcon from '@/icons/BellIcon';
import ThreeDotsIcon from '@/icons/ThreeDotsIcon';
import { useAuthStore, useTabStore } from '@/store';

interface HeaderProps {
  showBackButton?: boolean;
}

const Header = ({ showBackButton = false }: HeaderProps) => {
  const { user } = useAuthStore();
  const { setCurrentTab } = useTabStore();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  return (
    <>
      <View className="bg-primary p-5 flex-row justify-between items-center">
        <TouchableOpacity
          activeOpacity={0.8}
          className="flex flex-row justify-center items-center gap-2 w-fit"
          onPress={() =>
            router.push({ pathname: '/authenticated/edit-profile' })
          }
        >
          <Image
            source={{
              uri: user?.photo?.hasPhoto
                ? getBaseURL() + user?.photo?.path + user?.photo?.photo_uri
                : 'https://ui-avatars.com/api/?name=' + user?.name,
            }}
            className="h-12 w-12 rounded-full"
          />
          <Text className="font-gimlet-regular text-background text-xl tracking-widest -mb-2">
            {user?.name}
          </Text>
        </TouchableOpacity>
        <View className="flex-row justify-center items-center gap-2">
          {showBackButton && (
            <TouchableOpacity
              activeOpacity={0.8}
              className="h-12 w-12 rounded-full bg-white/40 justify-center items-center"
              onPress={() =>
                router.canGoBack()
                  ? router.back()
                  : router.replace('/authenticated/tabs')
              }
            >
              <BackArrowIcon />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            activeOpacity={0.8}
            className="h-12 w-12 rounded-full bg-white/40 justify-center items-center"
            onPress={() => {
              setCurrentTab('messages');
              router.push('/authenticated/tabs/notifications');
            }}
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
      <Drawer
        isVisible={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
      />
    </>
  );
};

export default Header;
