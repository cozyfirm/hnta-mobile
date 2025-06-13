import { Tabs } from 'expo-router';

import CalendarIcon from '@/icons/CalendarIcon';
import HomeIcon from '@/icons/HomeIcon';
import MessagesIcon from '@/icons/MessagesIcon';
import NotificationsIcon from '@/icons/NotificationsIcon';
import { useTabStore } from '@/store';

const Layout = () => {
  const { currentTab, setCurrentTab } = useTabStore();

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
          tabBarIcon: ({ focused }) => <NotificationsIcon active={focused} />,
        }}
        listeners={() => ({ tabPress: () => setCurrentTab('notifications') })}
      />
      <Tabs.Screen
        name="messages"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => <MessagesIcon active={focused} />,
        }}
        listeners={() => ({ tabPress: () => setCurrentTab('messages') })}
      />
    </Tabs>
  );
};

export default Layout;
