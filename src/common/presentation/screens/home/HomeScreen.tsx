import BottomSheet from '@gorhom/bottom-sheet';
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {useRef} from 'react';
import {Platform, Pressable, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import IconIo from 'react-native-vector-icons/Ionicons';

import {GroupList} from '../../../../modules/groups/presentation/components';
import {WcPrimaryShadowIcon} from '../../components/icons';
import {ScreenLayout} from '../../components/templates';
import {Text} from '../../components/ui';
import {MainStackParams} from '../../navigation';
import {useAuthStore, useThemeStore} from '../../store';

export const HomeScreen = () => {
  const {colors} = useThemeStore();
  const {user} = useAuthStore();
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<MainStackParams>>();

  const groupModalRef = useRef<BottomSheet>(null);

  return (
    <ScreenLayout noPadding>
      <View style={styles.container}>
        <View
          style={[
            styles.topBar,
            {marginTop: Platform.OS === 'android' ? top + 10 : top},
          ]}>
          <Pressable
            onPress={() => navigation.dispatch(DrawerActions.openDrawer)}>
            <IconIo name="menu" size={40} color={colors.primary} />
          </Pressable>
          <WcPrimaryShadowIcon size={70} />
        </View>

        <Text text={user?.name ? `Hola, ${user.name}!` : 'Hola!'} size={25} />
        <Text text="¡Vamos a estudiar!" font="Quicksand-Bold" />
        <Text
          text={'Estos son tus grupos:'}
          size={15}
          color={colors.gray}
          style={styles.textGroups}
        />

        <GroupList groupModalRef={groupModalRef} />
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textGroups: {
    marginTop: 10,
    marginBottom: 10,
  },
});
