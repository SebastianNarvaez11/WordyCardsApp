import {StackScreenProps} from '@react-navigation/stack';
import {useQueryClient} from '@tanstack/react-query';
import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';

import {ScreenLayout} from '../../../../../common/presentation/components/templates';
import {MainStackParams} from '../../../../../common/presentation/navigation';
import {IRatingType} from '../../../infrastructure/interfaces';
import {Card} from '../../components';
import {useUpdateExercise} from '../../hooks';

interface Props extends StackScreenProps<MainStackParams, 'PracticeScreen'> {}

export const PracticeScreen: FC<Props> = ({route, navigation}) => {
  const activeIndex = useSharedValue(0);

  const [indexCard, setIndexCard] = useState(0);
  const [exercises, setExercises] = useState(route.params.exercises || []);

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
      <View style={styles.cardsContainer}>
        {exercises.map((item, index) => (
          <Card
            key={`${item.id} + ${index}`}
            {...item}
            currentRating={item.rating}
            numberOfCards={exercises.length}
            currentCardIndex={index}
            activeIndex={activeIndex}
            onResponse={onResponse}
          />
        ))}
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  cardsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
