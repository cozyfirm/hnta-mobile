import { useState } from 'react';

import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { router } from 'expo-router';

import Button from '@/components/Button';
import LockIcon from '@/icons/LockIcon';
import MailIcon from '@/icons/MailIcon';
import { useLogin } from '@/services';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: login, isPending } = useLogin();

  return (
    <View className="flex-1 justify-center items-center gap-6">
      <View className="justify-center items-center gap-0.5">
        <Text className="font-gimlet-medium text-primary">Dobro došli</Text>
        <Image
          source={require('@/assets/images/logo.png')}
          className="w-72"
          resizeMode="contain"
        />
      </View>
      <View className="justify-center items-center gap-4 w-full px-5 max-w-[400px]">
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
              onChangeText={(text) => setEmail(text)}
            />
          </View>
        </View>
        <View className="w-full">
          <Text className="font-gimlet-semibold text-secondary mb-2">
            Lozinka
          </Text>
          <View className="flex-row items-center border border-primary rounded-lg px-3 py-2">
            <LockIcon />
            <TextInput
              placeholder="********"
              placeholderTextColor="#3e7d77"
              className="ml-2 flex-1 text-primary font-gimlet-medium"
              secureTextEntry={true}
              keyboardType="default"
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
            />
          </View>
        </View>
        <Button
          title={isPending ? 'Prijava u toku...' : 'Prijavi se'}
          onPress={() => {
            login({
              email,
              password,
            });
          }}
        />
        <TouchableOpacity
          onPress={() => {
            router.replace('/guest/forgot-password');
          }}
          className="mt-4"
        >
          <Text className="font-gimlet-medium text-link">
            Zaboravio sam šifru
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
