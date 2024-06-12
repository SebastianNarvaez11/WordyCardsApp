import {StackScreenProps} from '@react-navigation/stack';
import {useQueryClient} from '@tanstack/react-query';
import React, {FC, useEffect, useRef, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import Explosion from 'react-native-confetti-cannon';
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';
import IconIo from 'react-native-vector-icons/Ionicons';

import {ScreenLayout} from '../../../../../common/presentation/components/templates';
import {MainStackParams} from '../../../../../common/presentation/navigation';
import {useThemeStore} from '../../../../../common/presentation/store';
import {IRatingType} from '../../../infrastructure/interfaces';
import {AnimatedCard} from '../../components';
import {useUpdateExercise} from '../../hooks';

interface Props
  extends StackScreenProps<MainStackParams, 'PracticeCardScreen'> {}

export const PracticeCardScreen: FC<Props> = ({route, navigation}) => {
  const {colors} = useThemeStore();
  const activeIndex = useSharedValue(0);

  const [indexCard, setIndexCard] = useState(0);
  const [exercises, setExercises] = useState(route.params.exercises || []);

  const confettiRef = useRef<Explosion>(null);

  const queryClient = useQueryClient();
  const {mutate} = useUpdateExercise();

  useAnimatedReaction(
    () => activeIndex.value,
    value => {
      if (Math.floor(value) !== indexCard) {
        runOnJS(setIndexCard)(Math.floor(value));
      }
    },
  );

  const onResponse = (
    value: IRatingType,
    id: string,
    currentRating: number,
  ) => {
    if (value === 'easy') {
      if (exercises.filter(item => item.id === id).length === 1) {
        confettiRef.current?.start();
        mutate({
          exerciseId: id,
          data: {rating: currentRating === 2 ? 2 : currentRating + 1},
        });
      }
    }

    if (value === 'medium') {
      if (exercises.filter(item => item.id === id).length === 1) {
        mutate({
          exerciseId: id,
          data: {
            rating: currentRating === 2 ? currentRating - 1 : currentRating,
          },
        });
      }
    }

    if (value === 'hard') {
      if (exercises.filter(item => item.id === id).length === 1) {
        setExercises([...exercises, exercises.find(item => item.id === id)!]);

        mutate({
          exerciseId: id,
          data: {rating: 0},
        });
      }
    }

    if (indexCard === exercises.length - 1) {
      navigation.goBack();
    }
  };

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({
        queryKey: ['group_detail', route.params.groupId],
      });
      queryClient.invalidateQueries({queryKey: ['groups', 'infinite']});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScreenLayout>
      <Pressable onPress={() => navigation.goBack()} style={styles.back}>
        <IconIo name="arrow-back" size={30} color={colors.primary} />
      </Pressable>

      <View style={styles.cardsContainer}>
        {exercises.map((item, index) => (
          <AnimatedCard
            key={`${item.id} + ${index}`}
            {...item}
            currentRating={item.rating}
            numberOfCards={exercises.length}
            currentCardIndex={index}
            activeIndex={activeIndex}
            aspectRatio={1 / 1.67}
            onResponse={onResponse}
          />
        ))}
      </View>

      <ConfettiCannon
        count={30}
        origin={{x: 0, y: 0}}
        autoStart={false}
        ref={confettiRef}
        fadeOut
      />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  cardsContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  back: {marginLeft: 20},
});
