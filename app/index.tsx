import { Text, View } from 'react-native';

const Screen = () => {
  return (
    <View className="flex-1 justify-center items-center bg-background gap-4">
      <Text className="font-gimlet-light text-white text-2xl">Light Variable</Text>
      <Text className="font-gimlet-regular text-white text-2xl">Regular Variable</Text>
      <Text className="font-gimlet-medium text-white text-2xl">Medium Variable</Text>
      <Text className="font-gimlet-semibold text-white text-2xl">SemiBold Variable</Text>
      <Text className="font-gimlet-bold text-white text-2xl">Bold Variable</Text>
      <Text className="font-gimlet-black text-white text-2xl">Black Variable</Text>
    </View>
  );
};

export default Screen;
