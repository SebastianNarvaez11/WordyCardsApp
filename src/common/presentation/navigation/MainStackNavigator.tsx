import {createStackNavigator} from '@react-navigation/stack';

import {PracticeScreen} from '../../../modules/practice/presentation/screens';
import {ProfileScreen} from '../../../modules/profile/presentation/screens';
import {DrawerNavigator} from './DrawerNavigator';

export type MainStackParams = {
  DrawerNavigator: undefined;
  ProfileScreen: undefined;
  PracticeScreen: undefined;
};

const Stack = createStackNavigator<MainStackParams>();

export const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="DrawerNavigator">
      <Stack.Screen
        name="DrawerNavigator"
        component={DrawerNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PracticeScreen"
        component={PracticeScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
