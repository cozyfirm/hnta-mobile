import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { axios } from '@/helpers';
import { useAuthStore } from '@/store';

interface Country {
  id: number;
  code: string;
  name_ba: string;
  flag: string;
}

export interface Attendee {
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
  attendee_role?: string;
  institution?: string;
  application_rel?: Array<{
    experience?: string;
    motivation?: string;
    id: number;
    attendee_id: number;
    program_id: number;
    status: string;
  }>;
}

export interface AttendeesResponse {
  attendees: {
    data: Attendee[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export const useAttendees = (programId: number) => {
  const { user } = useAuthStore();

  return useInfiniteQuery({
    queryKey: ['attendees', programId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.post('/api/public-part/attendees', {
        api_token: user?.api_token,
        program_id: programId,
        number: 10,
        page: pageParam,
      });

      return response?.data?.data as AttendeesResponse;
    },
    getNextPageParam: (lastPage) => {
      const { current_page, last_page } = lastPage.attendees;
      return current_page < last_page ? current_page + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!programId,
  });
};

export const useAttendeePreview = (id: string) => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ['attendee', id],
    queryFn: async () => {
      const response = await axios.post('/api/public-part/attendees/preview', {
        api_token: user?.api_token,
        id,
      });

      return response?.data?.data?.attendee as Attendee;
    },
  });
}; 