import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../profile/theme';

const Header = ({
    onMenuPress,
    onNotificationPress,
    onCartPress,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.leftSection}>
                <TouchableOpacity
                    style={styles.hamburgerButton}
                    onPress={onMenuPress}
                    activeOpacity={0.7}
                >
                    <Ionicons name="menu" size={28} color="#000000" />
                </TouchableOpacity>
                <Image
                    source={require('../../../public/images/logo.png')}
                    style={styles.logoImage}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.rightSection}>
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={onNotificationPress}
                >
                    <Ionicons name="notifications-outline" size={24} color={COLORS.primaryDark} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={onCartPress}
                >
                    <Ionicons name="cart-outline" size={24} color={COLORS.primaryDark} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 8,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    hamburgerButton: {
        padding: 4,
        marginRight: 12,
    },
    logoImage: {
        width: 140,
        height: 45,
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        padding: 4,
        marginLeft: 4,
    },
});

export default Header;
