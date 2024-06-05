import React, {FC} from 'react';
import {useWindowDimensions} from 'react-native';
import {SkeletonView, SkeletonViewProps} from 'react-native-ui-lib';

import {useThemeStore} from '../../store';

interface Props extends SkeletonViewProps {
  maxWidth?: number;
  height?: number;
}

export const Skeleton: FC<Props> = ({...props}) => {
  const {colors} = useThemeStore();
  const {width} = useWindowDimensions();

  return (
    <SkeletonView
      height={props.height}
      width={
        props.width
          ? props.width
          : props.maxWidth
          ? width - props.maxWidth
          : width
      }
      borderRadius={10}
      colors={[colors.skeleton1, colors.skeleton2, colors.skeleton3]}
      times={1}
    />
  );
};
