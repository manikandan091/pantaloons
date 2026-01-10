import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, FONT_SIZE, SPACING } from './theme';

const ProfileHeader = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.iconButton}>
                <MaterialIcons name="arrow-back" size={24} color={COLORS.black} />
            </TouchableOpacity>

            <Text style={styles.title}>MY ACCOUNT</Text>

            <TouchableOpacity style={styles.iconButton}>
                <MaterialIcons name="shopping-cart" size={24} color={COLORS.black} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 56,
        paddingHorizontal: SPACING.l,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderColor,
    },
    title: {
        fontSize: FONT_SIZE.header,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        textTransform: 'uppercase',
    },
    iconButton: {
        padding: SPACING.s,
    },
});

export default ProfileHeader;
