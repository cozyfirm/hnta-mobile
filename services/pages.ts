import { useQuery } from '@tanstack/react-query';

import { axios } from '@/helpers';
import { useAuthStore } from '@/store';
import { PageResponse } from '@/types/pages';

export const usePages = (slug: string) => {
  const { user } = useAuthStore();

  return useQuery({
    queryFn: async () => {
      try {
        // Try the public-part endpoint first
        const response = await axios.post('/api/public-part/pages/' + slug, {
          api_token: user?.api_token,
        });

        // Try different response structures
        const result = response?.data?.data || response?.data || response;

        return result as PageResponse;
      } catch (error) {
        // If public-part fails, try common-routes
        try {
          const response = await axios.post(
            '/api/common-routes/pages/' + slug,
            {
              api_token: user?.api_token,
            }
          );

          const result = response?.data?.data || response?.data || response;

          return result as PageResponse;
        } catch (secondError) {
          throw secondError;
        }
      }
    },
    queryKey: ['dynamic-page', slug],
    enabled: !!slug && !!user?.api_token,
  });
};
