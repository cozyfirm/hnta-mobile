import { Text, TouchableOpacity, View } from 'react-native';

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

import Header from '@/components/Header';

const HomeScreen = () => {
  return (
    <View className="flex-1 bg-background">
      <Header />
      <View className="flex-1 flex-row p-5 gap-3">
        <View className="flex-1 gap-3">
          {[
            {
              label: 'Raspored',
              color: 'bg-primary',
              icon: (
                <MaterialCommunityIcons
                  name="calendar-month"
                  size={48}
                  color="#333366"
                />
              ),
              onPress: () => {
                router.push('/authenticated/tabs/calendar');
              },
            },
            {
              label: 'Generalne\nobavijesti',
              color: 'bg-tertiary',
              icon: (
                <MaterialCommunityIcons
                  name="message-text-outline"
                  size={48}
                  color="#333366"
                />
              ),
              onPress: () => {
                router.push('/authenticated/tabs/notifications');
              },
            },
            {
              label: 'Predavači',
              color: 'bg-primary',
              icon: (
                <MaterialCommunityIcons
                  name="account-voice"
                  size={48}
                  color="#333366"
                />
              ),
              onPress: () => {
                router.push('/authenticated/presenters');
              },
            },
          ].map((card) => (
            <TouchableOpacity
              activeOpacity={0.8}
              key={card.label}
              className={`flex-1 items-center justify-center ${card.color} rounded-xl p-2`}
              onPress={card?.onPress}
            >
              {card.icon}
              <Text className="text-lg font-gimlet-bold text-background text-center mt-2">
                {card.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="flex-1 gap-3">
          {[
            {
              label: 'Vijesti',
              color: 'bg-tertiary',
              icon: (
                <MaterialCommunityIcons
                  name="newspaper-variant-outline"
                  size={48}
                  color="#333366"
                />
              ),
              onPress: () => {
                router.push('/authenticated/news');
              },
            },
            {
              label: 'Lokacije',
              color: 'bg-primary',
              icon: (
                <MaterialIcons name="location-pin" size={48} color="#333366" />
              ),
              onPress: () => {
                router.push('/authenticated/locations');
              },
            },
            {
              label: 'Učesnici',
              color: 'bg-tertiary',
              icon: <MaterialIcons name="person" size={48} color="#333366" />,
              onPress: () => {
                router.push('/authenticated/attendees');
              },
            },
          ].map((card) => (
            <TouchableOpacity
              activeOpacity={0.8}
              key={card.label}
              className={`flex-1 items-center justify-center ${card.color} rounded-xl p-2`}
              onPress={card?.onPress}
            >
              {card.icon}
              <Text className="text-lg font-gimlet-bold text-background text-center mt-2">
                {card.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
