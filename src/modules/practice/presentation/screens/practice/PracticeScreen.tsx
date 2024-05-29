import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';

import {ScreenLayout} from '../../../../../common/presentation/components/templates';
import {Button, Text} from '../../../../../common/presentation/components/ui';
import {useThemeStore} from '../../../../../common/presentation/store';
import {Card} from '../../components';

export const PracticeScreen = () => {
  const {colors} = useThemeStore();
  const wordsData = [
    {
      color: colors.green,
    },
    {
      color: colors.danger,
    },
    {
      color: colors.warning,
    },
    {
      color: colors.primary,
    },
  ];

  const activeIndex = useSharedValue(0);

  const [indexCard, setIndexCard] = useState(0);
  const [words, setWords] = useState(wordsData);

  useAnimatedReaction(
    () => activeIndex.value,
    value => {
      if (Math.floor(value) !== indexCard) {
        runOnJS(setIndexCard)(Math.floor(value));
      }
    },
  );

  useEffect(() => {
    if (indexCard > words.length - 3) {
      setWords(prevWords => [...prevWords, ...wordsData.reverse()]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexCard]);

  const onResponse = (value: boolean) => {
    console.log(value);
  };

  return (
    <ScreenLayout>
      <Text text={'Tarjeta actual:' + indexCard} size={20} />

      <View style={styles.cardsContainer}>
        {words.map((item, index) => (
          <Card
            key={`${item.color} + ${index}`}
            {...item}
            numberOfCards={words.length}
            currentCardIndex={index}
            activeIndex={activeIndex}
            onResponse={onResponse}
          />
        ))}
      </View>

      <Button
        label="Si"
        onPress={() => (activeIndex.value = activeIndex.value + 1)}
      />
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
