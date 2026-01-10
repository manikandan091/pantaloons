import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZE } from './theme';
import MenuItem from './MenuItem';

const MenuSection = ({ title, items }) => {
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
                        isLast={index === items.length - 1} // Remove border for last item if logic dictates, but screenshot shows borders
                    // Actually screenshot shows borders between items. Last item usually doesn't have it or does?
                    // Screenshot: "GREENCARD" has no visible separator below it? Or it's the end of section.
                    // Re-checking screenshot: "GREENCARD" line seems to be the last in that section, then OTHERS header starts.
                    // Standard: items have separators.
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
