import {useRef} from 'react';
import {Animated, Easing} from 'react-native';

export const useAnimation = () => {
  const animatedOpacity = useRef(new Animated.Value(1)).current;
  const animatedTranslateY = useRef(new Animated.Value(0)).current;
  const animatedTranslateX = useRef(new Animated.Value(0)).current;

  const fadeIn = (duration = 300, toValue = 1, callback = () => {}) => {
    Animated.timing(animatedOpacity, {
      toValue: toValue,
      duration: duration,
      useNativeDriver: true,
    }).start(callback);
  };

  const fadeOut = (duration = 300, toValue = 0, callback = () => {}) => {
    Animated.timing(animatedOpacity, {
      toValue: toValue,
      duration: duration,
      useNativeDriver: true,
    }).start(callback);
  };

  const translateAnimatedY = (
    initialPosition = 0,
    toValue = 0,
    duration = 300,
    easing = Easing.linear,
    callback = () => {},
  ) => {
    animatedTranslateY.setValue(initialPosition);

    Animated.timing(animatedTranslateY, {
      toValue: toValue,
      duration: duration,
      useNativeDriver: true,
      easing: easing,
    }).start(callback);
  };

  const translateAnimatedX = (
    initialPosition = 0,
    toValue = 0,
    duration = 300,
    easing = Easing.linear,
    callback = () => {},
  ) => {
    animatedTranslateX.setValue(initialPosition);

    Animated.timing(animatedTranslateX, {
      toValue: toValue,
      duration: duration,
      useNativeDriver: true,
      easing: easing,
    }).start(callback);
  };

  const onMountTranslateYAnimation = (
    initialPosition = 500,
    toValue = 0,
    duration = 550,
    easing = Easing.elastic(0.8),
    callback = () => {},
  ) => {
    translateAnimatedY(initialPosition, toValue, duration, easing, callback);
  };

  const onMountTranslateXAnimation = (
    initialPosition = 500,
    toValue = 0,
    duration = 550,
    easing = Easing.elastic(0.8),
    callback = () => {},
  ) => {
    translateAnimatedX(initialPosition, toValue, duration, easing, callback);
  };

  return {
    // Properties
    animatedOpacity,
    animatedTranslateY,
    animatedTranslateX,

    // Methods
    fadeIn,
    fadeOut,
    translateAnimatedY,
    translateAnimatedX,
    onMountTranslateYAnimation,
    onMountTranslateXAnimation,
  };
};
