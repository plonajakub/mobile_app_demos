import React, { useState } from 'react';
import { StyleSheet, Text, View, ToastAndroid } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import GameMaster from '../logic/GameMaster';

export default settingsScreen = (props) => {
    const defaultGameFeedback = "Make a guess!";
    const [input, setInput] = useState("");
    const [gameStateText, setGameStateText] = useState(GameMaster.decodeGameState(GameMaster.GameState.NotStarted));
    const [gameFeedbackText, setGameFeedbackText] = useState(defaultGameFeedback);
    const makeGuessCallback = () => {
        const gameMaster = props.gameMasterRef.current;
        if (!/^\d+$/.test(input)) {
            ToastAndroid.show('You can input non-negative integers only!', ToastAndroid.SHORT);
            return;
        }
        const inputAsInt = parseInt(input);

        const gameAnswerAsString = GameMaster.decodeGameAnswer(gameMaster.makeGuess(inputAsInt));
        setGameFeedbackText(gameAnswerAsString);
        const gameStateAsString = GameMaster.decodeGameState(gameMaster.gameState);
        setGameStateText(gameStateAsString);
    };
    const newGameCallback = () => {
        const oldGameMaster = props.gameMasterRef.current;
        props.gameMasterRef.current = new GameMaster(oldGameMaster.guessRightLimit, oldGameMaster.maxGuesses);
        console.log(`New game created with params guessRightLimit = ${oldGameMaster.guessRightLimit}, maxGuesses = ${oldGameMaster.maxGuesses}`);
        const newGameMaster = props.gameMasterRef.current;
        setGameFeedbackText(defaultGameFeedback);
        const gameStateAsString = GameMaster.decodeGameState(newGameMaster.gameState);
        setGameStateText(gameStateAsString);
    };
    return (
        <View style={styles.rootContainer}>

            <View style={styles.arrowRightOuterContainer}>
                <View style={styles.arrowRightInnerContainer}>
                    <MaterialIcons style={styles.arrowRight} name="keyboard-arrow-right" size={32} color="black" />
                </View>
            </View>

            <Text style={styles.gameState}>{gameStateText}</Text>

            <Text style={styles.gameFeedback}>{gameFeedbackText}</Text>

            <TextInput style={styles.userInput}
                value={input}
                keyboardType='numeric'
                onChangeText={input => setInput(input)}
            />

            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button mode="contained" onPress={makeGuessCallback}>
                        Check
                </Button>
                </View>
                <View style={styles.button}>
                    <Button mode="contained" onPress={newGameCallback}>
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