import { View } from 'react-native';

import Header from '@/components/Header';
import Layout from '@/components/Layout';

const Screen = () => {
  return (
    <Layout>
      <Header showBackButton />
      <View className="flex-1 bg-background p-5"></View>
    </Layout>
  );
};

export default Screen;
