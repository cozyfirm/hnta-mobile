import { Text, TouchableOpacity, View } from 'react-native';

import { router } from 'expo-router';

import Header from '@/components/Header';
import Blog from '@/icons/Blog';
import ChatBubble from '@/icons/ChatBubble';
import Location from '@/icons/Location';
import Presenters from '@/icons/Presenters';
import Schedule from '@/icons/Schedule';
import Students from '@/icons/Students';
import { useTabStore } from '@/store';

const HomeScreen = () => {
  const { setCurrentTab } = useTabStore();

  return (
    <View className="flex-1 bg-background">
      <Header />
      <View className="flex-1 flex-row p-5 gap-3">
        <View className="flex-1 gap-3">
          {[
            {
              label: 'Raspored',
              color: 'bg-primary',
              icon: <Schedule />,
              onPress: () => {
                setCurrentTab('calendar');
                router.push('/authenticated/tabs/calendar');
              },
            },
            {
              label: 'Generalne\nobavijesti',
              color: 'bg-tertiary',
              icon: <ChatBubble />,
              onPress: () => {
                router.push('/authenticated/tabs/notifications');
              },
            },
            {
              label: 'Predavači',
              color: 'bg-primary',
              icon: <Presenters />,
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
              icon: <Blog />,
              onPress: () => {
                router.push('/authenticated/news');
              },
            },
            {
              label: 'Lokacije',
              color: 'bg-primary',
              icon: <Location />,
              onPress: () => {
                router.push('/authenticated/locations');
              },
            },
            {
              label: 'Učesnici',
              color: 'bg-tertiary',
              icon: <Students />,
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
