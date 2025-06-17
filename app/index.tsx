import { useAuthStore } from '@/store';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

const Screen = () => {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace('/authenticated/tabs');
    } else {
      router.replace('/guest');
    }
  }, [user, router]);

  return null;
};

export default Screen;
