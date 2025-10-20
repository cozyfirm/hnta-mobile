import React from 'react';

import {
  ActivityIndicator,
  Image,
  Linking,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useWindowDimensions } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

import Header from '@/components/Header';
import { getBaseURL } from '@/helpers';
import { useLocationPreview } from '@/services';

const LocationDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: location, isLoading } = useLocationPreview(id);

  if (isLoading) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#333366" />
      </View>
    );
  }

  if (!location) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <Text className="text-primary text-lg font-gimlet-medium">
          Lokacija nije pronađena
        </Text>
      </View>
    );
  }

  const imageUrl = location?.main_img
    ? `${getBaseURL()}${location?.photo_path}${location?.main_img}`
    : null;

  const mapImageUrl = location?.map_img
    ? `${getBaseURL()}${location?.photo_path}${location?.map_img}`
    : null;

  // Remove HTML tags from description
  const plainDescription = location?.description?.replace(/<[^>]+>/g, '');

  return (
    <View
      className="flex-1 bg-background"
      style={{
        paddingBottom: Platform.OS === 'android' ? 20 : 0,
      }}
    >
      <Header showBackButton />
      <ScrollView className="flex-1 pb-10">
        {imageUrl && (
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-64"
            resizeMode="cover"
          />
        )}
        <View className="p-5">
          <View className="border border-primary rounded-xl p-5 mb-5">
            <Text className="text-secondary text-2xl font-gimlet-bold mb-2">
              {location?.title}
            </Text>
            <Text className="text-primary text-xl font-gimlet-medium mb-4">
              {location?.address}
            </Text>
            <View className="flex-row gap-2">
              <TouchableOpacity
                className="w-full flex-row gap-2 bg-transparent rounded-xl py-2 px-10 justify-center items-center border border-primary"
                onPress={() => Linking.openURL(location?.location)}
                activeOpacity={0.8}
              >
                <Ionicons name="location-outline" size={24} color="#66CCCC" />
                <Text className="text-xl text-primary font-gimlet-medium pt-1">
                  Lokacija
                </Text>
              </TouchableOpacity>
            </View>
            {mapImageUrl && (
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(location?.location);
                }}
                activeOpacity={0.8}
              >
                <Image
                  source={{
                    uri: mapImageUrl,
                  }}
                  className="w-full h-64 mt-4 rounded-xl"
                  resizeMode="cover"
                />
              </TouchableOpacity>
            )}
          </View>
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

export default LocationDetailScreen;
