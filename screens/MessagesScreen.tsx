import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from 'react-native';

import { router } from 'expo-router';

import Header from '@/components/Header';
import MessageCard from '@/components/MessageCard';
import { Chat, useChats } from '@/services';

const MessagesScreen = () => {
  const { data, isLoading, isError, refetch } = useChats();

  const handleMessagePress = (item: Chat) => {
    router.push({
      pathname: '/authenticated/chat-detail',
      params: { id: item.id, name: item.name },
    });
  };

  if (isLoading && !data) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#66CCCC" />
        <Text className="text-primary text-lg font-gimlet-medium mt-2">
          Učitavanje poruka...
        </Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-red-500 text-lg font-gimlet-medium">
          Greška pri učitavanju poruka.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <Header />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <MessageCard
            item={item}
            onPress={() => handleMessagePress(item)}
            messages={true}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 20 }}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        ListEmptyComponent={() => (
          <View className="items-center justify-center py-8">
            <Text className="text-primary text-lg font-gimlet-medium">
              Nemate novih poruka.
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default MessagesScreen;
