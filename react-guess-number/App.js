import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import GameScreen from './screens/GameScreen';
import SettingsScreen from './screens/SettingsScreen';
import { Appbar } from 'react-native-paper';
import GameMaster from './logic/GameMaster';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const gameMasterRef = useRef(new GameMaster(GameMaster.defaultGuessRighLimit, GameMaster.defaultGuessesToFail));
  return (
    <PaperProvider theme={theme}>
      <View style={{ flex: 1 }}>
        <StatusBar style="light" backgroundColor={theme.colors.primaryDark} />
        <Appbar.Header>
          <Appbar.Content title="Guess Number" />
        </Appbar.Header>
        <ViewPager style={styles.viewPager} initialPage={0}>
          <View style={styles.page} key="1">
            <GameScreen gameMasterRef={gameMasterRef} />
          </View>
          <View style={styles.page} key="2">
            <SettingsScreen gameMasterRef={gameMasterRef} />
          </View>
        </ViewPager>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

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
