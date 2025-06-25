import { Stack } from 'expo-router';

import Layout from '@/components/Layout';
import ChatDetailScreen from '@/screens/ChatDetailScreen';

const Screen = () => {
  return (
    <Layout primaryBackground>
      <ChatDetailScreen />
    </Layout>
  );
};

export default Screen;
