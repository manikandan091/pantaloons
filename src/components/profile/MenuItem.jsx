import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONT_SIZE } from './theme';

const MenuItem = ({ icon, label, subtitle, isLast }) => {
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.iconContainer}>
                <Text style={styles.icon}>{icon}</Text>
            </View>
            <View style={[styles.contentContainer, isLast && styles.noBorder]}>
                <View style={styles.textContainer}>
                    <Text style={styles.label}>{label}</Text>
                    {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: SPACING.l,
        backgroundColor: COLORS.white,
    },
    iconContainer: {
        marginRight: SPACING.l,
        width: 24,
        alignItems: 'center',
    },
    icon: {
        fontSize: 18,
        color: COLORS.textSecondary,
    },
    contentContainer: {
        flex: 1,
        paddingVertical: SPACING.l,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderColor,
        paddingRight: SPACING.l,
    },
    noBorder: {
        borderBottomWidth: 0,
    },
    textContainer: {
        justifyContent: 'center',
    },
    label: {
        fontSize: FONT_SIZE.m,
        color: COLORS.textPrimary,
        fontWeight: '500',
        marginBottom: 2,
        textTransform: 'uppercase', // Section headers usually, but items here are uppercase in screenshot?
        // Looking at screenshot: "MY ORDERS", "WISHLIST" are uppercase. "Find order updates..." is mixed.
        // Actually the items titles are uppercase.
    },
    subtitle: {
        fontSize: FONT_SIZE.xs,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
});

export default MenuItem;
