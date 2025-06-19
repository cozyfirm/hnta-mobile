import { useInfiniteQuery } from '@tanstack/react-query';

import { axios } from '@/helpers';
import { useAuthStore } from '@/store';

export interface Location {
  id: number;
  title: string;
  address: string;
  location: string;
}

export interface LocationsResponse {
  locations: {
    data: Location[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export const useLocations = () => {
  const { user } = useAuthStore();

  return useInfiniteQuery({
    queryKey: ['locations'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.post('/api/public-part/locations', {
        api_token: user?.api_token,
        number: 10,
        page: pageParam,
      });

      return response?.data?.data as LocationsResponse;
    },
    getNextPageParam: (lastPage) => {
      const { current_page, last_page } = lastPage.locations;
      return current_page < last_page ? current_page + 1 : undefined;
    },
    initialPageParam: 1,
  });
};
