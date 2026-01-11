import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZE } from './theme';
import MenuItem from './MenuItem';

const MenuSection = ({ title, items, onItemPress, variant = 'default' }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.listContainer}>
                {items.map((item, index) => (
                    <MenuItem
                        key={index}
                        icon={item.icon}
                        label={item.label}
                        subtitle={item.subtitle}
                        isLast={index === items.length - 1}
                        variant={variant}
                        onPress={() => onItemPress && onItemPress(item.label)}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.m,
    },
    header: {
        paddingHorizontal: SPACING.l,
        paddingVertical: SPACING.s,
        backgroundColor: '#F2F2F2',
        letterSpacing: 0.35,
    },
    title: {
        fontSize: FONT_SIZE.m,
        fontWeight: 700,
        color: COLORS.black,
        textTransform: 'uppercase',
    },
    listContainer: {
        backgroundColor: COLORS.white,
        paddingVertical: SPACING.m,
    }
});

export default MenuSection;
