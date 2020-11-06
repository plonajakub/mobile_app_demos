import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import GameScreen from './screens/GameScreen';
import SettingsScreen from './screens/SettingsScreen';
import { Appbar } from 'react-native-paper';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Guess Number" />
      </Appbar.Header>
      <ViewPager style={styles.viewPager} initialPage={0}>
        <View style={styles.page} key="1">
          <GameScreen />
        </View>
        <View style={styles.page} key="2">
          <SettingsScreen />
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
