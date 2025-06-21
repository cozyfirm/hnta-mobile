import React from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ScheduleItem } from '@/types/schedule';

type ScheduleCardProps = {
  item: ScheduleItem;
  onPress?: () => void;
};

const ScheduleCard: React.FC<ScheduleCardProps> = ({ item, onPress }) => {
  const getBackgroundColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'predavanje':
        return 'bg-tertiary';
      case 'radionica':
        return 'bg-primary';
      case 'obrok':
        return 'bg-meal';
      case 'party':
        return 'bg-party';
      case 'kritičko mišljenje':
        return 'bg-secondary';
      default:
        return 'bg-primary';
    }
  };

  const date = new Date(item?.datetime_from);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const formatted = `${hours}H${minutes}`;

  return (
    <TouchableOpacity
      className={`${getBackgroundColor(item.type)} rounded-lg mb-2 p-4 flex-row gap-4`}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View className="gap-4">
        <View className="bg-white/2r0 max-w-fit p-2 rounded-xl">
          <Text className="text-background font-gimlet-medium">
            {item.type}
          </Text>
        </View>
        <View className="flex-row gap-2 justify-start items-center">
          <MaterialCommunityIcons
            name="clock-time-four-outline"
            size={24}
            color="#333366"
          />
          <View className="h-[24px] w-[2px] bg-background" />
          <Text className="text-background font-gimlet-medium">
            {item.duration} min
          </Text>
        </View>
        <Text className="text-background font-gimlet-black">{formatted}</Text>
      </View>
      <View className="mt-12 flex-1">
        <Text
          className="text-background font-gimlet-bold text-lg"
          numberOfLines={0}
        >
          {item?.title}
        </Text>
        <Text
          className="text-background font-gimlet-medium mt-2"
          numberOfLines={0}
        >
          {item?.presenters_rel
            ? item?.presenters_rel[0].presenter_rel?.name
            : item.location_rel?.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ScheduleCard;
