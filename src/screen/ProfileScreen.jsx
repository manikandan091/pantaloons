import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/common/Header';
import MarqueeHeader from '../components/common/MarqueeHeader';
import UserInfoSection from '../components/profile/UserInfoSection';
import BarcodeSection from '../components/profile/BarcodeSection';
import StatsSection from '../components/profile/StatsSection';
import MenuSection from '../components/profile/MenuSection';
import LogoutSection from '../components/profile/LogoutSection';
import { COLORS } from '../components/profile/theme';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const handleMenuPress = () => {
        console.log('Menu pressed');
    };

    const handleCartPress = () => {
        console.log('Cart pressed');
    };

    const handleSearchPress = () => {
        console.log('Search pressed');
    };

    const handleWishlistPress = () => {
        console.log('Wishlist pressed');
    };

    const handleMenuItemPress = (label) => {
        console.log('Menu item pressed:', label);
        console.log('Navigation object:', navigation);

        if (label === 'ADDRESSES') {
            try {
                console.log('Attempting to navigate to Address screen...');
                navigation.navigate('Address');
            } catch (error) {
                console.error('Navigation error:', error);
            }
        } else {
            console.log(`${label} pressed`);
        }
    };

    const myProfileItems = [
        { label: 'MY ORDERS', subtitle: 'Find order updates, return & cancellation', icon: '📦' },
        { label: 'WISHLIST', subtitle: 'Save & view your favourites here', icon: '♡' },
        { label: 'SAVED CARD', subtitle: 'Securely stored card for easy online payments', icon: '💳' },
        { label: 'CUSTOMER SUPPORT', subtitle: 'Contact us & Store locator', icon: '🎧' },
        { label: 'E-BILLS', subtitle: 'Find your digital invoices', icon: '📄' },
        { label: 'ADDRESSES', subtitle: 'Edit & Add new addresses', icon: '📍' },
        { label: 'PANTALOONS CREDITS', subtitle: 'Check your Pantaloons Credit', icon: '💳' },
        { label: 'PT GIFT CARD', subtitle: 'Buy or check your Giftcard', icon: '🎁' },
        { label: 'GREENCARD', subtitle: 'Check your Greencard points', icon: '💳' },
    ];

    const othersItems = [
        { label: 'REFER A FRIEND', icon: '' },
        { label: 'SETTINGS', icon: '' },
        { label: 'FAQ', icon: '' },
        { label: 'ABOUT PANTALOONS', icon: '' },
        { label: 'PRIVACY POLICY', icon: '' },
        { label: 'TERMS OF USE', icon: '' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
            <Header
                title="PANTALOONS"
                showMenu={true}
                onMenuPress={handleMenuPress}
                showCart={true}
                onCartPress={handleCartPress}
                showSearch={true}
                onSearchPress={handleSearchPress}
                showWishlist={true}
                onWishlistPress={handleWishlistPress}
            />
            <MarqueeHeader text="The SALE just got bigger & better! Flat 50% OFF* Is Now Live" />
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
    scrollContent: {
        paddingBottom: 20,
    }
});

export default ProfileScreen;

