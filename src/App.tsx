/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';

import {RootStackNavigator} from './common/presentation/navigation';
import {ThemeProvider} from './common/presentation/providers';
import {useThemeStore} from './common/presentation/store/useThemeStore';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  const {currentTheme} = useThemeStore();

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer
        theme={currentTheme === 'light' ? DefaultTheme : DarkTheme}>
        {/* <AuthProvider> */}
        <ThemeProvider>
          <RootStackNavigator />
        </ThemeProvider>
        {/* </AuthProvider> */}
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
