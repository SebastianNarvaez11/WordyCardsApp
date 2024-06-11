import {StyleSheet, View} from 'react-native';

import {ScreenScrollLayout} from '../../../../../common/presentation/components/templates';
import {CreateAndUpdateGroupForm} from '../../components';

export const GroupCreateScreen = () => {
  return (
    <ScreenScrollLayout title="Nuevo grupo" canGoBack>
      <View style={styles.container}>
        <CreateAndUpdateGroupForm />
      </View>
    </ScreenScrollLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
