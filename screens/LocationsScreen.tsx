import {
  ActivityIndicator,
  FlatList,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';

import Header from '@/components/Header';
import ProgramSwitcher from '@/components/ProgramSwitcher';
import { type Location, useLocations } from '@/services';

const LocationCard = ({ item }: { item: Location }) => {
  return (
    <View className="border border-primary rounded-xl p-5 mb-5">
      <Text className="text-secondary text-2xl font-gimlet-bold mb-2">
        {item?.title}
      </Text>
      <Text className="text-primary text-xl font-gimlet-medium mb-4">
        {item?.address}
      </Text>
      <View className="flex-row gap-2">
        <TouchableOpacity
          className="bg-primary rounded-xl py-2.5 px-10 justify-center items-center border border-primary"
          onPress={() => {
            router.push({
              pathname: '/authenticated/location',
              params: { id: item?.id },
            });
          }}
          activeOpacity={0.8}
        >
          <Text className="text-xl text-background font-gimlet-medium pt-1">
            Više
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row gap-2 bg-transparent rounded-xl py-2 px-10 justify-center items-center border border-primary"
          onPress={() => Linking.openURL(item?.location)}
          activeOpacity={0.8}
        >
          <Ionicons name="location-outline" size={24} color="#66CCCC" />
          <Text className="text-xl text-primary font-gimlet-medium pt-1">
            Lokacija
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const LoadingItem = () => (
  <View className="items-center justify-center py-8">
    <ActivityIndicator size="large" color="#66CCCC" />
    <Text className="text-primary text-lg font-gimlet-medium mt-2">
      Učitavanje lokacija...
    </Text>
  </View>
);

const ErrorItem = () => (
  <View className="items-center justify-center py-8">
    <Text className="text-red-500 text-lg font-gimlet-medium">
      Greška pri učitavanju lokacija.
    </Text>
  </View>
);

const EmptyItem = () => (
  <View className="items-center justify-center py-8">
    <Text className="text-primary text-lg font-gimlet-medium">
      Nema dostupnih lokacija.
    </Text>
  </View>
);

const LocationsScreen = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useLocations();

  // Flatten all pages data into a single array
  const locations = data?.pages?.flatMap((page) => page.locations.data) || [];

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderItem = ({ item }: { item: Location }) => (
    <LocationCard item={item} />
  );

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;

    return (
      <View className="items-center justify-center py-4">
        <ActivityIndicator size="small" color="#66CCCC" />
        <Text className="text-primary text-sm font-gimlet-medium mt-1">
          Učitavanje...
        </Text>
      </View>
    );
  };

  const renderHeader = () => {
    if (isLoading) return <LoadingItem />;
    if (isError) return <ErrorItem />;
    if (locations.length === 0) return <EmptyItem />;
    return null;
  };

  return (
    <View className="flex-1 bg-background">
      <Header showBackButton />
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        removeClippedSubviews={false}
      />
    </View>
  );
};

export default LocationsScreen;
