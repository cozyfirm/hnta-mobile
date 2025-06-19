import React from 'react';

import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';

import { useLocalSearchParams } from 'expo-router';

import Header from '@/components/Header';
import { usePresenterPreview } from '@/services';

const PresenterDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: presenter, isLoading } = usePresenterPreview(id);

  if (isLoading) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#333366" />
      </View>
    );
  }

  if (!presenter) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <Text className="text-primary text-lg font-gimlet-medium">
          Predavač nije pronađen
        </Text>
      </View>
    );
  }

  // Remove HTML tags from description
  const plainDescription = presenter?.description?.replace(/<[^>]+>/g, '');

  // Debug logging
  const imageUrl = presenter?.photo_path
    ? `https://staging.talentakademija.ba/${presenter.photo_path}`
    : undefined;

  return (
    <View className="flex-1 bg-background">
      <Header showBackButton />
      <ScrollView className="flex-1">
        {imageUrl && (
          <View className="w-full h-68 bg-gray-200 justify-center items-center">
            <Image
              source={{
                uri: imageUrl,
              }}
              className="w-full h-[300px]"
              resizeMode="cover"
            />
          </View>
        )}
        <View className="p-5">
          <Text className="text-secondary text-2xl font-gimlet-bold mb-2">
            {presenter?.name}
          </Text>
          {plainDescription && (
            <Text className="text-primary text-base font-gimlet-regular">
              {plainDescription}
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default PresenterDetailScreen;
