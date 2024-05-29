import {NavigationProp, useNavigation} from '@react-navigation/native';

import {ScreenLayout} from '../../components/templates';
import {Button, SwitchTheme} from '../../components/ui';
import {MainStackParams} from '../../navigation';
import {useAuthStore} from '../../store';

export const HomeScreen = () => {
  const {checkStatus, logout} = useAuthStore();
  const navigation = useNavigation<NavigationProp<MainStackParams>>();

  return (
    <ScreenLayout>
      <SwitchTheme />
      <Button
        label="Practicar"
        onPress={() => navigation.navigate('PracticeScreen')}
      />
      <Button label="logout" onPress={() => logout()} />

      <Button label="check status" onPress={() => checkStatus()} />
    </ScreenLayout>
  );
};
