import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import {FC, RefObject, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {SharedValue} from 'react-native-reanimated';

import {useThemeStore} from '../../store';

interface Props {
  children?: React.ReactNode;
  bottomSheetRef: RefObject<BottomSheet>;
  snapPoints?:
    | (string | number)[]
    | SharedValue<(string | number)[]>
    | Readonly<(string | number)[] | SharedValue<(string | number)[]>>
    | undefined;
  onClose?: () => void;
}

export const BottomSheetModal: FC<Props> = ({
  bottomSheetRef,
  snapPoints,
  children,
  onClose,
}) => {
  const {colors} = useThemeStore();

  const renderBackdrop = useCallback(
    (props_: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props_}
        pressBehavior="close"
        opacity={1}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  return (
    <BottomSheet
      backgroundStyle={{backgroundColor: colors.backgroundSecondary}}
      style={styles.modal}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      index={-1}
      onClose={() => onClose && onClose()}
      backdropComponent={renderBackdrop}>
      <View style={styles.contentContainer}>{children}</View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  modal: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 12,
    // },
    // shadowOpacity: 0.58,
    // shadowRadius: 16.0,
    // elevation: 24,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
