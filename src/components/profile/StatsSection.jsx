import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZE } from './theme';

const StatsSection = () => {
    return (
        <View style={styles.container}>
            <View style={styles.statItem}>
                <Icon name="trophy-outline" size={24} style={styles.icon} />
                <Text style={styles.label}>Your are{'\n'}<Text style={styles.bold}>Tier 0 member</Text></Text>
            </View>
            <View style={styles.statItem}>
                <Icon name="wallet-outline" size={24} style={styles.icon} />
                <Text style={styles.label}>Spend <Text style={styles.bold}>₹1</Text>{'\n'}to upgrade tier</Text>
            </View>
            <View style={styles.statItem}>
                <Icon name="star-outline" size={24} style={styles.icon} />
                <Text style={styles.label}>My points{'\n'}<Text style={styles.bold}>0</Text></Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#F2F2F2',
        marginHorizontal: SPACING.l,
        borderRadius: 12,
        padding: SPACING.m,
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
        fontSize: 24,
        marginBottom: SPACING.s,
        color: COLORS.textSecondary,
    },
    label: {
        fontSize: FONT_SIZE.s,
        textAlign: 'center',
        color: COLORS.textPrimary,
        lineHeight: 16,
        letterSpacing: 0.26,
    },
    bold: {
        fontWeight: 'bold',
        color: COLORS.black,
    }
});

export default StatsSection;
