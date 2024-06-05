import {FC, ReactNode} from 'react';
import {Platform, StyleSheet, View, ViewProps} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useThemeStore} from '../../store';
import {TopNavbarScreen} from './TopNavbarScreen';

interface Props extends ViewProps {
  children: React.ReactNode;
  canGoBack?: boolean;
  title?: string;
  topBarRightActions?: ReactNode;
  customTopBar?: ReactNode;
  backgroundColor?: string;
  noPadding?: boolean;
}

export const ScreenLayout: FC<Props> = ({
  children,
  canGoBack,
  title,
  topBarRightActions,
  customTopBar,
  backgroundColor,
  noPadding = false,
  ...props
}) => {
  const {top} = useSafeAreaInsets();
  const {colors} = useThemeStore();

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: backgroundColor || colors.backgroundSecondary},
        title || canGoBack || noPadding
          ? styles.noPadding
          : {
              paddingTop: Platform.OS === 'android' ? top + 10 : top,
            },
        props.style,
      ]}>
      {(title || canGoBack) && (
        <>
          {customTopBar ? (
            customTopBar
          ) : (
            <TopNavbarScreen
              title={title}
              rightActions={topBarRightActions}
              canGoBack={canGoBack}
            />
          )}
        </>
      )}

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noPadding: {paddingTop: 0},
});
