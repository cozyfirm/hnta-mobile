import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { axios } from '@/helpers';
import { useAuthStore } from '@/store';

export interface BlogPost {
  id: number;
  title: string;
  short_desc: string;
  description: string;
  main_img?: string;
  img_one?: {
    name: string;
  };
  photo_path: string;
  created_at: string;
}

export interface BlogResponse {
  news: {
    data: BlogPost[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export const useBlogPosts = () => {
  const { user } = useAuthStore();

  return useInfiniteQuery({
    queryKey: ['blog'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.post('/api/public-part/blog', {
        api_token: user?.api_token,
        number: 10,
        page: pageParam,
      });

      return response?.data?.data as BlogResponse;
    },
    getNextPageParam: (lastPage) => {
      const { current_page, last_page } = lastPage.news;
      return current_page < last_page ? current_page + 1 : undefined;
    },
    initialPageParam: 1,
  });
};

export const useBlogPostPreview = (id: string) => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ['blog', id],
    queryFn: async () => {
      const response = await axios.post('/api/public-part/blog/preview', {
        api_token: user?.api_token,
        id,
      });

      return response?.data?.data?.post as BlogPost;
    },
  });
};
