import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SPACING, FONT_SIZE } from './theme';

const BarcodeSection = () => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.title}>Your Pantaloons ID</Text>
                <MaterialIcons name="info-outline" size={20} color={COLORS.primaryDark} style={styles.infoIcon} />
            </View>

            <View style={styles.barcodeContainer}>
                {/* CSS Barcode Placeholder - Creating visual lines of varying widths */}
                <View style={styles.barcodeLineGroup}>
                    {[...Array(40)].map((_, i) => (
                        <View
                            key={i}
                            style={[
                                styles.barcodeLine,
                                {
                                    width: Math.random() > 0.5 ? 2 : 4,
                                    marginRight: Math.random() > 0.7 ? 3 : 1
                                }
                            ]}
                        />
                    ))}
                </View>
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
        borderColor: COLORS.primary, // Teal border as shown
        marginBottom: SPACING.m,
        // Shadow for elevation
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
        justifyContent: 'center', // Centered title
        alignItems: 'center',
        position: 'relative', // To position info icon absolutely if needed, or just standard flex
        marginBottom: SPACING.m,
    },
    title: {
        fontSize: FONT_SIZE.m,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
    },
    infoIcon: {
        position: 'absolute',
        right: 0,
    },
    barcodeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
    },
    barcodeLineGroup: {
        flexDirection: 'row',
        alignItems: 'stretch',
        height: '100%',
    },
    barcodeLine: {
        backgroundColor: COLORS.black,
        height: '100%',
    }
});

export default BarcodeSection;
