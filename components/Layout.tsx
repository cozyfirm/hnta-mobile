import { ReactNode } from 'react';

import { Platform, SafeAreaView, StatusBar, View } from 'react-native';

import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

interface LayoutProps {
  children: ReactNode;
  primaryBackground?: boolean;
}

const Layout = ({ children, primaryBackground = false }: LayoutProps) => {
  const className = primaryBackground
    ? 'flex-1 h-full bg-primary'
    : 'flex-1 h-full bg-background';

  return (
    <View className={className}>
      <ExpoStatusBar style="light" />
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}
        className="flex-1"
      >
        {children}
      </SafeAreaView>
    </View>
  );
};

export default Layout;
