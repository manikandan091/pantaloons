import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONT_SIZE } from './theme';

const UserInfoSection = () => {
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.topSection}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarPlaceholder}>👤</Text>
                    </View>

                    <View style={styles.detailsContainer}>
                        <View style={styles.headerRow}>
                            <Text style={styles.welcomeText}>Welcome, Vishnu !</Text>
                            <TouchableOpacity style={styles.editButton}>
                                <Text style={styles.editIcon}>✎</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.emailText}>vishnu130104@gmail.com</Text>
                        <Text style={styles.phoneText}>9655508958</Text>
                    </View>
                </View>

                <View style={styles.progressContainer}>
                    <View style={styles.progressHeader}>
                        <Text style={styles.progressText}>Your profile is 70% complete</Text>
                        <TouchableOpacity>
                            <Text style={styles.addDetailsLink}>Add Date of Birth</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.progressBarBackground}>
                        <View style={[styles.progressBarFill, { width: '70%' }]} />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SPACING.l,
        marginBottom: SPACING.m,
        marginTop: SPACING.s,
    },
    contentContainer: {
        backgroundColor: '#E0F7FA', // Light cyan background to simulate the gradient look roughly
        borderRadius: 12,
        padding: SPACING.m,
        borderWidth: 1,
        borderColor: '#B2EBF2',
    },
    topSection: {
        flexDirection: 'row',
        marginBottom: SPACING.l,
    },
    avatarContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.m,
    },
    avatarPlaceholder: {
        fontSize: 24,
    },
    detailsContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    welcomeText: {
        fontSize: FONT_SIZE.m,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
    },
    editButton: {
        padding: 4,
    },
    editIcon: {
        fontSize: 16,
        color: COLORS.textSecondary,
    },
    emailText: {
        fontSize: 11,
        color: COLORS.textSecondary,
        marginBottom: 2,
    },
    phoneText: {
        fontSize: 11,
        color: COLORS.textSecondary,
    },
    progressContainer: {
        marginTop: SPACING.xs,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
        alignItems: 'center',
    },
    progressText: {
        fontSize: 10,
        color: COLORS.textPrimary,
        fontWeight: '500',
    },
    addDetailsLink: {
        fontSize: 10,
        color: '#009688',
        textDecorationLine: 'underline',
        fontWeight: '500',
    },
    progressBarBackground: {
        height: 6,
        backgroundColor: COLORS.white,
        borderRadius: 3,
        width: '100%',
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#009688',
        borderRadius: 3,
    },
});

export default UserInfoSection;
