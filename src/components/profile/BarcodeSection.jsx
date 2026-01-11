import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZE } from './theme';
import barcodeImage from '../../../public/images/barcode.png';

const BarcodeSection = () => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.title}>Your Pantaloons ID</Text>
                <Text style={styles.infoIcon}>ⓘ</Text>
            </View>

            <View style={styles.barcodeContainer}>
                <Image source={barcodeImage} style={styles.barcodeImage} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        marginHorizontal: SPACING.l,
        borderRadius: 12,
        padding: SPACING.m,
        borderWidth: 1,
        borderColor: COLORS.primary,
        marginBottom: SPACING.m,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'relative',
        marginBottom: SPACING.s,
    },
    title: {
        fontSize: FONT_SIZE.m,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
    },
    infoIcon: {
        position: 'absolute',
        right: 0,
        color: COLORS.primaryDark,
        fontSize: 18,
        borderRadius: 12,
    },
    barcodeContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        height: 60,
    },
    barcodeLineGroup: {
        flexDirection: 'row',
        alignItems: 'stretch',
        height: '100%',
    },
    barcodeLine: {
        backgroundColor: COLORS.black,
        height: '100%',
    },
    barcodeImage: {
        width: 280,
        height: 60,
    },
});

export default BarcodeSection;
