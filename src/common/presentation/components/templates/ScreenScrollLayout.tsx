import React, {FC, ReactNode} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  ViewProps,
} from 'react-native';

import {useThemeStore} from '../../store/useThemeStore';
import {ScreenLayout} from './ScreenLayout';

interface Props extends ViewProps {
  children: React.ReactNode;
  canGoBack?: boolean;
  title?: string;
  topBarRightActions?: ReactNode;
  customTopBar?: ReactNode;
  backgroundColor?: string;
}

export const ScreenScrollLayout: FC<Props> = ({
  children,
  canGoBack,
  title,
  topBarRightActions,
  customTopBar,
  backgroundColor,
}) => {
  const {colors} = useThemeStore();
  return (
    <KeyboardAvoidingView
      style={[style.keyboardView]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[
          style.scrollView,
          {backgroundColor: backgroundColor || colors.backgroundSecondary},
        ]}>
        <ScreenLayout
          canGoBack={canGoBack}
          title={title}
          topBarRightActions={topBarRightActions}
          customTopBar={customTopBar}
          backgroundColor={backgroundColor}>
          {children}
        </ScreenLayout>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});
