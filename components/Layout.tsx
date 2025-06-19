import { ReactNode } from 'react';

import { Platform, SafeAreaView, StatusBar, View } from 'react-native';

import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface LayoutProps {
  children: ReactNode;
  primaryBackground?: boolean;
  isTabs?: boolean;
}

const Layout = ({
  children,
  primaryBackground = false,
  isTabs = false,
}: LayoutProps) => {
  const insets = useSafeAreaInsets();
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
        {!isTabs && (
          <View
            className="absolute bottom-0 left-0 w-full bg-background"
            style={{ height: insets.bottom || 34 }}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

export default Layout;
