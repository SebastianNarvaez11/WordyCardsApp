import {StackScreenProps} from '@react-navigation/stack';
import React, {FC} from 'react';
import {Animated, Easing, View, useWindowDimensions} from 'react-native';

import {ScreenScrollLayout} from '../../../../../common/presentation/components/templates';
import {Text} from '../../../../../common/presentation/components/ui';
import {useAnimation} from '../../../../../common/presentation/hooks';
import {RootStackParams} from '../../../../../common/presentation/navigation';
import {useThemeStore} from '../../../../../common/presentation/store';
import {RegisterForm, RegisterHeader} from '../../components';
import {styles} from './styles';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const RegisterScreen: FC<Props> = ({}) => {
  const {colors} = useThemeStore();
  const {height} = useWindowDimensions();

  const {
    animatedOpacity,
    animatedTranslateY,
    animatedTranslateX,
    onMountTranslateYAnimation,
  } = useAnimation();

  onMountTranslateYAnimation(500, 0, 400, Easing.elastic(0));

  return (
    <ScreenScrollLayout backgroundColor={colors.primary900}>
      <View style={{height}}>
        <RegisterHeader />
        <Animated.View
          style={[
            styles.containerForm,
            {
              backgroundColor: colors.backgroundPrimary,
              opacity: animatedOpacity,
              transform: [
                {translateX: animatedTranslateX},
                {translateY: animatedTranslateY},
              ],
            },
          ]}>
          <Text size={35} font="Lato-Black" text="Regístrate" />

          <RegisterForm />
        </Animated.View>
      </View>
    </ScreenScrollLayout>
  );
};
