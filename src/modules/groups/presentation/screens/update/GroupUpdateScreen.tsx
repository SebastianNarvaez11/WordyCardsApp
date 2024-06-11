import {StackScreenProps} from '@react-navigation/stack';
import {FC} from 'react';
import {StyleSheet, View} from 'react-native';

import {ScreenScrollLayout} from '../../../../../common/presentation/components/templates';
import {MainStackParams} from '../../../../../common/presentation/navigation';
import {CreateAndUpdateGroupForm} from '../../components';

interface Props
  extends StackScreenProps<MainStackParams, 'GroupUpdateScreen'> {}

export const GroupUpdateScreen: FC<Props> = ({route}) => {
  const {group} = route.params;

  return (
    <ScreenScrollLayout title="Modificar grupo" canGoBack>
      <View style={styles.container}>
        <CreateAndUpdateGroupForm group={group} isUpdate />
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
