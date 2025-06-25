import { Image, Text, TouchableOpacity, View } from 'react-native';

import { Link } from 'expo-router';

import { Chat } from '@/services';

interface MessageCardProps {
  item: Chat;
  onPress: () => void;
}

const MessageCard = ({ item, onPress }: MessageCardProps) => {
  const isRead = item?.my_side?.unread === 0;

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        className={`p-4 rounded-lg border border-primary mb-4 ${
          !isRead ? 'bg-transparent' : 'bg-primary'
        }`}
      >
        <View className="flex-row items-center">
          <Image
            source={{
              uri:
                'https://staging.talentakademija.ba/' +
                item?.user_rel?.photo_path,
            }}
            className="w-12 h-12 rounded-full mr-4"
          />
          <View className="flex-1">
            <Text
              className={`text-lg font-gimlet-bold ${!isRead ? 'text-secondary' : 'text-background'}`}
            >
              {item.user_rel?.user_rel?.name}
            </Text>
            <Text
              className={`font-gimlet-regular ${!isRead ? 'text-secondary' : 'text-background'}`}
            >
              {item.last_message}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MessageCard;
