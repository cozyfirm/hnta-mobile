import React from 'react';

import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { useGlobalSearchParams } from 'expo-router';
import { decode } from 'html-entities';

import Header from '@/components/Header';
import { getBaseURL } from '@/helpers';
import { usePages } from '@/services';
import { PageData } from '@/types';

const DynamicScreen = () => {
  const { slug } = useGlobalSearchParams();
  const { data, isLoading, isError, refetch, isRefetching } = usePages(
    slug as string
  );

  const handleRefresh = () => {
    refetch();
  };

  // Extract page data - try different possible structures
  const pageData: PageData = data?.data || data?.page || data || {};
  const title = pageData?.title || pageData?.name || 'Stranica';
  const description = pageData?.description || pageData?.content || '';
  const imagePath = pageData?.photo_path || pageData?.image_path;
  const imageName =
    pageData?.img_one?.name || pageData?.main_img || pageData?.image;

  // Build image URL if image data exists
  const imageUrl =
    imagePath && imageName ? `${getBaseURL()}${imagePath}${imageName}` : null;

  // Clean description by removing HTML tags and decoding entities
  const cleanDescription = decode(description?.replace(/<[^>]+>/g, '') || '');

  const renderContent = () => {
    if (isLoading && !data) {
      return (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#333366" />
          <Text className="text-primary text-lg font-gimlet-medium mt-2">
            Učitavanje stranice...
          </Text>
        </View>
      );
    }

    if (isError && !data) {
      return (
        <View className="flex-1 items-center justify-center px-4">
          <Text className="text-red-500 text-lg font-gimlet-medium text-center mb-4">
            Greška pri učitavanju stranice.
          </Text>
          <Text className="text-primary text-base font-gimlet-regular text-center">
            Provjerite svoju internet vezu i pokušajte ponovo.
          </Text>
        </View>
      );
    }

    return (
      <ScrollView
        className="flex-1 pb-10"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={handleRefresh}
            colors={['#333366']}
            tintColor="#333366"
          />
        }
      >
        {imageUrl && (
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-64"
            resizeMode="cover"
          />
        )}
        <View className="p-5">
          <Text className="text-secondary text-2xl font-gimlet-bold mb-4">
            {decode(title)}
          </Text>
          {cleanDescription && (
            <Text className="text-primary text-base font-gimlet-regular leading-6">
              {cleanDescription}
            </Text>
          )}
          {!cleanDescription && (
            <Text className="text-gray-500 text-base font-gimlet-regular italic">
              Nema sadržaja za prikaz.
            </Text>
          )}
        </View>
      </ScrollView>
    );
  };

  return (
    <View className="flex-1 bg-background">
      <Header showBackButton />
      {renderContent()}
    </View>
  );
};

export default DynamicScreen;
