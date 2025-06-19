import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';

import Header from '@/components/Header';
import ProgramSwitcher from '@/components/ProgramSwitcher';
import { type Presenter, usePresenters } from '@/services';
import { useProgramStore } from '@/store';

const PresenterCard = ({ item }: { item: Presenter }) => {
  return (
    <TouchableOpacity
      className="border border-primary rounded-xl mb-5 overflow-hidden"
      activeOpacity={0.8}
      onPress={() => {
        router.push({
          pathname: '/authenticated/presenter',
          params: { id: item?.id },
        });
      }}
    >
      {item?.photo_path && (
        <Image
          source={{
            uri: 'https://staging.talentakademija.ba/' + item.photo_path,
          }}
          className="w-full h-48"
          resizeMode="cover"
        />
      )}
      <View className="p-5">
        <View className="flex-row items-center gap-4 mb-4">
          <View className="flex-1">
            <Text className="text-secondary text-3xl font-gimlet-bold">
              {item?.name}
            </Text>
            <Text className="text-primary text-xl font-gimlet-medium mt-1">
              {item?.title}
            </Text>
          </View>
          <TouchableOpacity className="bg-primary rounded-xl w-14 h-14 justify-center items-center">
            <Ionicons name="chatbubble-outline" size={28} color="#2D2B54" />
          </TouchableOpacity>
        </View>
        <Text
          className="text-primary text-lg font-gimlet-regular leading-6"
          numberOfLines={3}
        >
          {item?.short_description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const LoadingItem = () => (
  <View className="items-center justify-center py-8">
    <ActivityIndicator size="large" color="#66CCCC" />
    <Text className="text-primary text-lg font-gimlet-medium mt-2">
      Učitavanje predavača...
    </Text>
  </View>
);

const ErrorItem = () => (
  <View className="items-center justify-center py-8">
    <Text className="text-red-500 text-lg font-gimlet-medium">
      Greška pri učitavanju predavača.
    </Text>
  </View>
);

const EmptyItem = () => (
  <View className="items-center justify-center py-8">
    <Text className="text-primary text-lg font-gimlet-medium">
      Nema dostupnih predavača.
    </Text>
  </View>
);

const PresentersScreen = () => {
  const { selectedProgram } = useProgramStore();
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePresenters(selectedProgram.id);

  // Flatten all pages data into a single array
  const presenters = data?.pages?.flatMap((page) => page.presenters.data) || [];

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderItem = ({ item }: { item: Presenter }) => (
    <PresenterCard item={item} />
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
    if (presenters.length === 0) return <EmptyItem />;
    return null;
  };

  return (
    <View className="flex-1 bg-background">
      <Header showBackButton />
      <ProgramSwitcher />
      <FlatList
        data={presenters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20 }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        removeClippedSubviews={false}
      />
    </View>
  );
};

export default PresentersScreen;
