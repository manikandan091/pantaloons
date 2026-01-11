import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SPACING, FONT_SIZE } from './theme';

const MenuItem = ({ icon, label, subtitle, isLast, onPress, variant = 'default' }) => {
    const handlePress = () => {
        console.log('MenuItem pressed:', label);
        console.log('onPress handler exists:', !!onPress);
        if (onPress) {
            onPress();
        }
    };

    const isOthers = variant === 'others';

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.7}>
            <View style={styles.innerRow}>
                {!isOthers && (
                    <View style={styles.iconContainer}>
                        <MaterialIcons name={icon} size={19} color={COLORS.textSecondary} />
                    </View>
                )}
                <View style={styles.contentContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.label}>{label}</Text>
                        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                    </View>
                </View>
            </View>
            {(!isOthers && !isLast) && <View style={styles.separator} />}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
    },
    innerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: SPACING.l,
    },
    separator: {
        height: 0.75,
        backgroundColor: COLORS.borderColor,
        marginHorizontal: SPACING.l,
    },
    iconContainer: {
        marginRight: SPACING.xl,
        width: 24,
        alignItems: 'center',
    },

    contentContainer: {
        flex: 1,
        paddingVertical: SPACING.l,
        paddingRight: SPACING.l,
    },
    textContainer: {
        justifyContent: 'center',
    },
    label: {
        fontSize: FONT_SIZE.m,
        color: COLORS.textPrimary,
        fontWeight: 'bold',
        marginBottom: 2,
        textTransform: 'uppercase',
        letterSpacing: 1.23,
    },
    subtitle: {
        fontSize: FONT_SIZE.s,
        color: "#6f7070",
        marginTop: 2,
        letterSpacing: 1.06,
    },
});

export default MenuItem;
