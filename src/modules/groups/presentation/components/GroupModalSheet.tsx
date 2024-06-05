import BottomSheet from '@gorhom/bottom-sheet';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {FC, RefObject, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import IconIo from 'react-native-vector-icons/Ionicons';

import {
  BottomSheetModal,
  ProgressBar,
  Text,
} from '../../../../common/presentation/components/ui';
import {MainStackParams} from '../../../../common/presentation/navigation';
import {useThemeStore} from '../../../../common/presentation/store';
import {useGetServiceDetail} from '../hooks';
import {GroupItemOption} from './GroupItemOption';
import {GroupModalSkeleton} from './skeleton';

interface Props {
  groupId: string | null;
  bottomSheetRef: RefObject<BottomSheet>;
  children?: React.ReactNode;
  onClose?: () => void;
}

export const GroupModalSheet: FC<Props> = ({
  bottomSheetRef,
  groupId,
  onClose,
}) => {
  const {colors} = useThemeStore();
  const navigation = useNavigation<NavigationProp<MainStackParams>>();
  const groupSnapPoints = useMemo(() => ['70%'], []);

  const {data, isLoading} = useGetServiceDetail(groupId);

  const progress = useMemo(
    () =>
      ((data?.countEasy || 0) /
        ((data?.countEasy || 0) +
          (data?.countMedium || 0) +
          (data?.countHard || 0))) *
      100,
    [data],
  );

  return (
    <BottomSheetModal
      bottomSheetRef={bottomSheetRef}
      snapPoints={groupSnapPoints}
      onClose={() => onClose && onClose()}>
      {isLoading || !data ? (
        <GroupModalSkeleton />
      ) : (
        <>
          <View style={styles.title}>
            <Text size={25} font="Quicksand-Bold" text={data.name} />
          </View>

          <View style={styles.containerRatings}>
            <View style={styles.rating}>
              <IconIo
                name="checkmark-circle"
                size={25}
                color={colors.success}
              />
              <Text
                size={14}
                text={`${data.countEasy} Aprendidas`}
                color={colors.gray}
              />
            </View>
            <View style={styles.rating}>
              <IconIo name="time" size={25} color={colors.info} />
              <Text
                size={14}
                text={`${data.countMedium} En proceso`}
                color={colors.gray}
              />
            </View>
            <View style={styles.rating}>
              <IconIo name="close-circle" size={25} color={colors.danger} />
              <Text
                size={14}
                text={`${data.countHard} Difíciles`}
                color={colors.gray}
              />
            </View>
          </View>

          <View style={styles.containerProgressBar}>
            <Text size={14} text="Tu progreso" font="Quicksand-SemiBold" />
            <ProgressBar progress={progress} />
            <Text
              width={'100%'}
              size={13}
              font="Quicksand-SemiBold"
              text={`${progress.toFixed(0)}%`}
              style={{
                marginLeft:
                  progress >= 95 ? `${progress - 6}%` : `${progress}%`,
              }}
            />
          </View>

          <View style={styles.optionsContainer}>
            <GroupItemOption
              iconColor={colors.success}
              iconName="rocket"
              onPress={() =>
                navigation.navigate('PracticeScreen', {
                  groupId: groupId || '',
                  exercises: data.exercises,
                })
              }
              title="Practicar"
            />

            <View
              style={[styles.separator, {backgroundColor: colors.gray50}]}
            />

            <GroupItemOption
              iconColor={colors.warning}
              iconName="options"
              onPress={() => {}}
              title="Modificar grupo"
            />
            <GroupItemOption
              iconColor={colors.danger}
              iconName="trash"
              onPress={() => {}}
              title="Eliminar grupo"
            />
          </View>
        </>
      )}
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 10,
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
  containerProgressBar: {
    marginTop: 15,
    gap: 5,
  },
});
