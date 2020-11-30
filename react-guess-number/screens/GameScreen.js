import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ToastAndroid, KeyboardAvoidingView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import GameMaster from '../logic/GameMaster';
import * as SecureStore from 'expo-secure-store';
import ConstStrings from '../shared/strings';

export default settingsScreen = () => {
    const defaultGameFeedback = "Make a guess!";
    const [gameMaster, setGameMaster] = useState(new GameMaster(GameMaster.defaultGuessRighLimit, GameMaster.defaultGuessesToFail));
    const [input, setInput] = useState("");
    const [gameStateText, setGameStateText] = useState(GameMaster.decodeGameState(GameMaster.GameState.Started));
    const [gameFeedbackText, setGameFeedbackText] = useState(defaultGameFeedback);
    const [maxRollHint, setMaxRollHint] = useState(GameMaster.defaultGuessRighLimit);
    useEffect(() => {
        async function fetchData() {
            const loadedMaxRollHint = await SecureStore.getItemAsync(ConstStrings.MAX_ROLL);
            if (loadedMaxRollHint !== null) {
                setMaxRollHint(parseInt(loadedMaxRollHint));
                console.log(`${ConstStrings.MAX_ROLL} [hint] initialized: ${loadedMaxRollHint}`);
            } else {
                console.log(`${ConstStrings.MAX_ROLL} [hint] does not exist, used default: ${GameMaster.defaultGuessRighLimit}`);
            }
        }
        fetchData();
    }, []);
    const makeGuessCallback = () => {
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
    const newGameCallback = async () => {
        let loadedMaxRoll = await SecureStore.getItemAsync(ConstStrings.MAX_ROLL);
        if (loadedMaxRoll === null) {
            loadedMaxRoll = GameMaster.defaultGuessRighLimit;
        }
        setMaxRollHint(loadedMaxRoll);
        let loadedMaxGuesses = await SecureStore.getItemAsync(ConstStrings.MAX_GUESSES);
        if (loadedMaxGuesses === null) {
            loadedMaxGuesses = GameMaster.defaultGuessesToFail;
        }
        setGameMaster(new GameMaster(loadedMaxRoll, loadedMaxGuesses));
        console.log(`New game created with params guessRightLimit = ${loadedMaxRoll}, maxGuesses = ${loadedMaxGuesses}`);
        setGameFeedbackText(defaultGameFeedback);
        const gameStateAsString = GameMaster.decodeGameState(GameMaster.GameState.Started);
        setGameStateText(gameStateAsString);
    };
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "padding"}
            style={{ flex: 1 }}
        >
            <View style={styles.rootContainer}>
                <View style={styles.arrowRightOuterContainer}>
                    <View style={styles.arrowRightInnerContainer}>
                        <MaterialIcons name="settings" size={24} color="black" />
                        <MaterialIcons name="keyboard-arrow-right" size={32} color="black" />
                    </View>
                </View>
                <Text style={styles.gameState}>{gameStateText}</Text>
                <Text style={styles.gameFeedback}>{gameFeedbackText}</Text>
                <View style={styles.userInputContainer}>
                    <TextInput
                        style={styles.userInput}
                        value={input}
                        keyboardType='numeric'
                        onChangeText={input => setInput(input)}
                        placeholder={`Range: 0 - ${maxRollHint}`}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button mode="contained" onPress={makeGuessCallback}>
                            Check
                        </Button>
                    </View>
                    <View style={styles.button}>
                        <Button mode="contained" onPress={newGameCallback}>
                            Restart
                        </Button>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    arrowRightOuterContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 16,
    },
    arrowRightInnerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 8,
    },
    gameState: {
        flex: 8,
        marginTop: 64,
        marginBottom: 16,
        fontSize: 34,
        fontWeight: 'bold',
    },
    gameFeedback: {
        flex: 6,
        fontSize: 21,
        marginBottom: 16,
    },
    userInputContainer: {
        flex: 5,
    },
    userInput: {
        width: 200,
        height: 40,
        backgroundColor: 'white',
        paddingHorizontal: 4,
        paddingBottom: 8,
        fontSize: 28,
    },
    buttonContainer: {
        flex: 11,
        paddingTop: 64,
    },
    button: {
        marginBottom: 16,
        alignSelf: 'center'
    },
});