import React from 'react';
import {StyleSheet, View} from 'react-native';

import {WcWhiteIcon} from '../../../../common/presentation/components/icons';

export const LoginHeader = () => {
  return (
    <View style={styles.containerHeader}>
      <View style={styles.iconHeader}>
        <WcWhiteIcon size={100} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    padding: 20,
  },
  iconHeader: {
    alignSelf: 'center',
  },
});
