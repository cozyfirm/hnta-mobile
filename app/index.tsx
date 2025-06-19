import { useEffect } from 'react';

import { useRouter } from 'expo-router';

import { useAuthStore } from '@/store';

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
