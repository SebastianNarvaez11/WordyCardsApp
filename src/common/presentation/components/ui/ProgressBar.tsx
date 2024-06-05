import {FC} from 'react';
import {StyleSheet} from 'react-native';
import {
  ProgressBarProps,
  ProgressBar as RNUProgressBar,
} from 'react-native-ui-lib';

import {useThemeStore} from '../../store';

interface Props extends ProgressBarProps {}

export const ProgressBar: FC<Props> = ({...props}) => {
  const {colors} = useThemeStore();
  return (
    <RNUProgressBar
      progressColor={colors.success}
      style={styles.bar}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  bar: {
    height: 12,
  },
});
