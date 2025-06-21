import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

import { useLocalSearchParams } from 'expo-router';

import Header from '@/components/Header';
import NotificationCard from '@/components/NotificationCard';
import { useNotificationPreview } from '@/services';

const NotificationDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: notification, isLoading, isError } = useNotificationPreview(id);

  console.log(notification);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#66CCCC" />
        <Text className="text-primary text-lg font-gimlet-medium mt-2">
          Učitavanje...
        </Text>
      </View>
    );
  }

  if (isError || !notification) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-red-500 text-lg font-gimlet-medium">
          Greška pri učitavanju notifikacije.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <Header showBackButton />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <NotificationCard item={notification} onPress={() => {}} />
        <View className="mt-4">
          <Text className="text-white font-gimlet-regular text-base">
            {notification?.message_rel?.content}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default NotificationDetailScreen;
