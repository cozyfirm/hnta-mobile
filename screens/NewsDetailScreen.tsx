import React from 'react';

import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';

import { useLocalSearchParams } from 'expo-router';
import { decode } from 'html-entities';

import Header from '@/components/Header';
import { useBlogPostPreview } from '@/services';

const NewsDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: post, isLoading } = useBlogPostPreview(id);

  if (isLoading) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#333366" />
      </View>
    );
  }

  if (!post) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <Text className="text-primary text-lg font-gimlet-medium">
          Vijest nije pronađena
        </Text>
      </View>
    );
  }

  const imageUrl = post?.img_one?.name
    ? `https://staging.talentakademija.ba/${post?.photo_path}${post?.img_one?.name}`
    : null;

  // Remove HTML tags and decode entities from description
  const cleanDescription = decode(
    post?.description?.replace(/<[^>]+>/g, '') || ''
  );

  return (
    <View className="flex-1 bg-background">
      <Header showBackButton />
      <ScrollView className="flex-1">
        {imageUrl && (
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-64"
            resizeMode="cover"
          />
        )}
        <View className="p-5">
          <Text className="text-secondary text-2xl font-gimlet-bold mb-2">
            {decode(post?.title || '')}
          </Text>
          {cleanDescription && (
            <Text className="text-primary text-base font-gimlet-regular">
              {cleanDescription}
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default NewsDetailScreen;
