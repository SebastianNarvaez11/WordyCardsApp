import {StackScreenProps} from '@react-navigation/stack';
import {FC, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import Animated, {FadeIn, FadeInUp, FadeOut} from 'react-native-reanimated';

import {RootStackParams} from '../../navigation';
import {useThemeStore} from '../../store/useThemeStore';
import {styles} from './styles';

interface Props extends StackScreenProps<RootStackParams, 'SplashScreen'> {}

export const SplashScreen: FC<Props> = ({}) => {
  const [isLoading] = useState(false);
  const {colors} = useThemeStore();

  return (
    <View style={[styles.container, {backgroundColor: colors.primary}]}>
      <Animated.View
        entering={FadeIn.duration(1000)}
        exiting={FadeOut}
        style={[styles.circle1, {backgroundColor: colors.primary900}]}
      />

      <View style={styles.containerLoader}>
        <Animated.View entering={FadeInUp.duration(1000)} exiting={FadeOut}>
          {/* <LogoSbs size={200} /> */}
        </Animated.View>

        {isLoading && (
          <ActivityIndicator
            color={colors.white}
            size={20}
            style={styles.loader}
          />
        )}
      </View>

      <Animated.View
        entering={FadeIn.duration(1000)}
        exiting={FadeOut}
        style={[styles.circle2, {backgroundColor: colors.primary900}]}
      />
    </View>
  );
};
