import {useNavigation} from '@react-navigation/native';
import React, {FC, ReactNode} from 'react';
import {Pressable, StyleSheet, useWindowDimensions} from 'react-native';
import {Platform, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import IconIo from 'react-native-vector-icons/Ionicons';

import {useThemeStore} from '../../store';
import {Text} from '../ui';

interface Props {
  title?: string;
  rightActions?: ReactNode;
  canGoBack?: boolean;
}

export const TopNavbarScreen: FC<Props> = ({
  title,
  rightActions,
  canGoBack,
}) => {
  const {colors} = useThemeStore();
  const {width} = useWindowDimensions();
  const {top} = useSafeAreaInsets();

  const navigation = useNavigation();

  const getPadding = () => {
    const paddingTop = Platform.OS === 'android' ? 0 : top;
    return paddingTop;
  };

  const getHeight = () => {
    const height = Platform.OS === 'android' ? 50 : 50 + top;
    return height;
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundPrimary,
          height: getHeight(),
          paddingTop: getPadding(),
        },
      ]}>
      {title && (
        <View
          style={[
            styles.titleContainer,
            {
              height: getHeight(),
              paddingTop: getPadding(),
              width,
            },
          ]}>
          <Text text={title} font="Lato-Bold" size={18} />
        </View>
      )}
      {canGoBack ? (
        <Pressable onPress={() => navigation.goBack()}>
          <IconIo name="chevron-back" size={30} color={colors.text} />
        </Pressable>
      ) : (
        <View />
      )}

      <View>{rightActions}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  noPadding: {paddingTop: 0},
  titleContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
