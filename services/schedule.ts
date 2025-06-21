import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

import { axios } from '@/helpers';
import { useAuthStore } from '@/store';
import { ScheduleResponse, SessionDetailResponse } from '@/types/schedule';

export const useSchedule = (date: Date, programId: string) => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ['schedule', format(date, 'dd.MM.yyyy'), programId],
    queryFn: async () => {
      const response = await axios.post('/api/schedule/fetch', {
        api_token: user?.api_token,
        program_id: programId,
        date: date,
      });

      return response?.data as ScheduleResponse;
    },
  });
};

export const useSessionDetail = (sessionId: string) => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ['session', sessionId],
    queryFn: async () => {
      const response = await axios.post('/api/schedule/sessions/fetch', {
        api_token: user?.api_token,
        session_id: sessionId,
      });

      return response?.data as SessionDetailResponse;
    },
    enabled: !!sessionId,
  });
};
