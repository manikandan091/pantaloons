import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { COLORS, SPACING, FONT_SIZE } from './theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const UserInfoSection = () => {
    return (
        <View style={styles.container}>

            <Image
                source={require('../../../public/images/animateImage1.png')}
                style={styles.animateImage1}
            />
            <Image
                source={require('../../../public/images/animateImage2.png')}
                style={styles.animateImage2}
            />

            <View style={styles.cardContainer}>

                <ImageBackground
                    source={require('../../../public/images/profile_background.png')}
                    style={styles.topSectionBackground}
                >
                    <View style={styles.topContent}>
                        <View style={styles.avatarWrapper}>
                            <View style={styles.avatarContainer}>
                                <Image
                                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/219/219983.png' }}
                                    style={styles.avatarImage}
                                />
                            </View>
                        </View>

                        <View style={styles.detailsContainer}>
                            <Text style={styles.welcomeText}>Welcome, User !</Text>
                            <Text style={styles.emailText}>user123@gmail.com</Text>
                            <Text style={styles.phoneText}>9123456789</Text>
                        </View>

                        <TouchableOpacity style={styles.editButton}>
                            <MaterialIcons name="edit" size={12} color={COLORS.black} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                <View style={styles.bottomSection}>
                    <View style={styles.progressBarBackground}>
                        <View style={[styles.progressBarFill, { width: '70%' }]} />
                    </View>
                    <View style={styles.progressFooter}>
                        <Text style={styles.progressStatusText}>Your profile is 70% complete</Text>
                        <TouchableOpacity>
                            <Text style={styles.addDetailsLink}>Add Date of Birth</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SPACING.l,
        marginVertical: SPACING.m,
        position: 'relative',
    },
    animateImage1: {
        position: 'absolute',
        top: -40,
        left: -50,
        width: 200,
        height: 200,
    },
    animateImage2: {
        position: 'absolute',
        bottom: -60,
        right: -60,
        width: 150,
        height: 150,
    },
    cardContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 1,
    },
    topSectionBackground: {
        width: '100%',
    },
    topContent: {
        padding: SPACING.l,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarWrapper: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 40,
        padding: 2,
    },
    avatarContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    detailsContainer: {
        flex: 1,
        marginLeft: SPACING.m,
    },
    welcomeText: {
        fontSize: FONT_SIZE.l,
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 4,
    },
    emailText: {
        fontSize: FONT_SIZE.s,
        fontWeight: '500',
        color: COLORS.textPrimary,
        marginBottom: 2,
    },
    phoneText: {
        fontSize: FONT_SIZE.s,
        fontWeight: '500',
        color: COLORS.textPrimary,
    },
    editButton: {
        width: 22,
        height: 22,
        borderRadius: 16,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        position: 'absolute',
        top: SPACING.m,
        right: SPACING.m,
    },
    bottomSection: {
        padding: SPACING.m,
        backgroundColor: COLORS.white,
        borderWidth: 0.75,
        borderTopWidth: 0,
        borderColor: "#838383ff",
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    progressBarBackground: {
        height: 8,
        backgroundColor: '#f4f4f4ff',
        borderRadius: 4,
        width: '100%',
        marginBottom: SPACING.s,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#01AFB5',
        borderRadius: 4,
    },
    progressFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    progressStatusText: {
        fontSize: FONT_SIZE.m,
        color: COLORS.textPrimary,
        fontWeight: '500',
        letterSpacing: 0.26,
    },
    addDetailsLink: {
        fontSize: FONT_SIZE.s,
        color: '#01AFB5',
        textDecorationLine: 'underline',
        fontWeight: '600',
        letterSpacing: 0.26,
    },
});

export default UserInfoSection;
