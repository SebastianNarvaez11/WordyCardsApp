import React, {FC, useState} from 'react';
import {Dimensions, Pressable, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {Text as CustomText} from '../../../../common/presentation/components/ui';
import {useThemeStore} from '../../../../common/presentation/store';
import {IRatingType} from '../../infrastructure/interfaces';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const cardWidth = screenWidth * 0.8;
const cardHeight = screenHeight * 0.8;

interface Props {
  id: string;
  currentRating: number;
  englishWord: string;
  spanishTranslation: string;
  image: string | null;
  numberOfCards: number;
  currentCardIndex: number;
  activeIndex: SharedValue<number>;
  onResponse: (value: IRatingType, id: string, rating: number) => void;
}

export const Card: FC<Props> = ({
  id,
  currentRating,
  englishWord,
  spanishTranslation,
  image,
  numberOfCards,
  currentCardIndex,
  activeIndex,
  onResponse,
}) => {
  const {colors} = useThemeStore();
  const [showTranslation, setShowTranslation] = useState(false);

  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const opacityRatingMedium = useSharedValue(0);
  const opacityRatingEasy = useSharedValue(0);
  const opacityRatingHard = useSharedValue(0);
  const onPressCard = useSharedValue(0);

  const animatedCard = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          activeIndex.value,
          [currentCardIndex - 1, currentCardIndex, currentCardIndex + 1],
          [0.95, 1, 1],
        ),
      },
      {
        translateY: translationY.value,
      },
      {
        translateX: translationX.value,
      },
      {
        rotateZ:
          translationY.value < -100
            ? '0deg'
            : `${interpolate(
                translationX.value,
                [-screenWidth / 2, 0, screenWidth / 2],
                [-15, 0, 15],
              )}deg`,
      },
      {
        rotateY: `${interpolate(
          onPressCard.value,
          [-cardWidth / 2, 0, cardWidth / 2],
          [-150, 0, 150],
        )}deg`,
      },
    ],
  }));

  const animatedRatingMedium = useAnimatedStyle(() => ({
    opacity: opacityRatingMedium.value,
  }));

  const animatedRatingEasy = useAnimatedStyle(() => ({
    opacity: opacityRatingEasy.value,
  }));

  const animatedRatingHard = useAnimatedStyle(() => ({
    opacity: opacityRatingHard.value,
  }));

  const gesture = Gesture.Pan()
    .onChange(event => {
      translationX.value = event.translationX;
      activeIndex.value = interpolate(
        Math.abs(translationX.value),
        [0, screenHeight],
        [currentCardIndex, currentCardIndex + 0.8],
      );

      translationY.value = event.translationY;
      activeIndex.value = interpolate(
        Math.abs(translationY.value),
        [0, 1000],
        [currentCardIndex, currentCardIndex + 0.8],
      );

      if (
        event.translationY < -cardHeight * 0.2 &&
        Math.abs(event.translationX) > cardWidth / 2
      ) {
        translationY.value = withSpring(0);
        translationX.value = withSpring(0);
        opacityRatingMedium.value = 0;
        opacityRatingEasy.value = 0;
        opacityRatingHard.value = 0;
        return;
      }

      // Manejar la opacidad de la calificación media
      opacityRatingMedium.value = interpolate(
        translationY.value,
        [-90, -cardHeight / 2],
        [0, 1],
      );

      // Manejar la opacidad de la calificación fácil
      if (translationY.value > -100) {
        opacityRatingEasy.value = interpolate(
          translationX.value,
          [-100, -cardWidth / 2],
          [0, 1],
        );
      } else {
        return (opacityRatingEasy.value = 0);
      }

      // Manejar la opacidad de la calificación difícil
      if (translationY.value > -95) {
        opacityRatingHard.value = interpolate(
          translationX.value,
          [100, cardWidth / 2],
          [0, 1],
        );
      } else {
        return (opacityRatingHard.value = 0);
      }
    })
    .onEnd(event => {
      if (
        event.translationY > 50 ||
        (translationY.value < -cardWidth &&
          Math.abs(translationX.value) > cardWidth * 0.2)
      ) {
        translationY.value = withSpring(0);
        translationX.value = withSpring(0);
        opacityRatingMedium.value = 0;
        opacityRatingEasy.value = 0;
        opacityRatingHard.value = 0;
        return;
      }

      if (
        Math.abs(event.velocityX) > 400 &&
        translationY.value > -cardHeight * 0.1
      ) {
        translationX.value = withSpring(
          Math.sign(event.velocityX) * screenHeight,
          {
            velocity: event.velocityX,
          },
        );
        runOnJS(onResponse)(
          event.velocityX > 0 ? 'hard' : 'easy',
          id,
          currentRating,
        );
        opacityRatingMedium.value = 0;

        return (activeIndex.value = withSpring(currentCardIndex + 1));
      }

      if (Math.abs(event.velocityY) > 400) {
        translationY.value = withSpring(
          Math.sign(event.velocityY) * screenHeight,
          {
            velocity: event.velocityY,
          },
        );
        runOnJS(onResponse)('medium', id, currentRating);
        opacityRatingEasy.value = 0;
        opacityRatingHard.value = 0;
        return (activeIndex.value = withSpring(currentCardIndex + 1));
      }

      translationX.value = withSpring(0);
      translationY.value = withSpring(0);
      opacityRatingMedium.value = 0;
      opacityRatingEasy.value = 0;
      opacityRatingHard.value = 0;
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          styles.cardContainer,
          animatedCard,
          {
            zIndex: numberOfCards - currentCardIndex,
            backgroundColor: colors.backgroundPrimary,
          },
        ]}>
        <Pressable
          style={[styles.pressableCard, !image && styles.pressableCardNotImage]}
          onPress={() => setShowTranslation(!showTranslation)}>
          <>
            {currentCardIndex === Math.floor(activeIndex.value) && (
              <>
                {image && (
                  <FastImage
                    style={styles.image}
                    source={{
                      uri: image,
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                )}
                <>
                  {!showTranslation ? (
                    <CustomText text={englishWord} align="center" />
                  ) : (
                    <CustomText text={spanishTranslation} align="center" />
                  )}
                </>
              </>
            )}

            {currentCardIndex === Math.floor(activeIndex.value) && (
              <Animated.View
                style={[
                  styles.containerRatingMessage,
                  animatedRatingMedium,
                  {borderColor: colors.info},
                ]}>
                <CustomText
                  color={colors.info}
                  size={50}
                  font="Quicksand-Bold"
                  text="Medio"
                />
              </Animated.View>
            )}

            {currentCardIndex === Math.floor(activeIndex.value) && (
              <Animated.View
                style={[
                  styles.containerRatingMessage,
                  animatedRatingEasy,
                  {borderColor: colors.success},
                ]}>
                <CustomText
                  color={colors.success}
                  size={50}
                  font="Quicksand-Bold"
                  text="Fácil"
                />
              </Animated.View>
            )}

            {currentCardIndex === Math.floor(activeIndex.value) && (
              <Animated.View
                style={[
                  styles.containerRatingMessage,
                  animatedRatingHard,
                  {borderColor: colors.danger},
                ]}>
                <CustomText
                  color={colors.danger}
                  size={50}
                  font="Quicksand-Bold"
                  text="Difícil"
                />
              </Animated.View>
            )}
          </>
        </Pressable>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    position: 'absolute',
    borderRadius: 20,
    width: cardWidth,
    aspectRatio: 1 / 1.67,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pressableCard: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
  },
  pressableCardNotImage: {
    justifyContent: 'center',
  },
  ratingMessage: {
    fontSize: 50,
  },
  image: {
    height: cardHeight / 2,
    width: '100%',
  },
  containerRatingMessage: {
    position: 'absolute',
    alignSelf: 'center',
    top: cardHeight * 0.4,
    borderWidth: 5,
    borderStyle: 'dotted',
    padding: 10,
    transform: [{rotate: '15deg'}],
  },
});
