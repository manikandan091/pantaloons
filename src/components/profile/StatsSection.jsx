import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SPACING, FONT_SIZE } from './theme';

const StatsSection = () => {
    return (
        <View style={styles.container}>
            <View style={styles.statItem}>
                <MaterialIcons name="emoji-events" size={24} color={COLORS.textSecondary} style={styles.icon} />
                <Text style={styles.label}>Your are{'\n'}Tier 0 member</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.statItem}>
                <MaterialIcons name="account-balance-wallet" size={24} color={COLORS.textSecondary} style={styles.icon} />
                <Text style={styles.label}>Spend ₹1{'\n'}to upgrade tier</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.statItem}>
                <MaterialIcons name="star-border" size={24} color={COLORS.textSecondary} style={styles.icon} />
                <Text style={styles.label}>My points{'\n'}0</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#F5F5F5', // Light gray background
        marginHorizontal: SPACING.l,
        borderRadius: 12,
        paddingVertical: SPACING.l,
        marginBottom: SPACING.xl,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: SPACING.xs,
    },
    icon: {
        marginBottom: SPACING.s,
    },
    label: {
        fontSize: FONT_SIZE.xs,
        textAlign: 'center',
        color: COLORS.textPrimary,
        lineHeight: 16,
    },
    separator: {
        width: 1,
        height: '80%',
        backgroundColor: COLORS.borderColor,
    }
});

export default StatsSection;
