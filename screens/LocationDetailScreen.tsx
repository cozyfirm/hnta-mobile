import React from 'react';
import { Text, View } from 'react-native';

import { useLocalSearchParams } from 'expo-router';

import Header from '@/components/Header';

const LocationDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View className="flex-1 bg-background">
      <Header showBackButton />
      <View className="flex-1 p-5">
        <Text className="text-secondary text-2xl font-gimlet-bold mb-4">
          Detalji lokacije
        </Text>
        <Text className="text-primary text-lg font-gimlet-medium">
          ID lokacije: {id}
        </Text>
        <Text className="text-primary text-lg font-gimlet-medium mt-4">
          Ova stranica će prikazati detaljne informacije o lokaciji.
        </Text>
      </View>
    </View>
  );
};

export default LocationDetailScreen; 