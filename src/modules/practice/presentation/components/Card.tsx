import React, {FC} from 'react';
import {Dimensions, Pressable, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Text as CustomText} from '../../../../common/presentation/components/ui';
import {useThemeStore} from '../../../../common/presentation/store';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

interface Props {
  id: string;
  englishWord: string;
  spanishTranslation: string;
  image: string | null;
  cardWidth?: number;
  cardHeight?: number;
  showTranslation?: boolean;
  onPress?: () => void;
}

export const Card: FC<Props> = ({
  // id,
  englishWord,
  spanishTranslation,
  image,
  cardWidth = screenWidth * 0.8,
  cardHeight = screenHeight * 0.8,
  showTranslation = false,
  onPress,
}) => {
  const {colors} = useThemeStore();

  return (
    <View
      style={[
        styles.cardContainer,
        {
          backgroundColor: colors.backgroundPrimary,
          width: cardWidth,
          height: cardHeight,
        },
      ]}>
      <Pressable
        style={[styles.pressableCard, !image && styles.pressableCardNotImage]}
        onPress={() => onPress && onPress()}>
        <>
          {image && (
            <FastImage
              style={[
                styles.image,
                {
                  height: cardHeight * 0.8,
                },
              ]}
              source={{
                uri: image,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          )}
          <>
            {!showTranslation ? (
              <CustomText
                text={spanishTranslation}
                align="center"
                style={styles.textTranslation}
              />
            ) : (
              <CustomText
                text={englishWord}
                align="center"
                style={styles.textTranslation}
              />
            )}
          </>
        </>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
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
  pressableCard: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
  },
  pressableCardNotImage: {
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    borderRadius: 10,
  },
  textTranslation: {marginTop: 10},
});
