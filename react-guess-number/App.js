import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import GameScreen from './screens/GameScreen';
import SettingsScreen from './screens/SettingsScreen';
import { Appbar } from 'react-native-paper';
import GameMaster from './logic/GameMaster';

export default function App() {
  const gameMasterRef = useRef(new GameMaster(GameMaster.defaultGuessRighLimit, GameMaster.defaultGuessesToFail));
  return (
    <View style={{ flex: 1 }}>
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
