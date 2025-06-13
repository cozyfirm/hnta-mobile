import { Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
}

const Button = ({ title, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress()}
      className="bg-primary px-8 py-2 rounded-xl"
    >
      <Text className="font-gimlet-regular text-xl text-background">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
