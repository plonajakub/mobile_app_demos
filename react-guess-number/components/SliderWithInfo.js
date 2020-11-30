import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import Slider from '@react-native-community/slider';

export default sliderWithInfo = ({ title, minValue, maxValue, storeKey, defaultValue }) => {
    const { colors } = useTheme();
    const [value, setValue] = useState(defaultValue);
    useEffect(() => {
        async function fetchData() {
            const loadedValue = await SecureStore.getItemAsync(storeKey);
            if (loadedValue != null) {
                setValue(parseInt(loadedValue));
                console.log(`${storeKey} initialized: ${loadedValue}`);
            } else {
                console.log(`${storeKey} does not exist, used default: ${defaultValue}`);
            }

        }
        fetchData();
    }, []);
    const onSlidingComplete = async (value) => {
        await SecureStore.setItemAsync(storeKey, `${value}`);
        console.log(`New ${storeKey} set: ${value}`);
    };
    return (
        <View style={styles.baseContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{title}</Text>
            </View>
            <Slider
                step={1}
                style={styles.slider}
                thumbTintColor={colors.accentDark}
                minimumTrackTintColor={colors.accent}
                minimumValue={minValue}
                maximumValue={maxValue}
                value={value}
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
        fontSize: 20
    },
    slider: {
        width: 300,
        padding: 5,
        marginVertical: 10,
    },
    sliderState: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    sliderStateText: {
        fontSize: 17
    },
    sliderStateValue: {
        marginLeft: 5,
        fontSize: 18
    }
});