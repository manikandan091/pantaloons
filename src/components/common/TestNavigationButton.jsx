import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TestNavigationButton = () => {
    const navigation = useNavigation();

    const testNavigation = () => {
        console.log('=== TEST NAVIGATION ===');
        console.log('Navigation object:', navigation);
        console.log('Navigation keys:', Object.keys(navigation || {}));

        try {
            navigation.navigate('Address');
            console.log('Navigation successful!');
        } catch (error) {
            console.error('Navigation failed:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={testNavigation}>
                <Text style={styles.buttonText}>TEST: Navigate to Address</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#FFF3CD',
        borderWidth: 2,
        borderColor: '#FFC107',
        margin: 16,
    },
    button: {
        backgroundColor: '#00B0B5',
        padding: 12,
        borderRadius: 4,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default TestNavigationButton;
