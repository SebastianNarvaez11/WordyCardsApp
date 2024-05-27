import {createStackNavigator} from '@react-navigation/stack';

import {
  LoginScreen,
  RegisterScreen,
} from '../../../modules/auth/presentation/screens';
import {SplashScreen} from '../screens';
import {MainStackNavigator} from './MainStackNavigator';

export type RootStackParams = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  MainStackNavigator: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const RootStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{headerShown: false}}
      />

      {/* Auth route */}
      <Stack.Screen
        name="MainStackNavigator"
        component={MainStackNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
