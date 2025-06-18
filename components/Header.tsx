import { Image, Text, TouchableOpacity, View } from 'react-native';

import BellIcon from '@/icons/BellIcon';
import ThreeDotsIcon from '@/icons/ThreeDotsIcon';
import { useAuthStore } from '@/store';

const Header = () => {
  const { user } = useAuthStore();

  return (
    <View className="bg-primary p-5 flex-row justify-between items-center">
      <View className="flex flex-row justify-center items-center gap-2 w-fit">
        <Image
          source={{
            uri: user?.photo?.hasPhoto
              ? 'https://staging.talentakademija.ba' +
                user?.photo?.path +
                user?.photo?.photo_uri
              : 'https://avatar.iran.liara.run/public',
          }}
          className="h-12 w-12 rounded-full"
        />
        <Text className="font-gimlet-regular text-background text-xl tracking-widest">
          {user?.name}
        </Text>
      </View>
      <View className="flex-row justify-center items-center gap-2">
        <TouchableOpacity
          activeOpacity={0.8}
          className="h-12 w-12 rounded-full bg-white/40 justify-center items-center"
        >
          <BellIcon />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          className="h-12 w-12 rounded-full bg-white/40 justify-center items-center"
        >
          <ThreeDotsIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
