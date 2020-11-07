import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SliderWithInfo from '../components/SliderWithInfo';

export default settingsScreen = () => {
    return (
        <View style={styles.rootContainer}>
            
            <View style={styles.settingsTextContainer}>
                <Text style={styles.settingsText}> Settings</Text>
            </View>

            <View style={styles.settingsMargin}>
                <View style={styles.sliderMargin}>
                    <SliderWithInfo title='Maximum roll value'
                        minValue={1}
                        maxValue={10000}
                        onSlidingComplete={value => console.log(`Maximum roll value ${value}`)}
                    ></SliderWithInfo>
                </View>
                <View style={styles.sliderMargin}>
                    <SliderWithInfo title='Maximum guesses'
                        minValue={1}
                        maxValue={50}
                        onSlidingComplete={value => console.log(`Maximum guesses value ${value}`)}
                    ></SliderWithInfo>
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'space-around',
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
    settingsMargin: {
        marginBottom: 150
    }
});