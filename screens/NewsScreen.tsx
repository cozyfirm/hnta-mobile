import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { router } from 'expo-router';
import { decode } from 'html-entities';

import Header from '@/components/Header';
import { type BlogPost, useBlogPosts } from '@/services';

const NewsCard = ({ item }: { item: BlogPost }) => {
  const imageUrl = item?.main_img
    ? `https://staging.talentakademija.ba/${item?.photo_path}${item?.img_one?.name}`
    : null;

  return (
    <TouchableOpacity
      className="border border-primary rounded-3xl overflow-hidden mb-5"
      onPress={() => {
        router.push({
          pathname: '/authenticated/news-detail' as const,
          params: { id: item?.id },
        });
      }}
      activeOpacity={0.8}
    >
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          className="w-full h-48"
          resizeMode="cover"
        />
      )}
      <View className="p-5">
        <Text className="text-secondary text-2xl font-gimlet-bold mb-2">
          {decode(item?.title || '')}
        </Text>
        <Text className="text-primary text-base font-gimlet-regular">
          {decode(item?.short_desc || '')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const LoadingItem = () => (
  <View className="items-center justify-center py-8">
    <ActivityIndicator size="large" color="#66CCCC" />
    <Text className="text-primary text-lg font-gimlet-medium mt-2">
      Učitavanje vijesti...
    </Text>
  </View>
);

const ErrorItem = () => (
  <View className="items-center justify-center py-8">
    <Text className="text-red-500 text-lg font-gimlet-medium">
      Greška pri učitavanju vijesti.
    </Text>
  </View>
);

const EmptyItem = () => (
  <View className="items-center justify-center py-8">
    <Text className="text-primary text-lg font-gimlet-medium">
      Nema dostupnih vijesti.
    </Text>
  </View>
);

const NewsScreen = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useBlogPosts();

  // Flatten all pages data into a single array
  const news = data?.pages?.flatMap((page) => page.news.data) || [];

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderItem = ({ item }: { item: BlogPost }) => <NewsCard item={item} />;

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
    if (news.length === 0) return <EmptyItem />;
    return null;
  };

  return (
    <View className="flex-1 bg-background">
      <Header showBackButton />

      <FlatList
        data={news}
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

export default NewsScreen;
