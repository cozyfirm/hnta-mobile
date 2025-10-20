import React, { useMemo, useState } from 'react';

import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGlobalSearchParams, useLocalSearchParams } from 'expo-router';

import Header from '@/components/Header';
import {
  ChatMessage,
  useChatMessages,
  useGetOrCreateChat,
  useSendMessage,
} from '@/services/chat';
import { useAuthStore } from '@/store';

const ChatDetailScreen = () => {
  const { user } = useAuthStore();
  const { id, userId, name, hash } = useGlobalSearchParams<{
    id?: string;
    userId?: string;
    name: string;
    hash?: string;
  }>();
  const [message, setMessage] = useState('');
  const queryClient = useQueryClient();

  // If we have userId, we need to get or create the chat first
  const getOrCreateChat = useGetOrCreateChat();

  // Determine the conversation ID to use
  const conversationId = useMemo(() => {
    if (id) return Number(id); // Direct conversation ID
    if (getOrCreateChat.data?.conversation_id)
      return getOrCreateChat.data.conversation_id; // From API
    return null;
  }, [
    id,
    getOrCreateChat.data,
    getOrCreateChat.status,
    getOrCreateChat.isSuccess,
  ]);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useChatMessages(conversationId || 0);

  // Get chat name from the first page of messages
  const chatName = useMemo(() => {
    // If we have a name from URL params, use it
    if (name) return name;

    // Try to get from the first page of messages
    if (data?.pages?.[0]?.conversation?.name)
      return data.pages[0].conversation.name;

    return null;
  }, [name, data]);

  // Call get-or-create API if we have userId but no direct conversation ID
  React.useEffect(() => {
    if (userId && !id && !getOrCreateChat.data) {
      getOrCreateChat.mutate(Number(userId));
    }
  }, [userId, id, getOrCreateChat.data]);

  const sendMessage = useSendMessage({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['chat', conversationId],
      });
      setMessage('');
    },
    onError: (error) => {
      queryClient.invalidateQueries({
        queryKey: ['chat', conversationId],
      });
      setMessage('');
    },
  });

  const messages = useMemo(() => {
    if (!data?.pages) return [];

    return data.pages.flatMap((page) => {
      // Handle both possible response structures
      if (page?.conversation?.data) {
        return page.conversation.data;
      }
      if (page?.messages?.data) {
        return page.messages.data;
      }
      return [];
    });
  }, [data]);

  const handleSendMessage = () => {
    if (message.trim().length > 0 && conversationId) {
      sendMessage.mutate({
        conversation_id: conversationId,
        message,
        hash: hash || getOrCreateChat.data?.hash || '',
      });
    }
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isMe = item?.sender_rel?.username === user?.username;

    return (
      <View
        className={`p-3 m-2 rounded-lg border max-w-[80%] ${
          !isMe ? 'bg-primary self-start' : 'border-primary self-end'
        }`}
      >
        <Text
          className={`font-gimlet-medium ${!isMe ? 'text-background' : 'text-secondary'}`}
        >
          {item.body}
        </Text>
      </View>
    );
  };

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <View className="flex-1">
          <Header showBackButton />

          {/* Sticky Chat Name */}
          {chatName && (
            <View className="bg-primary px-4 py-3 border-b border-primary/20">
              <Text className="font-gimlet-medium text-background text-lg text-center">
                {chatName}
              </Text>
            </View>
          )}

          {/* Show loading while getting or creating chat */}
          {userId &&
            !conversationId &&
            (getOrCreateChat.isPending || !getOrCreateChat.data) && (
              <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#66CCCC" />
                <Text className="text-primary text-lg font-gimlet-medium mt-2">
                  Učitavanje razgovora...
                </Text>
              </View>
            )}

          {/* Show error if get-or-create failed */}
          {userId && getOrCreateChat.isError && (
            <View className="flex-1 items-center justify-center">
              <Text className="text-red-500 text-lg font-gimlet-medium">
                Greška pri učitavanju razgovora.
              </Text>
            </View>
          )}

          {/* Always show FlatList */}
          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            contentContainerStyle={{ padding: 10 }}
            inverted={true}
            ListEmptyComponent={
              isLoading && !data ? (
                <View className="flex-1 items-center justify-center py-20">
                  <ActivityIndicator size="large" color="#66CCCC" />
                </View>
              ) : isError ? (
                <View className="flex-1 items-center justify-center py-20">
                  <Text className="text-red-500">
                    Greška prilikom učitavanja poruka.
                  </Text>
                </View>
              ) : (
                <View className="flex-1 items-center justify-center py-20">
                  <Text className="text-primary">Nema poruka</Text>
                </View>
              )
            }
            ListFooterComponent={
              isFetchingNextPage ? <ActivityIndicator color="#66CCCC" /> : null
            }
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={refetch} />
            }
          />
        </View>

        {/* Input field with proper Android navigation bar spacing */}
        <View
          className="flex-row items-center p-4"
          style={{
            paddingBottom: Platform.OS === 'android' ? 24 : 16,
          }}
        >
          <TextInput
            className="flex-1 border border-primary text-secondary font-gimlet-medium rounded-xl py-4 px-4"
            placeholder="Poruka..."
            placeholderTextColor="white"
            placeholderClassName="text-secondary"
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity
            className="ml-4 bg-primary p-3 rounded-full"
            onPress={handleSendMessage}
            disabled={sendMessage.isPending}
          >
            {sendMessage.isPending ? (
              <ActivityIndicator color="#66CCCC" />
            ) : (
              <Text className="font-gimlet-medium text-background">
                Pošalji
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatDetailScreen;
