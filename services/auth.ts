import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { Toast } from 'toastify-react-native';

import { axios } from '@/helpers';
import { useAuthStore } from '@/store';

interface LoginRequest {
  email: string;
  password: string;
}

export const useLogin = () => {
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: async ({ email, password }: LoginRequest) => {
      const response = await axios.post('/api/auth', {
        email,
        password,
      });
      return response?.data;
    },
    onSuccess: async (data) => {
      if (data.code === '0000') {
        setUser(data?.data);
        Toast.success('Prijava uspješna');
        router.replace('/authenticated');
      } else {
        Toast.error(data.message);
      }
    },
    onError: async (error) => {
      console.error(error);
    },
  });
};

export const useLogout = () => {
  const { setUser } = useAuthStore();
  return {
    logout: () => {
      setUser(null);
      Toast.success('Uspješno ste se odjavili');
      router.replace('/');
    },
  };
};
