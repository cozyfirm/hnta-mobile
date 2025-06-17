import {
  Image,
  Linking,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { router } from 'expo-router';

import Button from '@/components/Button';
import MailIcon from '@/icons/MailIcon';

const ForgotPasswordScreen = () => {
  return (
    <View className="flex-1 justify-center items-center gap-6">
      <View className="justify-center items-center gap-0.5">
        <Text className="font-gimlet-medium text-primary">
          Oporavak lozinke
        </Text>
        <Image
          source={require('@/assets/images/logo.png')}
          className="w-72"
          resizeMode="contain"
        />
      </View>
      <View className="justify-center items-center gap-4 w-full px-5 max-w-[400px]">
        <Text className="font-gimlet-medium text-primary text-center">
          Molimo vas unesite vaš e-mail i poslat ćemo vam podatke za oporavak
          lozinke.
        </Text>
        <View className="w-full">
          <Text className="font-gimlet-semibold text-secondary mb-2">
            Email
          </Text>
          <View className="flex-row items-center border border-primary rounded-lg px-3 py-2">
            <MailIcon />
            <TextInput
              placeholder="hnta@fondacijaaekipa.ba"
              placeholderTextColor="#3e7d77"
              className="ml-2 flex-1 text-primary font-gimlet-medium"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>
        <Button
          title="Pošalji"
          onPress={() => Linking.openURL('https://www.google.com')}
        />
        <TouchableOpacity
          onPress={() => {
            router.replace('/guest');
          }}
          className="mt-4"
        >
          <Text className="font-gimlet-medium text-link">Nazad na prijavu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
