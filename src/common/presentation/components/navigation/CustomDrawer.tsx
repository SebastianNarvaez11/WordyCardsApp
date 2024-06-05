import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Platform, StyleSheet, View} from 'react-native';

import {useAuthStore, useThemeStore} from '../../store';
import {Button, SwitchTheme} from '../ui';

export const CustomDrawer = () => {
  const {colors} = useThemeStore();
  const {logout} = useAuthStore();

  return (
    <View
      style={[styles.container, {backgroundColor: colors.backgroundSecondary}]}>
      <DrawerContentScrollView>
        <SwitchTheme />

        {/* <View style={styles.itemsContainer}>
          {drawerOptions().map(item => (
            <ItemNavDrawer key={item.label} {...item} />
          ))}
        </View> */}
      </DrawerContentScrollView>

      <Button
        label="Cerrar sesión"
        labelSize={14}
        onPress={() => logout()}
        width={180}
        style={styles.buttonLogout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 30 : undefined,
  },
  itemsContainer: {
    marginTop: 30,
  },
  buttonLogout: {
    alignSelf: 'center',
    marginBottom: 30,
  },
});
