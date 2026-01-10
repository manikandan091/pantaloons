import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, Alert } from 'react-native';
import Header from '../components/common/Header';
import MarqueeHeader from '../components/common/MarqueeHeader';
import AddressMap from '../components/address/AddressMap';
import AddressForm from '../components/address/AddressForm';

const AddressScreen = ({ navigation }) => {
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
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <Header
                title="ADD ADDRESS"
                showBackButton={true}
                onBackPress={handleBackPress}
                showMenu={false}
                showCart={false}
                showSearch={false}
                showWishlist={false}
            />
            <MarqueeHeader text="The SALE just got bigger & better! Flat 50% OFF* Is Now Live" />

            <View style={styles.content}>
                <AddressMap onLocationSelect={handleLocationSelect} />
                <AddressForm onSubmit={handleFormSubmit} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    content: {
        flex: 1,
    },
});

export default AddressScreen;
