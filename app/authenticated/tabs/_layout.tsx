import { Text, View } from 'react-native';

import { Tabs } from 'expo-router';

import CalendarIcon from '@/icons/CalendarIcon';
import HomeIcon from '@/icons/HomeIcon';
import MessagesIcon from '@/icons/MessagesIcon';
import NotificationsIcon from '@/icons/NotificationsIcon';
import { useNotificationsInfo } from '@/services';
import { useTabStore } from '@/store';

const Layout = () => {
  const { currentTab, setCurrentTab } = useTabStore();
  const { data, isLoading, error } = useNotificationsInfo();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#333366',
          height: 80,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-SemiBold',
        },
        headerShown: false,
      }}
      initialRouteName={currentTab}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => <HomeIcon active={focused} />,
        }}
        listeners={() => ({ tabPress: () => setCurrentTab('index') })}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => <CalendarIcon active={focused} />,
        }}
        listeners={() => ({ tabPress: () => setCurrentTab('calendar') })}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <NotificationsIcon active={focused} />
              {data?.inbox?.unread > 0 && (
                <Text className="ml-1.5 text-link font-gimlet-medium">
                  {data.inbox.unread}
                </Text>
              )}
            </View>
          ),
        }}
        listeners={() => ({ tabPress: () => setCurrentTab('notifications') })}
      />
      <Tabs.Screen
        name="messages"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MessagesIcon active={focused} />
              {data?.chat?.unread > 0 && (
                <Text className="ml-1 text-link text-xl font-gimlet-medium">
                  {data.chat.unread}
                </Text>
              )}
            </View>
          ),
        }}
        listeners={() => ({ tabPress: () => setCurrentTab('messages') })}
      />
    </Tabs>
  );
};

export default Layout;
