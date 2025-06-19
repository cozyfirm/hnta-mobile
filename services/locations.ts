import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { axios } from '@/helpers';
import { useAuthStore } from '@/store';

interface Country {
  id: number;
  code: string;
  name_ba: string;
  flag: string;
}

export interface Location {
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

export const useLocationPreview = (id: string) => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ['location', id],
    queryFn: async () => {
      const response = await axios.post('/api/public-part/locations/preview', {
        api_token: user?.api_token,
        id,
      });

      return response?.data?.data as Location;
    },
  });
};
