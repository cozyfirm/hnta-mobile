import { router } from 'expo-router';
import { useMemo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from 'react-native';

import Header from '@/components/Header';
import NotificationCard from '@/components/NotificationCard';
import { Notification, useNotifications } from '@/services';

const NotificationsScreen = () => {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useNotifications();

  const notifications = useMemo(
    () => data?.pages.flatMap((page) => page.inbox.data) ?? [],
    [data]
  );

  const handleNotificationPress = (item: Notification) => {
    router.push({
      pathname: '/authenticated/notification-detail',
      params: { id: item.id },
    });
  };

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading && !data) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#66CCCC" />
        <Text className="text-primary text-lg font-gimlet-medium mt-2">
          Učitavanje notifikacija...
        </Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-red-500 text-lg font-gimlet-medium">
          Greška pri učitavanju notifikacija.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <Header />
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <NotificationCard
            item={item}
            onPress={() => handleNotificationPress(item)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ padding: 20 }}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator size="large" color="#66CCCC" />
          ) : null
        }
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        ListEmptyComponent={() => (
          <View className="items-center justify-center py-8">
            <Text className="text-primary text-lg font-gimlet-medium">
              Nemate novih notifikacija.
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default NotificationsScreen; 