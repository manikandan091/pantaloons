import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = ({
    title = 'PANTALOONS',
    showBackButton = false,
    onBackPress,
    showMenu = true,
    onMenuPress,
    showCart = true,
    showSearch = true,
    showWishlist = true,
    onCartPress,
    onSearchPress,
    onWishlistPress,
}) => {
    return (
        <View style={styles.container}>
            {/* Left Side - Menu or Back Button */}
            <View style={styles.leftSection}>
                {showBackButton ? (
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={onBackPress}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="arrow-back" size={24} color="#000000" />
                    </TouchableOpacity>
                ) : showMenu ? (
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={onMenuPress}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="menu" size={28} color="#000000" />
                    </TouchableOpacity>
                ) : (
                    <View style={styles.iconButton} />
                )}
            </View>

            {/* Center - Logo/Title */}
            <View style={styles.centerSection}>
                <Text style={styles.logo}>{title}</Text>
            </View>

            {/* Right Side - Action Icons */}
            <View style={styles.rightSection}>
                {showWishlist && (
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={onWishlistPress}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="heart-outline" size={24} color="#000000" />
                    </TouchableOpacity>
                )}
                {showSearch && (
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={onSearchPress}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="search-outline" size={24} color="#000000" />
                    </TouchableOpacity>
                )}
                {showCart && (
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={onCartPress}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="bag-outline" size={24} color="#000000" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 56,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    leftSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    centerSection: {
        flex: 2,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    rightSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    iconButton: {
        padding: 8,
        marginHorizontal: 2,
    },
    logo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00B0B5',
        letterSpacing: 1.5, 
    },
});

export default Header;
