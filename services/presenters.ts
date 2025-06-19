import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { axios } from '@/helpers';
import { useAuthStore } from '@/store';

interface Country {
  id: number;
  code: string;
  name_ba: string;
  flag: string;
}

export interface Presenter {
  id: number;
  title: string;
  address: string;
  city: string;
  country: number;
  country_rel: Country;
  description: string;
  location: string;
  main_img?: string;
  cover_img?: string;
  map_img?: string;
  photo_path: string;
  public: number;
  name: string;
  short_description: string;
  presenter_role?: string;
  institution?: string;
}

export interface PresentersResponse {
  presenters: {
    data: Presenter[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export const usePresenters = (programId: number) => {
  const { user } = useAuthStore();

  return useInfiniteQuery({
    queryKey: ['presenters', programId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.post('/api/public-part/presenters', {
        api_token: user?.api_token,
        program_id: programId,
        number: 10,
        page: pageParam,
      });

      return response?.data?.data as PresentersResponse;
    },
    getNextPageParam: (lastPage) => {
      const { current_page, last_page } = lastPage.presenters;
      return current_page < last_page ? current_page + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!programId,
  });
};

export const usePresenterPreview = (id: string) => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ['presenter', id],
    queryFn: async () => {
      const response = await axios.post('/api/public-part/presenters/preview', {
        api_token: user?.api_token,
        id,
      });

      return response?.data?.data?.presenter as Presenter;
    },
  });
}; 