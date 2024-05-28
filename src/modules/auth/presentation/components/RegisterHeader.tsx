import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import IconIo from 'react-native-vector-icons/Ionicons';

import {WcWhiteIcon} from '../../../../common/presentation/components/icons';
import {RootStackParams} from '../../../../common/presentation/navigation';
import {useThemeStore} from '../../../../common/presentation/store';

export const RegisterHeader = () => {
  const {colors} = useThemeStore();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  return (
    <View style={styles.containerHeader}>
      <Pressable
        style={[styles.back, {backgroundColor: colors.primary100}]}
        onPress={() => navigation.goBack()}>
        <IconIo name="arrow-back" size={30} color={colors.white} />
      </Pressable>
      <View style={styles.iconHeader}>
        <WcWhiteIcon size={100} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  back: {
    height: 50,
    width: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 20,
  },
  containerHeader: {
    padding: 20,
  },
  iconHeader: {
    alignSelf: 'center',
  },
});
