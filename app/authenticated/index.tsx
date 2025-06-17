import { router } from 'expo-router';
import { useEffect } from 'react';

const Screen = () => {
  useEffect(() => {
    router.push('/authenticated/tabs');
  }, []);

  return null;
};

export default Screen;
