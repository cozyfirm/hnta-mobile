import React, { useState } from 'react';

import { ActivityIndicator, FlatList, Text, View } from 'react-native';

import { router } from 'expo-router';

import { DateWheelPicker } from '@/components/DateWheelPicker';
import Header from '@/components/Header';
import ProgramSwitcher from '@/components/ProgramSwitcher';
import ScheduleCard from '@/components/ScheduleCard';
import { useSchedule } from '@/services/schedule';
import { useProgramStore } from '@/store';

const LoadingItem = () => (
  <View className="items-center justify-center py-8">
    <ActivityIndicator size="large" color="#66CCCC" />
    <Text className="text-primary text-lg font-gimlet-medium mt-2">
      Učitavanje rasporeda...
    </Text>
  </View>
);

const ErrorItem = () => (
  <View className="items-center justify-center py-8">
    <Text className="text-red-500 text-lg font-gimlet-medium">
      Greška pri učitavanju rasporeda.
    </Text>
  </View>
);

const EmptyItem = () => (
  <View className="items-center justify-center py-8">
    <Text className="text-primary text-lg font-gimlet-medium">
      Nema dostupnih događaja za ovaj dan.
    </Text>
  </View>
);

const ScheduleListScreen = () => {
  const fixedStartDate = new Date(2025, 7, 2, 10); // August 2, 2025 (month is 0-indexed)
  const fixedEndDate = new Date(2025, 7, 7, 10); // August 7, 2025

  // Determine the default selected date
  const getDefaultDate = () => {
    const today = new Date();
    const todayString = today.toDateString();

    // Check if today falls within the date range
    if (today >= fixedStartDate && today <= fixedEndDate) {
      return today;
    }

    // If not, default to August 2, 2025
    return fixedStartDate;
  };

  const [selectedDate, setSelectedDate] = useState(getDefaultDate());
  const { selectedProgram } = useProgramStore();

  const { data, isLoading, isError } = useSchedule(
    selectedDate,
    selectedProgram.id.toString()
  );
  const scheduleItems = data?.data?.sessions || [];

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleScheduleCardPress = (item: any) => {
    router.push({
      pathname: '/authenticated/session-detail',
      params: { id: item.id },
    });
  };

  const renderHeader = () => {
    if (isLoading) return <LoadingItem />;
    if (isError) return <ErrorItem />;
    if (scheduleItems.length === 0) return <EmptyItem />;
    return null;
  };

  return (
    <View className="flex-1 bg-background">
      <Header />
      <ProgramSwitcher />
      <View className="flex-1">
        <DateWheelPicker onDateChange={handleDateChange} />
        <FlatList
          data={scheduleItems}
          renderItem={({ item }) => (
            <ScheduleCard
              item={item}
              onPress={() => handleScheduleCardPress(item)}
            />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20 }}
          ListHeaderComponent={renderHeader}
          removeClippedSubviews={false}
        />
      </View>
    </View>
  );
};

export default ScheduleListScreen;
