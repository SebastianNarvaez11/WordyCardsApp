import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Skeleton} from '../../../../../common/presentation/components/ui/Skeleton';

export const GroupModalSkeleton = () => {
  return (
    <View>
      <View style={styles.title}>
        <Skeleton maxWidth={150} height={30} />
      </View>

      <View style={styles.containerRatings}>
        <View style={styles.rating}>
          <Skeleton style={styles.title} width={80} height={50} />
        </View>
        <View style={styles.rating}>
          <Skeleton style={styles.title} width={80} height={50} />
        </View>
        <View style={styles.rating}>
          <Skeleton style={styles.title} width={80} height={50} />
        </View>
      </View>

      <View style={styles.optionsContainer}>
        <Skeleton maxWidth={40} height={40} />
        <Skeleton maxWidth={40} height={40} />
        <Skeleton maxWidth={40} height={40} />
        <Skeleton maxWidth={40} height={40} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    marginTop: 10,
  },
  containerRatings: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  rating: {
    alignItems: 'center',
  },
  optionsContainer: {
    marginTop: 20,
    gap: 10,
  },
  separator: {
    height: 1,
    marginVertical: 5,
  },
});
