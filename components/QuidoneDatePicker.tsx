import React, { useState, useMemo, useEffect } from 'react';
import { View, TouchableOpacity, Text, Modal, Pressable } from 'react-native';
import WheelPicker, { PickerItem } from '@quidone/react-native-wheel-picker';

interface QuidoneDatePickerProps {
  initialDate?: Date;
  onDateChange?: (date: Date) => void;
  numberOfDays?: number;
  startDate?: Date;
  endDate?: Date;
}

interface DateItem extends PickerItem<number> {
  sublabel: string;
  date: Date;
}

export const QuidoneDatePicker: React.FC<QuidoneDatePickerProps> = ({
  initialDate,
  onDateChange,
  numberOfDays = 7,
  startDate,
  endDate,
}) => {
  // Set the fixed date range for August 2-7, 2025
  const fixedStartDate = new Date(2025, 7, 2); // August 2, 2025 (month is 0-indexed)
  const fixedEndDate = new Date(2025, 7, 7); // August 7, 2025

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

  const [selectedDate, setSelectedDate] = useState(initialDate || getDefaultDate());
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelectedIndex, setTempSelectedIndex] = useState(0);

  const dates = useMemo(() => {
    const result: DateItem[] = [];
    
    // Use the fixed date range instead of the props
    const start = fixedStartDate;
    const end = fixedEndDate;
    
    let currentDate = new Date(start);
    let dayNumber = 1;
    
    while (currentDate <= end) {
      const dayName = new Intl.DateTimeFormat('hr-HR', { weekday: 'long' }).format(currentDate);
      const formattedDate = new Intl.DateTimeFormat('hr-HR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(currentDate);

      result.push({
        value: dayNumber,
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
        className="bg-primary/10 rounded-lg px-12 py-4 flex-row items-center"
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
          className="flex-1 justify-center items-center bg-black/20"
        >
          <Pressable 
            onPress={(e) => e.stopPropagation()}
            className="bg-background rounded-lg overflow-hidden w-11/12"
          >
            <View className="relative py-4">
              {/* Arrow indicator */}
              <View
                className="absolute left-4 top-1/2 -translate-y-1/2"
                style={{ marginTop: -2 }}
              >
                <Text className="text-primary text-2xl">→</Text>
              </View>

              <WheelPicker<DateItem>
                data={dates}
                onSelect={(value: number) => {
                  const index = dates.findIndex(item => item.value === value);
                  handleValueChange(index);
                }}
                itemHeight={80}
                visibleItems={3}
                containerStyle={{
                  backgroundColor: 'transparent',
                }}
                cursorStyle={{
                  backgroundColor: 'rgba(102, 204, 204, 0.1)',
                  borderRadius: 8,
                }}
                bounces={false}
                haptics={true}
              />
            </View>

            <View className="flex-row justify-end p-4 border-t border-primary/10">
              <TouchableOpacity
                onPress={() => setIsOpen(false)}
                className="px-6 py-2 mr-2"
              >
                <Text className="text-primary/60 font-gimlet-medium">Odustani</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleConfirm}
                className="bg-primary px-6 py-2 rounded-lg"
              >
                <Text className="text-primary font-gimlet-bold">Potvrdi</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}; 