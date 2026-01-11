import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONT_SIZE } from './theme';

const LogoutSection = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>LOGOUT</Text>
            </TouchableOpacity>
            <Text style={styles.version}>V.3.0.0</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SPACING.xxl,
        paddingBottom: SPACING.xxl * 2,
        paddingTop: SPACING.xl,
        alignItems: 'center',
    },
    button: {
        backgroundColor: COLORS.primaryDark,
        paddingVertical: SPACING.m,
        paddingHorizontal: SPACING.xl,
        borderRadius: 25,
        width: '100%',
        alignItems: 'center',
        marginBottom: SPACING.m,
    },
    buttonText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: FONT_SIZE.m,
        textTransform: 'uppercase',
    },
    version: {
        color: COLORS.black,
        fontSize: FONT_SIZE.s,
    }
});

export default LogoutSection;
