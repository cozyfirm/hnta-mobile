import React from 'react';

import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

import { useLocalSearchParams } from 'expo-router';

import Header from '@/components/Header';
import ScheduleCard from '@/components/ScheduleCard';
import { useSessionDetail } from '@/services/schedule';

// Helper function to strip HTML tags
const stripHtmlTags = (html: string): string => {
  return html.replace(/<[^>]*>/g, '');
};

const SessionDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, isError } = useSessionDetail(id);

  if (isLoading) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#333366" />
      </View>
    );
  }

  if (isError || !data?.data?.session) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <Text className="text-primary text-lg font-gimlet-medium">
          Sesija nije pronađena
        </Text>
      </View>
    );
  }

  const session = data.data.session;

  console.log(session);

  return (
    <View className="flex-1 bg-background">
      <Header showBackButton />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <ScheduleCard item={session} />

        {session.description && (
          <View className="mt-6">
            <Text className="text-primary text-lg font-gimlet-bold mb-3">
              Opis
            </Text>
            <Text className="text-primary text-base font-gimlet-regular leading-6">
              {stripHtmlTags(session.description)}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default SessionDetailScreen;
