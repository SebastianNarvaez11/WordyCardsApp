import React, {FC, useMemo} from 'react';
import {Pressable, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import IconIo from 'react-native-vector-icons/Ionicons';

import {Text} from '../../../../common/presentation/components/ui';
import {useThemeStore} from '../../../../common/presentation/store';

interface Props {
  id: string | number;
  name: string;
  countExercises: number;
  countEasy: number;
  iconName: string;
  onPress: (id: string | number) => void;
  style?: StyleProp<ViewStyle>;
}
export const GroupItem: FC<Props> = ({
  id,
  name,
  countExercises,
  countEasy,
  iconName = 'home',
  onPress,
  style,
}) => {
  const {colors} = useThemeStore();

  const progress = useMemo(
    () => (countEasy / countExercises) * 100,
    [countEasy, countExercises],
  );

  return (
    <Pressable
      style={({pressed}) => [
        styles.groupContainer,
        {
          backgroundColor: colors.card,
          opacity: pressed ? 0.8 : 1,
        },
        style,
      ]}
      onPress={() => onPress && onPress(id)}>
      <View>
        <Text text={name} size={20} font="Quicksand-Bold" />
        <Text
          text={
            countExercises +
            ' ' +
            (countExercises === 1 ? 'Palabra' : 'Palabras')
          }
          size={15}
          color={colors.gray}
        />
      </View>

      <View style={styles.footerOptions}>
        <AnimatedCircularProgress
          size={60}
          width={8}
          fill={progress}
          tintColor={colors.success}
          backgroundColor={colors.gray50}
        />
        <IconIo
          name={iconName}
          size={40}
          color={colors.primary200}
          style={styles.icon}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  groupContainer: {
    minHeight: 190,
    gap: 10,
    width: '94%',
    marginLeft: '3%',
    borderRadius: 20,
    padding: 20,
    marginBottom: '6%',
    justifyContent: 'space-between',
  },
  footerOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    alignSelf: 'flex-end',
  },
});
