import {createStackNavigator} from '@react-navigation/stack';

import {
  IExerciseModel,
  IGroupDetailModel,
} from '../../../modules/groups/domain/models';
import {
  GroupCreateScreen,
  GroupUpdateScreen,
} from '../../../modules/groups/presentation/screens';
import {
  PracticeCardScreen,
  PracticeWriteScreen,
} from '../../../modules/practice/presentation/screens';
import {ProfileScreen} from '../../../modules/profile/presentation/screens';
import {DrawerNavigator} from './DrawerNavigator';

export type MainStackParams = {
  DrawerNavigator: undefined;
  ProfileScreen: undefined;
  PracticeCardScreen: {groupId: string; exercises: IExerciseModel[]};
  PracticeWriteScreen: {groupId: string; exercises: IExerciseModel[]};
  GroupCreateScreen: undefined;
  GroupUpdateScreen: {group: IGroupDetailModel};
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
        name="PracticeCardScreen"
        component={PracticeCardScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PracticeWriteScreen"
        component={PracticeWriteScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GroupCreateScreen"
        component={GroupCreateScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GroupUpdateScreen"
        component={GroupUpdateScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
