import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { axios } from '@/helpers';
import { useAuthStore } from '@/store';

export interface Notification {
  id: number;
  title: string;
  body: string;
  sender: string;
  read_at: string | null;
  created_at: string;
  // I am adding this based on the preview API, assuming it might be there
  content?: string;
}

export interface NotificationsResponse {
  inbox: {
    data: Notification[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export const useNotifications = () => {
  const { user } = useAuthStore();

  return useInfiniteQuery({
    queryKey: ['notifications'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.post('/api/users/dashboard/inbox', {
        api_token: user?.api_token,
        page: pageParam,
      });

      return response?.data?.data as NotificationsResponse;
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage || !lastPage.inbox) {
        return undefined;
      }
      const { current_page, last_page } = lastPage.inbox;
      return current_page < last_page ? current_page + 1 : undefined;
    },
    initialPageParam: 1,
  });
};

export const useNotificationPreview = (id: string) => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ['notification', id],
    queryFn: async () => {
      const response = await axios.post('/api/users/dashboard/inbox/preview', {
        api_token: user?.api_token,
        id,
      });

      return response?.data?.data?.inbox as Notification;
    },
    enabled: !!id,
  });
};

export const useNotificationsInfo = () => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ['notifications-info'],
    queryFn: async () => {
      const response = await axios.post('/api/users/notifications-info', {
        api_token: user?.api_token,
      });

      return response?.data?.data;
    },
    enabled: !!user?.api_token,
  });
};
