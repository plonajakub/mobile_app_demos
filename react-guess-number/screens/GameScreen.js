import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

export default settingsScreen = () => {
    const [input, setInput] = useState("");
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.gameState}>Game not started</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.gameFeedback}>Make a guess!</Text>
            </View>
            <View style={styles.textContainer}>
                <TextInput style={styles.userInput}
                    value={input}
                    onChangeText={input => setInput(input)}
                />
            </View>

            <View style={styles.textContainer}>
                <View style={styles.button}>
                    <Button mode="contained" onPress={() => console.log(`Checked input: ${input}`)}>
                        Check
                </Button>
                </View>
                <View style={styles.button}>
                    <Button mode="contained" onPress={() => console.log('New game started!')}>
                        New game
                </Button>
                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-around',
        marginTop: 20,
        marginBottom: 20
    },
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    gameState: {
        width: 290,
        fontSize: 34,
        marginTop: 0,
        padding: 10,
        backgroundColor: 'yellow', // TODO delete
        textAlign: 'center'
    },
    gameFeedback: {
        width: 180,
        fontSize: 21,
        marginTop: 40,
        padding: 10,
        backgroundColor: 'yellow', // TODO delete
        textAlign: 'center'
    },
    userInput: {
        width: 150,
        height: 40,
        margin: 20,
        textAlign: 'center'
    },
    button: {
        marginTop: 10
    }
});