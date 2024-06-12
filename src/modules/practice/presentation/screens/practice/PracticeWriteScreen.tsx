import {StackScreenProps} from '@react-navigation/stack';
import {useQueryClient} from '@tanstack/react-query';
import React, {FC, useEffect, useRef, useState} from 'react';
import {Dimensions, Pressable, StyleSheet, View} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import Explosion from 'react-native-confetti-cannon';
import IconIo from 'react-native-vector-icons/Ionicons';

import {TextField} from '../../../../../common/presentation/components/fields';
import {ScreenScrollLayout} from '../../../../../common/presentation/components/templates';
import {Button, Text} from '../../../../../common/presentation/components/ui';
import {MainStackParams} from '../../../../../common/presentation/navigation';
import {useThemeStore} from '../../../../../common/presentation/store';
import {isDuplicateExercise} from '../../../helpers';
import {Card} from '../../components';
import {useUpdateExercise} from '../../hooks';

interface Props
  extends StackScreenProps<MainStackParams, 'PracticeWriteScreen'> {}

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

export const PracticeWriteScreen: FC<Props> = ({route, navigation}) => {
  const {colors} = useThemeStore();
  const [exercises, setExercises] = useState(route.params.exercises || []);
  const [position, setPosition] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [showTranslation, setShowTranslation] = useState(false);

  const confettiRef = useRef<Explosion>(null);

  const queryClient = useQueryClient();
  const {mutate} = useUpdateExercise();

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({
        queryKey: ['group_detail', route.params.groupId],
      });
      queryClient.invalidateQueries({queryKey: ['groups', 'infinite']});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRateWords = (value: string) => {
    setInputValue(value);
    if (value === exercises[position].englishWord) {
      if (!isDuplicateExercise(exercises, exercises[position].id)) {
        const currentExercise = exercises[position];
        mutate({
          exerciseId: exercises[position].id,
          data: {
            rating:
              currentExercise.rating === 2 ? 2 : currentExercise.rating + 1,
          },
        });
      }
      confettiRef.current?.start();
      setPosition(position + 1);
      setShowTranslation(false);
      setInputValue('');
    }
  };

  const onShowTranslation = () => {
    if (!showTranslation) {
      setShowTranslation(true);
      const currentExercise = exercises[position];
      mutate({
        exerciseId: exercises[position].id,
        data: {
          rating: currentExercise.rating === 0 ? 0 : currentExercise.rating - 1,
        },
      });
      setExercises([...exercises, currentExercise]);
    }
  };

  return (
    <>
      <ScreenScrollLayout>
        <View style={styles.cardsContainer}>
          <Pressable onPress={() => navigation.goBack()}>
            <IconIo name="arrow-back" size={30} color={colors.primary} />
          </Pressable>

          {exercises.length !== position ? (
            <Card
              {...exercises[position]}
              cardHeight={screenHeight * 0.4}
              showTranslation={showTranslation}
              onPress={() => onShowTranslation()}
            />
          ) : (
            <View
              style={[
                styles.cardFinish,
                {
                  width: screenWidth * 0.8,
                  height: screenHeight * 0.4,
                  backgroundColor: colors.backgroundPrimary,
                },
              ]}>
              <Text
                text={'¡Genial, terminaste tu practica!'}
                align="center"
                font="Quicksand-Bold"
              />
            </View>
          )}

          {exercises.length !== position ? (
            <TextField
              autoFocus
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={false}
              label="Escribe la palabra"
              name="word"
              value={inputValue}
              onChangeText={e => onRateWords(e.toLocaleLowerCase())}
              placeholder="Ej: word"
              style={{backgroundColor: colors.backgroundPrimary}}
            />
          ) : (
            <Button label="Finalizar" onPress={() => navigation.goBack()} />
          )}
        </View>
      </ScreenScrollLayout>

      <ConfettiCannon
        count={30}
        origin={{x: 0, y: 0}}
        autoStart={false}
        ref={confettiRef}
        fadeOut
      />
    </>
  );
};

const styles = StyleSheet.create({
  cardsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 15,
  },
  cardFinish: {
    justifyContent: 'center',
    padding: 30,
    alignSelf: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
