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
import {AuthProvider, ThemeProvider} from './common/presentation/providers';
import {useThemeStore} from './common/presentation/store';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  const {currentTheme} = useThemeStore();

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer
        theme={currentTheme === 'light' ? DefaultTheme : DarkTheme}>
        <ThemeProvider>
          <AuthProvider>
            <RootStackNavigator />
          </AuthProvider>
        </ThemeProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
