import React, { useEffect, useState } from 'react';

import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// @ts-ignore
import { Picker } from '@react-native-picker/picker';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// @ts-ignore
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { Toast } from 'toastify-react-native';

import {
  changePassword,
  deleteProfile,
  fetchCountries,
  fetchMyInfo,
  updateBasicData,
  uploadPhoto,
} from '../services/users';

import Header from '@/components/Header';
import Layout from '@/components/Layout';
import { getBaseURL } from '@/helpers';
import { useAuthStore } from '@/store';

const EditProfileScreen = () => {
  const { user } = useAuthStore();
  const api_token = user?.api_token;
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    name: '',
    country: '',
    city: '',
    about: '',
    phone: '',
    birth_date: '',
    address: '',
  });
  const [photo, setPhoto] = useState<string | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [tempCountry, setTempCountry] = useState(form.country);

  // Fetch user info
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['myInfo'],
    queryFn: () => fetchMyInfo(api_token || '').then((res) => res.data.data),
    enabled: !!api_token,
  });

  const { data: countriesData, isLoading: isCountriesLoading } = useQuery({
    queryKey: ['countries'],
    queryFn: () => fetchCountries(api_token || '').then((res) => res.data.data),
    enabled: !!api_token,
  });

  useEffect(() => {
    if (data) {
      // Find country by code to get the id
      let countryId = '';
      if (
        data.country &&
        typeof data.country === 'object' &&
        data.country.code
      ) {
        const foundCountry = countriesData?.find(
          (c: any) => c.code === data.country.code
        );
        countryId = foundCountry?.id || '';
      } else if (data.country) {
        countryId = data.country;
      }

      setForm({
        name: data.name || '',
        country: countryId,
        city: data.city || '',
        about: data.about || '',
        phone: data.phone || '',
        birth_date: data.birth_date || '',
        address: data.address || '',
      });
      setPhoto(
        data.photo?.hasPhoto && data.photo?.photo_uri
          ? getBaseURL() + data.photo.path + data.photo.photo_uri
          : null
      );
      setTempCountry(countryId);
    }
  }, [data, countriesData]);

  // Mutations
  const updateMutation = useMutation({
    mutationFn: (vars: { api_token: string } & typeof form) =>
      updateBasicData(vars),
    onSuccess: (data) => {
      if (data?.data?.code === '0000') {
        Toast.success('Profil je ažuriran');
      } else {
        Toast.error(data?.data?.message);
      }
      refetch();
    },
    onError: () => Toast.error('Neuspješno ažuriranje profila'),
  });

  const uploadPhotoMutation = useMutation({
    mutationFn: async ({
      api_token,
      photo,
    }: {
      api_token: string;
      photo: any;
    }) => {
      const res = await uploadPhoto(api_token, photo);
      return res;
    },
    onSuccess: (data) => {
      Toast.success('Fotografija je ažurirana!');
      refetch();
    },
    onError: (error) => {
      Toast.error('Neuspješno ažuriranje fotografije');
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: ({
      api_token,
      password,
      repeat,
    }: {
      api_token: string;
      password: string;
      repeat: string;
    }) => changePassword({ api_token, password, repeat }),
    onSuccess: (data) => {
      if (data.data.code === '0000') {
        Toast.success('Lozinka je promijenjena!');
        setShowPasswordModal(false);
        setPassword('');
        setRepeat('');
      } else {
        Toast.error(data.data.message);
      }
    },
    onError: () => Toast.error('Neuspješna promjena lozinke'),
  });

  const deleteProfileMutation = useMutation({
    mutationFn: () => deleteProfile(api_token || ''),
    onSuccess: () => {
      Toast.success('Vaš profil je obrisan.');
      router.push('/guest');
    },
    onError: () => Toast.error('Neuspješno brisanje profila'),
  });

  const handleSave = () => {
    updateMutation.mutate({ api_token: api_token || '', ...form });
  };

  const handlePhotoChange = async () => {
    if (!api_token) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      setPhoto(asset.uri);
      const uriParts = asset.uri.split('.');
      const fileType = uriParts[uriParts.length - 1].toLowerCase();
      let mimeType = 'image/jpeg';
      if (fileType === 'png') mimeType = 'image/png';
      else if (fileType === 'jpg' || fileType === 'jpeg')
        mimeType = 'image/jpeg';
      else if (fileType === 'heic') mimeType = 'image/heic';
      const photoFile = {
        uri: asset.uri,
        name: asset.fileName || `profile.${fileType}`,
        type: mimeType,
      };
      uploadPhotoMutation.mutate({
        api_token: api_token || '',
        photo: photoFile,
      });
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Obriši profil',
      'Jeste li sigurni da želite obrisati profil?',
      [
        { text: 'Otkaži', style: 'cancel' },
        {
          text: 'Obriši',
          style: 'destructive',
          onPress: () => deleteProfileMutation.mutate(),
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <Layout primaryBackground>
        <Header showBackButton />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#66CCCC" />
          <Text className="text-primary text-lg font-gimlet-medium mt-2">
            Učitavanje profila...
          </Text>
        </View>
      </Layout>
    );
  }

  return (
    <ScrollView className="flex-1 mb-10" showsVerticalScrollIndicator={false}>
      <Header showBackButton />
      <View className="items-center mb-6">
        <TouchableOpacity onPress={handlePhotoChange} className="mb-2">
          <Image
            source={{
              uri: photo,
            }}
            className="w-24 h-24 rounded-full border-2 border-white bg-gray-200"
          />
          <View className="absolute bottom-0 right-0 bg-white rounded-full p-1 border border-gray-300">
            <Text className="text-lg">✏️</Text>
          </View>
        </TouchableOpacity>
        <Text className="text-2xl font-gimlet-bold text-background mt-2">
          {form.name}
        </Text>
      </View>
      <View className="mb-4 px-4">
        <Text className="text-background font-gimlet-medium mb-1">Ime</Text>
        <TextInput
          className="bg-[#b2e6e9] rounded-lg font-gimlet-medium px-4 py-2 mb-2"
          value={form.name || ''}
          onChangeText={(v) => setForm((f) => ({ ...f, name: v }))}
        />
        <Text className="text-background font-gimlet-medium mb-1">Država</Text>
        <TouchableOpacity
          className="flex-row items-center font-gimlet-medium bg-[#b2e6e9] rounded-lg px-4 py-2 mb-2"
          onPress={() => setShowCountryModal(true)}
          activeOpacity={0.8}
        >
          {countriesData && form.country && (
            <Text className="flex-1 text-base font-gimlet-medium">
              {(() => {
                const selected = countriesData.find((c: any) => {
                  return c.id === form.country;
                });
                return selected ? selected.name_ba : 'Odaberite državu';
              })()}
            </Text>
          )}
          {!form.country && (
            <Text className="flex-1 text-base font-gimlet-medium text-gray-400">
              Odaberite državu
            </Text>
          )}
        </TouchableOpacity>
        <Modal visible={showCountryModal} animationType="slide" transparent>
          <View className="flex-1 bg-black/30 justify-center items-center">
            <View className="bg-white rounded-xl p-6 w-4/5 max-h-[70%]">
              <Text className="font-gimlet-bold text-lg mb-4">
                Odaberite državu
              </Text>
              <ScrollView className="mb-4">
                {isCountriesLoading ? (
                  <Text>Učitavanje država...</Text>
                ) : (
                  countriesData?.map((country: any) => (
                    <TouchableOpacity
                      key={country.id}
                      className={`flex-row items-center py-2 px-2 rounded ${tempCountry === country.code || tempCountry === country.id ? 'bg-primary/20' : ''}`}
                      onPress={() => setTempCountry(country.id)}
                    >
                      <Text className="text-base font-gimlet-medium">
                        {country.name_ba}
                      </Text>
                    </TouchableOpacity>
                  ))
                )}
              </ScrollView>
              <TouchableOpacity
                className="bg-primary py-3 rounded-lg items-center mb-2"
                onPress={() => {
                  setForm((f) => ({ ...f, country: tempCountry }));
                  setShowCountryModal(false);
                }}
              >
                <Text className="text-background font-gimlet-bold text-lg">
                  Potvrdi
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-link py-3 rounded-lg items-center"
                onPress={() => setShowCountryModal(false)}
              >
                <Text className="text-background font-gimlet-bold text-lg">
                  Otkaži
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Text className="text-background font-gimlet-medium mb-1">Grad</Text>
        <TextInput
          className="bg-[#b2e6e9] rounded-lg font-gimlet-medium px-4 py-2 mb-2"
          value={form.city || ''}
          onChangeText={(v) => setForm((f) => ({ ...f, city: v }))}
        />
        <Text className="text-background font-gimlet-medium mb-1">Telefon</Text>
        <TextInput
          className="bg-[#b2e6e9] rounded-lg font-gimlet-medium px-4 py-2 mb-2"
          value={form.phone || ''}
          onChangeText={(v) => setForm((f) => ({ ...f, phone: v }))}
          keyboardType="phone-pad"
        />
        <Text className="text-background font-gimlet-medium mb-1">
          Datum rođenja
        </Text>
        <TextInput
          className="bg-[#b2e6e9] rounded-lg font-gimlet-medium px-4 py-2 mb-2"
          value={form.birth_date || ''}
          onChangeText={(v) => setForm((f) => ({ ...f, birth_date: v }))}
          placeholder="DD.MM.YYYY"
        />
        <Text className="text-background font-gimlet-medium mb-1">Adresa</Text>
        <TextInput
          className="bg-[#b2e6e9] rounded-lg font-gimlet-medium px-4 py-2 mb-2"
          value={form.address || ''}
          onChangeText={(v) => setForm((f) => ({ ...f, address: v }))}
        />
        <Text className="text-background font-gimlet-medium mb-1">O meni</Text>
        <TextInput
          className="bg-[#b2e6e9] rounded-lg px-4 font-gimlet-medium py-2 mb-2 min-h-[80px] text-top"
          value={form.about || ''}
          onChangeText={(v) => setForm((f) => ({ ...f, about: v }))}
          multiline
        />
        <TouchableOpacity
          className="bg-background py-3 rounded-lg items-center mb-3 mt-10"
          onPress={handleSave}
          disabled={updateMutation.isPending}
        >
          <Text className="text-primary font-gimlet-bold text-lg">Sačuvaj</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-tertiary py-3 rounded-lg items-center mb-3"
          onPress={() => setShowPasswordModal(true)}
        >
          <Text className="text-background font-gimlet-bold text-lg">
            Promijeni lozinku
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-red-500 py-3 rounded-lg items-center"
          onPress={handleDelete}
          disabled={deleteProfileMutation.isPending}
        >
          <Text className="text-background font-gimlet-bold text-lg">
            Obriši profil
          </Text>
        </TouchableOpacity>
      </View>
      {/* Change Password Modal */}
      <Modal visible={showPasswordModal} animationType="slide" transparent>
        <View className="flex-1 bg-black/30 justify-center items-center">
          <View className="bg-white rounded-xl p-6 w-4/5">
            <Text className="font-gimlet-bold text-lg mb-4">
              Promijeni lozinku
            </Text>
            <Text className="mb-1 font-gimlet-medium">Nova lozinka</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              className="bg-gray-100 rounded-lg font-gimlet-medium px-4 py-2 mb-2"
            />
            <Text className="mb-1 font-gimlet-medium">Ponovi lozinku</Text>
            <TextInput
              value={repeat}
              onChangeText={setRepeat}
              secureTextEntry
              className="bg-gray-100 rounded-lg font-gimlet-medium px-4 py-2 mb-4"
            />
            <TouchableOpacity
              className="bg-background py-3 rounded-lg items-center mb-2"
              onPress={() =>
                changePasswordMutation.mutate({
                  api_token: api_token || '',
                  password: password || '',
                  repeat: repeat || '',
                })
              }
              disabled={changePasswordMutation.isPending}
            >
              <Text className="text-primary font-gimlet-bold text-lg">
                Sačuvaj
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-tertiary py-3 rounded-lg items-center"
              onPress={() => setShowPasswordModal(false)}
            >
              <Text className="text-background font-gimlet-bold text-lg">
                Otkaži
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default EditProfileScreen;
