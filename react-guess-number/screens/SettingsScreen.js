import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SliderWithInfo from '../components/SliderWithInfo';
import GameMaster from '../logic/GameMaster';
import { MaterialIcons } from '@expo/vector-icons';
import ConstStrings from '../shared/strings';

export default settingsScreen = () => {
    return (
        <View style={styles.rootContainer}>
            <View style={styles.arrowLeftOuterContainer}>
                <View style={styles.arrowLeftInnerContainer}>
                    <MaterialIcons name="keyboard-arrow-left" size={32} color="black" />
                    <MaterialIcons name="videogame-asset" size={32} color="black" />
                </View>
            </View>
            <View style={styles.settingsTextContainer}>
                <Text style={styles.settingsText}>Settings</Text>
            </View>
            <View style={styles.sliderContainerMargin}>
                <View style={styles.sliderMargin}>
                    <SliderWithInfo
                        title='Maximum roll value'
                        minValue={1}
                        maxValue={100}
                        storeKey={ConstStrings.MAX_ROLL}
                        defaultValue={GameMaster.defaultGuessRighLimit}
                    ></SliderWithInfo>
                </View>
                <View style={styles.sliderMargin}>
                    <SliderWithInfo
                        title='Maximum guesses'
                        minValue={1}
                        maxValue={15}
                        storeKey={ConstStrings.MAX_GUESSES}
                        defaultValue={GameMaster.defaultGuessesToFail}
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
    },
    arrowLeftOuterContainer: {
        flexDirection: 'row',
        marginTop: 8,
    },
    arrowLeftInnerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 8,
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
});