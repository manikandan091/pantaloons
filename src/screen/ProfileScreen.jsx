import React from 'react';
import { View, ScrollView, StyleSheet, StatusBar, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserInfoSection from '../components/profile/UserInfoSection';
import BarcodeSection from '../components/profile/BarcodeSection';
import StatsSection from '../components/profile/StatsSection';
import MenuSection from '../components/profile/MenuSection';
import LogoutSection from '../components/profile/LogoutSection';
import { COLORS } from '../components/profile/theme';

const ProfileScreen = () => {
    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleCartPress = () => {
        console.log('Cart pressed');
    };

    const handleMenuItemPress = (label) => {
        console.log('Menu item pressed:', label);
        if (label === 'ADDRESSES') {
            navigation.navigate('Address');
        } else {
            console.log(`${label} pressed`);
        }
    };

    const myProfileItems = [
        { label: 'MY ORDERS', subtitle: 'Find order updates, return & cancellation', icon: 'local-shipping' },
        { label: 'WISHLIST', subtitle: 'Save & view your favourites here', icon: 'favorite-border' },
        { label: 'SAVED CARD', subtitle: 'Securely stored card for easy online payments', icon: 'credit-card' },
        { label: 'CUSTOMER SUPPORT', subtitle: 'Contact us & Store locator', icon: 'headset-mic' },
        { label: 'E-BILLS', subtitle: 'Find your digital invoices', icon: 'receipt' },
        { label: 'ADDRESSES', subtitle: 'Edit & Add new addresses', icon: 'location-on' },
        { label: 'PANTALOONS CREDITS', subtitle: 'Check your Pantaloons Credit', icon: 'account-balance-wallet' },
        { label: 'PT GIFT CARD', subtitle: 'Buy or check your Giftcard', icon: 'card-giftcard' },
        { label: 'GREENCARD', subtitle: 'Check your Greencard points', icon: 'stars' },
    ];

    const othersItems = [
        { label: 'REFER A FRIEND'},
        { label: 'SETTINGS'},
        { label: 'FAQ'},
        { label: 'ABOUT PANTALOONS'},
        { label: 'PRIVACY POLICY'},
        { label: 'TERMS OF USE'},
    ];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            <View style={styles.header}>
                <View style={styles.leftHeader}>
                    <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={20} color={COLORS.black} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>MY ACCOUNT</Text>
                </View>
                <TouchableOpacity onPress={handleCartPress} style={styles.cartButton}>
                    <Ionicons name="cart-outline" size={22} color={COLORS.primaryDark} />
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <UserInfoSection />
                <BarcodeSection />
                <StatsSection />

                <MenuSection
                    title="MY PROFILE"
                    items={myProfileItems}
                    onItemPress={handleMenuItemPress}
                />
                <MenuSection
                    title="OTHERS"
                    items={othersItems}
                    onItemPress={handleMenuItemPress}
                    variant="others"
                />

                <LogoutSection />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
    },
    leftHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 12,
        fontWeight: '600',
        color: '#000000',
        marginLeft: 4,
        letterSpacing: 1.06,
    },
    backButton: {
        padding: 4,
    },
    cartButton: {
        padding: 4,
    },
    scrollContent: {
        paddingBottom: 20,
    }
});

export default ProfileScreen;

