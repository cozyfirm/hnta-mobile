import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

import { axios } from '@/helpers';
import { useAuthStore } from '@/store';

export interface Chat {
  id: number;
  name: string;
  avatar: string;
  last_message: string;
  last_message_at: string;
}

export interface ChatMessage {
  id: number;
  body: string;
  created_at: string;
  sender_id: number;
  conversation_id: number;
  read: number;
  sender_rel: {
    id: number;
    name: string;
    photo_path: string;
    photo_uri: string | null;
    username: string;
  };
}

export interface ChatsResponse {
  conversations: Chat[];
}

export interface ChatMessagesResponse {
  conversation?: {
    data: ChatMessage[];
    current_page: number;
    last_page: number;
  };
  messages?: {
    data: ChatMessage[];
    current_page: number;
    last_page: number;
    total: number;
  };
}

export const useChats = () => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ['chats'],
    queryFn: async () => {
      try {
        const response = await axios.post<{ data: ChatsResponse }>(
          '/api/users/dashboard/chat',
          {
            api_token: user?.api_token,
          }
        );

        // Ensure we always return an array, even if the response structure is unexpected
        return response.data?.data?.chats?.data || [];
      } catch (error) {
        console.error('Error fetching chats:', error);
        // Return empty array as fallback to prevent undefined
        return [];
      }
    },
    enabled: !!user?.api_token,
  });
};

export const useChatMessages = (conversation_id: number) => {
  const { user } = useAuthStore();

  return useInfiniteQuery({
    queryKey: ['chat', conversation_id],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const response = await axios.post<{ data: ChatMessagesResponse }>(
          '/api/users/dashboard/chat/preview',
          {
            api_token: user?.api_token,
            conversation_id,
            page: pageParam,
            number: 20, // Or whatever number you want per page
          }
        );

        // Ensure we always return a valid object structure
        return (
          response.data?.data || {
            conversation: {
              data: [],
              current_page: 1,
              last_page: 1,
            },
          }
        );
      } catch (error) {
        console.error('Error fetching chat messages:', error);
        // Return fallback structure to prevent undefined
        return {
          conversation: {
            data: [],
            current_page: 1,
            last_page: 1,
          },
        };
      }
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage) {
        return undefined;
      }

      // Handle conversation structure
      if (lastPage.conversation) {
        const { current_page, last_page } = lastPage.conversation;
        return current_page < last_page ? current_page + 1 : undefined;
      }

      // Handle messages structure
      if (lastPage.messages) {
        const { current_page, last_page } = lastPage.messages;
        return current_page < last_page ? current_page + 1 : undefined;
      }

      return undefined;
    },
    initialPageParam: 1,
    enabled: !!user?.api_token && !!conversation_id,
  });
};

export const useSendMessage = (callbacks?: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}) => {
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: async (variables: {
      conversation_id: number;
      hash: string;
      message: string;
    }) => {
      const response = await axios.post(
        '/api/users/dashboard/chat/send-message',
        {
          api_token: user?.api_token,
          ...variables,
        }
      );
      return response.data;
    },
    onSuccess: callbacks?.onSuccess,
    onError: callbacks?.onError,
  });
};

export interface GetOrCreateChatResponse {
  chat: {
    conversation_id: number;
    description: string;
    hash: string;
    img_path: string;
    name: string;
  };
  messages: {
    current_page: number;
    data: any[];
    last_page: number;
    total: number;
  };
}

export const useGetOrCreateChat = () => {
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: async (userId: number) => {
      try {
        const response = await axios.post<{ data: GetOrCreateChatResponse }>(
          '/api/users/dashboard/chat/get-or-create',
          {
            api_token: user?.api_token,
            other_user_id: userId,
          }
        );

        // The API returns the data nested under data.data
        const result = response.data.data;

        if (!result?.chat?.conversation_id) {
          console.error('No conversation_id found in response:', result);
          throw new Error('No conversation_id in response');
        }

        // Return the format expected by the rest of the app
        return {
          conversation_id: result.chat.conversation_id,
          hash: result.chat.hash,
        };
      } catch (error) {
        console.error('Error in get-or-create chat:', error);
        throw error;
      }
    },
  });
};
