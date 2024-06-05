import React, {FC} from 'react';
import {ActivityIndicatorProps} from 'react-native';
import {ActivityIndicator} from 'react-native';

export const Spinner: FC<ActivityIndicatorProps> = props => {
  return <ActivityIndicator {...props} />;
};
