import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, Alert, ScrollView, TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../components/common/Header';
import MarqueeHeader from '../components/common/MarqueeHeader';
import AddressForm from '../components/address/AddressForm';

const AddressScreen = ({ navigation }) => {
    const [selectedLocation, setSelectedLocation] = useState(null);

    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleFormSubmit = (formData) => {
        console.log('Address saved:', formData);
        Alert.alert(
            'Success',
            'Address saved successfully!',
            [
                {
                    text: 'OK',
                    onPress: () => navigation.goBack(),
                },
            ]
        );
    };

    const handleLocationSelect = (coordinate) => {
        console.log('Location selected:', coordinate);
        setSelectedLocation(coordinate);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <Header
                title="PANTALOONS"
                showBackButton={true}
                onBackPress={handleBackPress}
                showMenu={false}
                showCart={false}
                showSearch={false}
                showWishlist={false}
            />
            <MarqueeHeader text="The SALE just got bigger & better! Flat 50% OFF* Is Now Live" />

            {/* Addresses Header with Back Button */}
            <View style={styles.addressesHeader}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#000000" />
                </TouchableOpacity>
                <Text style={styles.addressesTitle}>Addresses</Text>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <AddressForm
                    onSubmit={handleFormSubmit}
                    selectedLocation={selectedLocation}
                    onBack={handleBackPress}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    addressesHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
    },
    backButton: {
        marginRight: 8,
        padding: 4,
    },
    addressesTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000000',
    },
    content: {
        flex: 1,
    },
});

export default AddressScreen;



