import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import ProfileHeader from '../components/profile/ProfileHeader';
import UserInfoSection from '../components/profile/UserInfoSection';
import BarcodeSection from '../components/profile/BarcodeSection';
import StatsSection from '../components/profile/StatsSection';
import MenuSection from '../components/profile/MenuSection';
import LogoutSection from '../components/profile/LogoutSection';
import { COLORS } from '../components/profile/theme';

const ProfileScreen = () => {
    const myProfileItems = [
        { label: 'MY ORDERS', subtitle: 'Find order updates, return & cancellation', icon: 'inventory-2' },
        { label: 'WISHLIST', subtitle: 'Save & view your favourites here', icon: 'favorite-border' },
        { label: 'SAVED CARD', subtitle: 'Securely stored card for easy online payments', icon: 'credit-card' },
        { label: 'CUSTOMER SUPPORT', subtitle: 'Contact us & Store locator', icon: 'headset-mic' },
        { label: 'E-BILLS', subtitle: 'Find your digital invoices', icon: 'receipt' },
        { label: 'ADDRESSES', subtitle: 'Edit & Add new addresses', icon: 'location-on' },
        { label: 'PANTALOONS CREDITS', subtitle: 'Check your Pantaloons Credit', icon: 'account-balance-wallet' },
        { label: 'PT GIFT CARD', subtitle: 'Buy or check your Giftcard', icon: 'card-giftcard' },
        { label: 'GREENCARD', subtitle: 'Check your Greencard points', icon: 'credit-card' },
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
            <ProfileHeader />
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <UserInfoSection />
                <BarcodeSection />
                <StatsSection />

                <MenuSection title="MY PROFILE" items={myProfileItems} />
                <MenuSection title="OTHERS" items={othersItems} />

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
