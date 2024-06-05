import {createDrawerNavigator} from '@react-navigation/drawer';

import {SettingsScreen} from '../../../modules/setting/presentation/screens';
import {CustomDrawer} from '../components/navigation';
import {HomeScreen} from '../screens';

export type DrawerParams = {
  HomeScreen: undefined;
  SettingsScreen: undefined;
};

const Drawer = createDrawerNavigator<DrawerParams>();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeScreen"
      drawerContent={() => CustomDrawer()}
      screenOptions={{
        // drawerType: 'front',
        // drawerPosition: 'right',
        drawerContentContainerStyle: {justifyContent: 'space-between'},
      }}>
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};
