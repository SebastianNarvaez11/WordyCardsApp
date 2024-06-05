import React, {FC} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import IconIo from 'react-native-vector-icons/Ionicons';

import {Text} from '../../../../common/presentation/components/ui';
import {useThemeStore} from '../../../../common/presentation/store';

interface Props {
  title: string;
  iconName: string;
  iconColor: string;
  onPress: () => void;
}

export const GroupItemOption: FC<Props> = ({
  iconName,
  onPress,
  title,
  iconColor,
}) => {
  const {colors} = useThemeStore();

  return (
    <Pressable
      style={({pressed}) => [
        styles.optionContainer,
        {backgroundColor: colors.card, opacity: pressed ? 0.8 : 1},
      ]}
      onPress={onPress}>
      <IconIo name={iconName} size={23} color={iconColor} />
      <Text text={title} size={20} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
