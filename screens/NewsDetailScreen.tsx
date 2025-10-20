import React from 'react';

import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';

import { useLocalSearchParams } from 'expo-router';
import { decode } from 'html-entities';
import { WebView } from 'react-native-webview';

import Header from '@/components/Header';
import { getBaseURL } from '@/helpers';
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
    ? `${getBaseURL()}${post?.photo_path}${post?.img_one?.name}`
    : null;

  // Remove HTML tags and decode entities from description
  const cleanDescription = decode(
    post?.description?.replace(/<[^>]+>/g, '') || ''
  );

  // Extract video URL if available
  const videoUrl = post?.video;

  return (
    <View className="flex-1 bg-background pb-10">
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
          <Text className="text-secondary text-2xl font-gimlet-bold mb-2">
            {decode(post?.title || '')}
          </Text>
          {cleanDescription && (
            <Text className="text-primary text-base font-gimlet-regular mb-4">
              {cleanDescription}
            </Text>
          )}
          {videoUrl && (
            <View className="w-full h-56 mb-4">
              <WebView
                source={{ uri: videoUrl }}
                style={{ flex: 1 }}
                allowsFullscreenVideo={true}
                mediaPlaybackRequiresUserAction={false}
                javaScriptEnabled={true}
                domStorageEnabled={true}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default NewsDetailScreen;
