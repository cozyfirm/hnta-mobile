import React, { useEffect, useMemo, useState } from 'react';

import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';

import { WheelPicker } from './WheelPicker';

interface DateWheelPickerProps {
  initialDate?: Date;
  onDateChange?: (date: Date) => void;
  numberOfDays?: number;
  startDate?: Date;
  endDate?: Date;
}

export const DateWheelPicker: React.FC<DateWheelPickerProps> = ({
  initialDate,
  onDateChange,
  numberOfDays = 7,
  startDate,
  endDate,
}) => {
  // Set the fixed date range for August 2-7, 2025
  const fixedStartDate = new Date(2025, 7, 2, 10);
  const fixedEndDate = new Date(2025, 7, 8, 10);

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
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelectedIndex, setTempSelectedIndex] = useState(0);

  const dates = useMemo(() => {
    const result = [];

    // Use the fixed date range instead of the props
    const start = fixedStartDate;
    const end = fixedEndDate;

    let currentDate = new Date(start);
    let dayNumber = 1;

    while (currentDate <= end) {
      const dayName = new Intl.DateTimeFormat('hr-HR', {
        weekday: 'long',
      }).format(currentDate);
      const formattedDate = new Intl.DateTimeFormat('hr-HR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(currentDate);

      result.push({
        label: `Dan ${dayNumber}`,
        sublabel: `${dayName}, ${formattedDate}.`,
        date: new Date(currentDate),
      });

      currentDate.setDate(currentDate.getDate() + 1);
      dayNumber++;
    }

    return result;
  }, []); // Remove dependencies since we're using fixed dates

  // Ensure we have dates before proceeding
  if (dates.length === 0) {
    return null;
  }

  const selectedIndex = dates.findIndex(
    (item) => item.date.toDateString() === selectedDate.toDateString()
  );

  // Ensure we have a valid selected index
  const safeSelectedIndex = selectedIndex >= 0 ? selectedIndex : 0;
  const selectedItem = dates[safeSelectedIndex];

  // Reset temp index when opening
  useEffect(() => {
    if (isOpen) {
      setTempSelectedIndex(safeSelectedIndex);
    }
  }, [isOpen, safeSelectedIndex]);

  const handleValueChange = (index: number) => {
    setTempSelectedIndex(index);
  };

  const handleConfirm = () => {
    const newDate = dates[tempSelectedIndex].date;
    setSelectedDate(newDate);
    onDateChange?.(newDate);
    setIsOpen(false);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  // Ensure we have a valid selected item before rendering
  if (!selectedItem) {
    return null;
  }

  return (
    <View className="bg-background">
      <TouchableOpacity
        onPress={toggleOpen}
        activeOpacity={0.8}
        className="bg-background px-12 py-4 flex-row items-center"
      >
        <Text className="text-primary text-2xl mr-4">→</Text>
        <View>
          <Text className="text-xl text-primary font-gimlet-bold">
            {selectedItem.label}
          </Text>
          <Text className="text-lg text-primary font-gimlet-medium">
            {selectedItem.sublabel}
          </Text>
        </View>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable
          onPress={() => setIsOpen(false)}
          className="flex-1 justify-center items-center bg-black/50"
        >
          <Pressable
            onPress={(e) => e.stopPropagation()}
            className="bg-background rounded-lg overflow-hidden w-11/12"
          >
            <WheelPicker
              data={dates}
              selectedIndex={tempSelectedIndex}
              onValueChange={handleValueChange}
              isCollapsed={false}
            />
            <View className="flex-row justify-end p-4 border-t border-primary/10">
              <TouchableOpacity
                onPress={() => setIsOpen(false)}
                className="px-6 py-2 mr-2"
              >
                <Text className="text-primary/60 font-gimlet-medium">
                  Odustani
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleConfirm}
                className="bg-primary px-6 py-2 rounded-lg"
              >
                <Text className="text-background font-gimlet-bold">
                  Potvrdi
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};
