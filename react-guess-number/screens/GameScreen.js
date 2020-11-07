import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

export default settingsScreen = () => {
    const [input, setInput] = useState("");
    return (
        <View style={styles.rootContainer}>

            <View style={styles.arrowRightOuterContainer}>
                <View style={styles.arrowRightInnerContainer}>
                    <MaterialIcons style={styles.arrowRight} name="keyboard-arrow-right" size={32} color="black" />
                </View>
            </View>

            <Text style={styles.gameState}>Game not started</Text>

            <Text style={styles.gameFeedback}>Make a guess!</Text>

            <TextInput style={styles.userInput}
                value={input}
                onChangeText={input => setInput(input)}
            />

            <View style={styles.buttonContainer}>
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
    rootContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 20,
    },
    gameState: {
        fontSize: 34,
        marginTop: 30,
        padding: 10,
        textAlign: 'center'
    },
    gameFeedback: {
        fontSize: 21,
        marginTop: 90,
        padding: 10,
        textAlign: 'center'
    },
    userInput: {
        width: 150,
        height: 40,
        marginTop: 90,
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop: 70,
    },
    button: {
        marginTop: 10,
        alignSelf: 'center',
    },
    arrowRightOuterContainer: {
        flexDirection: 'row',
    },
    arrowRightInnerContainer: {
        flex: 1,
    },
    arrowRight: {
        alignSelf: 'flex-end',
        marginRight: 8,
    }
});