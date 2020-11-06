import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default settingsScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Settings screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});