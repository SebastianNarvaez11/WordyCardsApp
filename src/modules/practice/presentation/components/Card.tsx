import React, {FC} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {Text} from '../../../../common/presentation/components/ui';

const screenWidth = Dimensions.get('screen').width;
const cardWidth = screenWidth * 0.8;

interface Props {
  color: string;
  numberOfCards: number;
  currentCardIndex: number;
  activeIndex: SharedValue<number>;
  onResponse: (value: boolean) => void;
}

export const Card: FC<Props> = ({
  color,
  numberOfCards,
  currentCardIndex,
  activeIndex,
  onResponse,
}) => {
  const translationX = useSharedValue(0);

  const animatedCard = useAnimatedStyle(() => ({
    opacity: interpolate(
      activeIndex.value,
      [currentCardIndex - 1, currentCardIndex, currentCardIndex + 1],
      [1 - 1 / 5, 1, 1],
    ),
    transform: [
      {
        scale: interpolate(
          activeIndex.value,
          [currentCardIndex - 1, currentCardIndex, currentCardIndex + 1],
          [0.95, 1, 1],
        ),
      },
      {
        translateY: interpolate(
          activeIndex.value,
          [currentCardIndex - 1, currentCardIndex, currentCardIndex + 1],
          [-30, 0, 0],
        ),
      },
      {
        translateX: translationX.value,
      },
      {
        rotateZ: `${interpolate(
          translationX.value,
          [-screenWidth / 2, 0, screenWidth / 2],
          [-15, 0, 15],
        )}deg`,
      },
    ],
  }));

  const gesture = Gesture.Pan()
    .onChange(event => {
      translationX.value = event.translationX;
      activeIndex.value = interpolate(
        Math.abs(translationX.value),
        [0, 800],
        [currentCardIndex, currentCardIndex + 0.8],
      );
    })
    .onEnd(event => {
      if (Math.abs(event.velocityX) > 400) {
        translationX.value = withSpring(Math.sign(event.velocityX) * 800, {
          velocity: event.velocityX,
        });
        activeIndex.value = withSpring(currentCardIndex + 1);
        runOnJS(onResponse)(event.velocityX > 0);
      } else {
        translationX.value = withSpring(0);
      }
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          styles.cardContainer,
          animatedCard,
          {
            zIndex: numberOfCards - currentCardIndex,
            backgroundColor: color,
          },
        ]}>
        <Text text="Word" />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    position: 'absolute',
    borderRadius: 20,
    width: cardWidth,
    aspectRatio: 1 / 1.67,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
});
