import { View, Text, ActivityIndicator } from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={{ marginTop: 16, fontSize: 16, color: '#666' }}>
        Initializing app...
      </Text>
    </View>
  );
};

export default LoadingScreen; 