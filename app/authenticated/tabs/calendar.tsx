import { Button, SafeAreaView } from 'react-native';

import { useLogout } from '@/services';

const Screen = () => {
  const { logout } = useLogout();

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Button title="Odjavi se" onPress={() => logout()} />
    </SafeAreaView>
  );
};

export default Screen;
