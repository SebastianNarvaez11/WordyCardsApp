import React from 'react';
import {View} from 'react-native';

import {Button} from '../../components/ui';
import {useAuthStore} from '../../store';

export const HomeScreen = () => {
  const {checkStatus, logout} = useAuthStore();
  return (
    <View>
      <Button label="logout" onPress={() => logout()} />

      <Button label="check status" onPress={() => checkStatus()} />
    </View>
  );
};
