import React from 'react';
import { View } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import GameScreen from './screens/GameScreen';
import SettingsScreen from './screens/SettingsScreen';
import { Appbar } from 'react-native-paper';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <View style={{ flex: 1 }}>
        <StatusBar style="light" backgroundColor={theme.colors.primaryDark} />
        <Appbar.Header>
          <Appbar.Content title="Guess Number" />
        </Appbar.Header>
        <ViewPager style={{ flex: 1 }} initialPage={0}>
          <View key="1">
            <GameScreen />
          </View>
          <View key="2">
            <SettingsScreen />
          </View>
        </ViewPager>
      </View>
    </PaperProvider>
  );
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ff8b80',
    primaryDark: '#c85b53',
    accent: '#80f4ff',
    accentDark: '#46c1cc',
    background: '#ffffff',
  },
};
