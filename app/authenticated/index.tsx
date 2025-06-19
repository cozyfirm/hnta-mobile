import { useEffect } from 'react';

import { router } from 'expo-router';

const Screen = () => {
  useEffect(() => {
    router.replace('/authenticated/tabs');
  }, []);

  return null;
};

export default Screen;
