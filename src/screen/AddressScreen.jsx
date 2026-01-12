import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, Alert, ScrollView, TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MarqueeHeader from '../components/common/MarqueeHeader';
import AddressForm from '../components/address/AddressForm';
import { COLORS } from '../components/profile/theme';

const ADDRESS_STORAGE_KEY = '@pantaloons_addresses';

const AddressScreen = ({ navigation }) => {
    const [addresses, setAddresses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);

    useEffect(() => {
        loadAddresses();
    }, []);

    const loadAddresses = async () => {
        try {
            const storedAddresses = await AsyncStorage.getItem(ADDRESS_STORAGE_KEY);
            if (storedAddresses) {
                setAddresses(JSON.parse(storedAddresses));
            }
        } catch (error) {
            console.error('Failed to load addresses:', error);
        }
    };

    const handleBackPress = () => {
        if (showForm) {
            setShowForm(false);
        } else {
            navigation.goBack();
        }
    };

    const handleFormSubmit = async (formData) => {
        const newAddress = {
            id: Date.now().toString(),
            ...formData,
        };

        const updatedAddresses = [...addresses, newAddress];
        setAddresses(updatedAddresses);

        try {
            await AsyncStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(updatedAddresses));
            setShowForm(false);
            Alert.alert('Success', 'Address saved successfully!');
        } catch (error) {
            console.error('Failed to save address:', error);
            Alert.alert('Error', 'Failed to save address. Please try again.');
        }
    };

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No Addresses found in your account!</Text>
            <TouchableOpacity
                style={styles.addAddressButton}
                onPress={() => setShowForm(true)}
            >
                <Text style={styles.addAddressButtonText}>ADD ADDRESS</Text>
            </TouchableOpacity>
        </View>
    );

    const renderAddressCard = (address) => (
        <View key={address.id} style={styles.addressCard}>
            <View style={styles.addressHeader}>
                <Ionicons
                    name={address.addressType === 'Home' ? 'home' : (address.addressType === 'Office' ? 'business' : 'location')}
                    size={20}
                    color="#00BCD4"
                />
                <Text style={styles.addressTypeLabel}>{address.addressType.toUpperCase()}</Text>
                {address.isDefault && (
                    <View style={styles.defaultBadge}>
                        <Text style={styles.defaultText}>DEFAULT</Text>
                    </View>
                )}
            </View>

            <View style={styles.addressDetails}>
                <Text style={styles.userName}>{address.firstName} {address.lastName}</Text>
                <Text style={styles.addressText}>
                    {address.houseNo}, {address.streetName}, {address.area}{address.landmark ? `, ${address.landmark}` : ''}
                </Text>
                <Text style={styles.addressText}>{address.city}, {address.state} - {address.pincode}</Text>
                <Text style={styles.mobileText}>Mobile: {address.mobileNumber}</Text>
            </View>

            <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>EDIT</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            <MarqueeHeader text="The SALE just got bigger & better! Flat 50% OFF* Is Now Live" />
            <View style={styles.addressesHeader}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={20} color="#000000aa" />
                </TouchableOpacity>
                <Text style={styles.addressesTitle}>ADDRESS</Text>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {showForm ? (
                    <AddressForm
                        onSubmit={handleFormSubmit}
                        selectedLocation={selectedLocation}
                        onBack={() => setShowForm(false)}
                    />
                ) : (
                    addresses.length === 0 ? renderEmptyState() : (
                        <View style={styles.listContainer}>
                            <TouchableOpacity
                                style={styles.addNewCard}
                                onPress={() => setShowForm(true)}
                            >
                                <Ionicons name="add" size={24} color="#00BCD4" />
                                <Text style={styles.addNewText}>Add New Address</Text>
                            </TouchableOpacity>
                            {addresses.map(renderAddressCard)}
                        </View>
                    )
                )}
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
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    backButton: {
        marginRight: 8,
        padding: 4,
    },
    addressesTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: '#000000',
        letterSpacing: 1,
    },
    content: {
        flex: 1,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        marginHorizontal: 10,
        paddingHorizontal: 10,
    },
    emptyText: {
        fontSize: 15,
        color: COLORS.black,
        marginTop: 10,
        marginBottom: 30,
        fontWeight: '500',
    },
    addAddressButton: {
        backgroundColor: '#00b0b5',
        paddingVertical: 8,
        borderRadius: 30,
    },
    addAddressButtonText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 1.32,
        textAlign: 'center',
    },
    listContainer: {
        padding: 16,
    },
    addNewCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#00BCD4',
        borderRadius: 8,
        marginBottom: 20,
        backgroundColor: '#F0FBFC',
    },
    addNewText: {
        fontSize: 15,
        color: '#00BCD4',
        fontWeight: '600',
        marginLeft: 8,
    },
    addressCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    addressHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    addressTypeLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: '#666666',
        marginLeft: 6,
        letterSpacing: 0.5,
    },
    defaultBadge: {
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        marginLeft: 'auto',
    },
    defaultText: {
        fontSize: 10,
        color: '#4CAF50',
        fontWeight: '700',
    },
    addressDetails: {
        marginBottom: 16,
    },
    userName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333333',
        marginBottom: 6,
    },
    addressText: {
        fontSize: 14,
        color: '#666666',
        lineHeight: 20,
    },
    mobileText: {
        fontSize: 14,
        color: '#333333',
        fontWeight: '600',
        marginTop: 8,
    },
    editButton: {
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: '#00BCD4',
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderRadius: 4,
    },
    editButtonText: {
        fontSize: 12,
        color: '#00BCD4',
        fontWeight: '700',
    },
});

export default AddressScreen;



