import React from 'react';

import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { router, useLocalSearchParams } from 'expo-router';

import Header from '@/components/Header';
import { getBaseURL } from '@/helpers';
import { useAttendeePreview } from '@/services';

const AttendeeDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: attendee, isLoading } = useAttendeePreview(id);

  if (isLoading) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#333366" />
      </View>
    );
  }

  if (!attendee) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <Text className="text-primary text-lg font-gimlet-medium">
          Učesnik nije pronađen
        </Text>
      </View>
    );
  }

  const imageUrl = attendee?.photo_path
    ? `${getBaseURL()}${attendee.photo_path}`
    : undefined;

  const experience = attendee?.application_rel?.[0]?.experience || '';
  const motivation = attendee?.application_rel?.[0]?.motivation || '';
  const aboutText = `${experience}\n\n${motivation}`;

  return (
    <View className="flex-1">
      <Header showBackButton />
      <ScrollView className="flex-1">
        <View className="items-center">
          <Image
            source={{
              uri: imageUrl,
            }}
            className="w-full h-[200px]"
            resizeMode="contain"
          />
          <Text className="text-background text-2xl font-gimlet-bold mt-4">
            {attendee?.name}
          </Text>
          <Text className="text-background text-lg font-gimlet-regular mt-2">
            Bosna i Hercegovina
          </Text>
          <Text className="text-background text-lg font-gimlet-regular mt-1">
            Sarajevo
          </Text>

          <TouchableOpacity
            className="bg-tertiary px-8 py-3 rounded-lg mt-4 flex-row items-center"
            activeOpacity={0.8}
            onPress={() => {
              router.push({
                pathname: '/authenticated/chat-detail',
                params: { userId: attendee?.id, name: attendee?.name },
              });
            }}
          >
            <Text className="text-background text-base font-gimlet-medium">
              Pošalji poruku
            </Text>
          </TouchableOpacity>
        </View>

        <View className="p-5 mt-4">
          <Text className="text-background text-xl font-gimlet-bold mb-3">
            O meni
          </Text>
          <Text className="text-background text-base font-gimlet-regular">
            {aboutText}
          </Text>
        </View>

        <View className="bg-[#333366] p-5 mt-4 rounded-t-3xl">
          <Text className="text-white text-lg font-gimlet-bold mb-3">
            Društvene mreže
          </Text>
          <TouchableOpacity className="mb-3">
            <Text className="text-white text-base font-gimlet-regular">
              Instagram
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="mb-3">
            <Text className="text-white text-base font-gimlet-regular">
              Facebook
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="mb-3">
            <Text className="text-white text-base font-gimlet-regular">
              Twitter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="mb-3">
            <Text className="text-white text-base font-gimlet-regular">
              LinkedIn
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="mb-10">
            <Text className="text-white text-base font-gimlet-regular">
              Web
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AttendeeDetailScreen;
