import { ReactNode } from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';

import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface LayoutProps {
  children: ReactNode;
  primaryBackground?: boolean;
  isTabs?: boolean;
  enableKeyboardAvoiding?: boolean;
}

const Layout = ({
  children,
  primaryBackground = false,
  isTabs = false,
  enableKeyboardAvoiding = true,
}: LayoutProps) => {
  const insets = useSafeAreaInsets();
  const className = primaryBackground
    ? 'flex-1 bg-primary'
    : 'flex-1 bg-background';

  const content = (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        paddingBottom: Platform.OS === 'ios' ? StatusBar.currentHeight : 0,
      }}
      className="flex-1"
    >
      {children}
      {!isTabs && (
        <View
          className="absolute bottom-0 left-0 w-full bg-background"
          style={{ height: Platform.OS === 'ios' ? insets.bottom : 0 }}
        />
      )}
    </SafeAreaView>
  );

  if (!enableKeyboardAvoiding) {
    return (
      <View className={className}>
        <ExpoStatusBar style="light" />
        {content}
      </View>
    );
  }

  return (
    <View className={className}>
      <ExpoStatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {content}
      </KeyboardAvoidingView>
    </View>
  );
};

export default Layout;
