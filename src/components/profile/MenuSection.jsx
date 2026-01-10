import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZE } from './theme';
import MenuItem from './MenuItem';

const MenuSection = ({ title, items, onItemPress }) => {
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
        paddingVertical: SPACING.m,
        backgroundColor: '#EEEEEE', // Slightly darker header bg for section
        // Screenshot shows the section header background is just gray/white or maybe specific gray strip
        // Screenshot: "MY PROFILE" text is on a gray strip? No, looks like just text on white/gray bg.
        // Let's assume light gray strip.
        backgroundColor: '#F0F0F0',
    },
    title: {
        fontSize: FONT_SIZE.s,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        textTransform: 'uppercase',
    },
    listContainer: {
        backgroundColor: COLORS.white,
    }
});

export default MenuSection;
