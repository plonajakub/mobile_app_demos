import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SliderWithInfo from '../components/SliderWithInfo';
import GameMaster from '../logic/GameMaster';
import { MaterialIcons } from '@expo/vector-icons';

export default settingsScreen = (props) => {
    const [maxRoll, setMaxRoll] = useState(GameMaster.defaultGuessRighLimit);
    const [maxGuesses, setMaxGuesses] = useState(GameMaster.defaultGuessesToFail);
    const maxRollChanged = (value) => {
        setMaxRoll(value);
        props.gameMasterRef.current = new GameMaster(value, maxGuesses);
        console.log(`New maxRoll set: ${value}`);
    }
    const maxGuessesChanged = (value) => {
        setMaxGuesses(value);
        props.gameMasterRef.current = new GameMaster(maxRoll, value);
        console.log(`New maxGuesses set: ${value}`);
    }
    return (
        <View style={styles.rootContainer}>

            <View style={styles.arrowLeftOuterContainer}>
                <View style={styles.arrowLeftInnerContainer}>
                    <MaterialIcons style={styles.arrowLeft} name="keyboard-arrow-left" size={32} color="black" />
                </View>
            </View>

            <View style={styles.settingsTextContainer}>
                <Text style={styles.settingsText}>Settings</Text>
            </View>

            <View style={styles.sliderContainerMargin}>
                <View style={styles.sliderMargin}>
                    <SliderWithInfo title='Maximum roll value'
                        minValue={1}
                        initialValue={GameMaster.defaultGuessRighLimit}
                        maxValue={100}
                        onSlidingComplete={maxRollChanged}
                    ></SliderWithInfo>
                </View>
                <View style={styles.sliderMargin}>
                    <SliderWithInfo title='Maximum guesses'
                        minValue={1}
                        initialValue={GameMaster.defaultGuessesToFail}
                        maxValue={15}
                        onSlidingComplete={maxGuessesChanged}
                    ></SliderWithInfo>
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
    },
    settingsTextContainer: {
        marginTop: 50,
    },
    settingsText: {
        padding: 10,
        fontSize: 30,
        textAlign: 'center'
    },
    sliderMargin: {
        marginTop: 25
    },
    sliderContainerMargin: {
        marginTop: 75,
    },
    arrowLeftOuterContainer: {
        flexDirection: 'row',
    },
    arrowLeftInnerContainer: {
        flex: 1,
    },
    arrowLeft: {
        alignSelf: 'flex-start',
        marginLeft: 8,
    }
});