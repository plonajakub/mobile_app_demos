import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';

export default sliderWithInfo = ({ title, minValue, initialValue, maxValue, onSlidingComplete }) => {
    const [value, setValue] = useState(initialValue);
    return (
        <View style={styles.baseContainer}>

            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{title}</Text>
            </View>

            <Slider
                step={1}
                style={styles.slider}
                minimumValue={minValue}
                maximumValue={maxValue}
                value={initialValue}
                onSlidingComplete={value => onSlidingComplete(value)}
                onValueChange={value => setValue(value)}
            />

            <View style={styles.sliderState}>
                <Text style={styles.sliderStateText}>Current value:</Text>
                <Text style={styles.sliderStateValue}>{value}</Text>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    baserContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    titleContainer: {
        alignItems: 'flex-start',
    },
    titleText: {
        fontSize: 18
    },
    slider: {
        width: 300,
        padding: 5,
        marginVertical: 10
    },
    sliderState: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    sliderStateText: {
        fontSize: 14
    },
    sliderStateValue: {
        marginLeft: 10
    }
});