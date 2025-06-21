import { Pressable, Text, View } from 'react-native';

import { MessagesIcon } from '@/icons';

interface NotificationData {
  id: number;
  created_at: string;
  inbox_id: number;
  message_rel: {
    id: number;
    title: string;
    from: number;
    from_rel: {
      id: number;
      name: string;
      photo_path: string;
      photo_uri: string;
      role: string;
    };
  };
  read: number;
  read_at: string | null;
  to: number;
}

interface NotificationCardProps {
  item: NotificationData;
  onPress: () => void;
}

const NotificationCard = ({ item, onPress }: NotificationCardProps) => {
  const isRead = item.read === 1;

  return (
    <Pressable
      onPress={onPress}
      className={`mb-4 rounded-lg border border-primary p-4 ${
        isRead ? 'bg-background' : 'bg-primary'
      }`}
    >
      <View className="flex-row items-center">
        <MessagesIcon active={!isRead} />
        <Text
          className={`ml-2 font-gimlet-bold text-lg ${isRead ? 'text-secondary' : 'text-primary'}`}
        >
          {item.message_rel.from_rel.name}
        </Text>
      </View>
      <Text
        className={`mt-2 font-gimlet-bold text-xl ${isRead ? 'text-secondary' : 'text-primary'}`}
      >
        {item.message_rel.title}
      </Text>
    </Pressable>
  );
};

export default NotificationCard;
