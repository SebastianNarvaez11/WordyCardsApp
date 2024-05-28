import {StackScreenProps} from '@react-navigation/stack';
import {FC, useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import Animated, {FadeIn, FadeInUp, FadeOut} from 'react-native-reanimated';

import {WcWhiteIcon} from '../../components/icons';
import {RootStackParams} from '../../navigation';
import {useAuthStore, useThemeStore} from '../../store';
import {styles} from './styles';

interface Props extends StackScreenProps<RootStackParams, 'SplashScreen'> {}

export const SplashScreen: FC<Props> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {colors} = useThemeStore();

  const {checkStatus} = useAuthStore();

  useEffect(() => {
    const check = async () => {
      await checkStatus();
    };
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 2000);
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: colors.primary}]}>
      <Animated.View
        entering={FadeIn.duration(1000)}
        exiting={FadeOut}
        style={[styles.circle1, {backgroundColor: colors.primary900}]}
      />

      <View style={styles.containerLoader}>
        <Animated.View entering={FadeInUp.duration(1000)} exiting={FadeOut}>
          <WcWhiteIcon size={150} />
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
