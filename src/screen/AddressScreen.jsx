import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, Alert, ScrollView, TouchableOpacity, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddressForm from '../components/address/AddressForm';
import { COLORS } from '../components/profile/theme';

const ADDRESS_STORAGE_KEY = '@pantaloons_addresses';

const AddressScreen = ({ navigation }) => {
    const [addresses, setAddresses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
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
            setEditingAddress(null);
        } else {
            navigation.goBack();
        }
    };

    const handleEditPress = (address) => {
        setEditingAddress(address);
        setShowForm(true);
    };

    const handleDeleteAddress = (id) => {
        Alert.alert(
            'Delete Address',
            'Are you sure you want to delete this address?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const updatedAddresses = addresses.filter(addr => addr.id !== id);
                            setAddresses(updatedAddresses);
                            await AsyncStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(updatedAddresses));
                        } catch (error) {
                            console.error('Failed to delete address:', error);
                        }
                    }
                }
            ]
        );
    };

    const handleFormSubmit = async (formData) => {
        let updatedAddresses;

        if (formData.id) {
            // Update existing address
            updatedAddresses = addresses.map(addr =>
                addr.id === formData.id ? { ...addr, ...formData } : addr
            );
        } else {
            // Add new address
            const newAddress = {
                id: Date.now().toString(),
                ...formData,
                isDefault: addresses.length === 0,
            };
            updatedAddresses = [...addresses, newAddress];
        }

        setAddresses(updatedAddresses);

        try {
            await AsyncStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(updatedAddresses));
            setShowForm(false);
            setEditingAddress(null);
            Alert.alert('Success', formData.id ? 'Address updated successfully!' : 'Address saved successfully!');
        } catch (error) {
            console.error('Failed to save address:', error);
            Alert.alert('Error', 'Failed to save address. Please try again.');
        }
    };

    const renderEmptyState = () => (
        <View style={styles.emptyOuterContainer}>
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No Addresses found in your account!</Text>
                <TouchableOpacity
                    style={styles.addAddressButton}
                    onPress={() => setShowForm(true)}
                >
                    <Text style={styles.addAddressButtonText}>ADD ADDRESS</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderAddressCard = (address) => (
        <View key={address.id} style={styles.addressCard}>
            <View style={styles.cardHeader}>
                <Text style={styles.addressTypeLabel}>{address.addressType}</Text>
            </View>

            <View style={styles.addressDetails}>
                <Text style={styles.userName}>{address.firstName} {address.lastName}</Text>
                <Text style={styles.addressText}>
                    {address.houseNo}, {address.streetName}, {address.area}{address.landmark ? `, ${address.landmark}` : ''},
                </Text>
                <Text style={styles.addressText}>
                    {address.city}, {address.state},
                </Text>
                <Text style={styles.addressText}>{address.pincode}</Text>

                <Text style={styles.mobileText}>M: {address.mobileNumber}</Text>

                <Text style={styles.serviceableText}>Location serviceable</Text>
            </View>

            <View style={styles.cardFooter}>
                <TouchableOpacity
                    style={styles.editBtn}
                    onPress={() => handleEditPress(address)}
                >
                    <Text style={styles.editBtnText}>EDIT</Text>
                </TouchableOpacity>

                <View style={styles.rightFooterActions}>
                    {address.isDefault && (
                        <View style={styles.defaultPill}>
                            <Text style={styles.defaultPillText}>Default Address</Text>
                        </View>
                    )}

                    <TouchableOpacity
                        onPress={() => handleDeleteAddress(address.id)}
                        style={styles.deleteBtn}
                    >
                        <Ionicons name="trash-outline" size={22} color="#00b0b5" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            <View style={styles.addressesHeader}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={20} color="#000000aa" />
                </TouchableOpacity>
                <Text style={styles.addressesTitle}>ADDRESS</Text>
            </View>

            <View style={styles.mainContainer}>
                {showForm ? (
                    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                        <AddressForm
                            onSubmit={handleFormSubmit}
                            selectedLocation={selectedLocation}
                            onBack={() => {
                                setShowForm(false);
                                setEditingAddress(null);
                            }}
                            initialData={editingAddress}
                        />
                    </ScrollView>
                ) : (
                    <View style={styles.listWrapper}>
                        {addresses.length === 0 ? renderEmptyState() : (
                            <FlatList
                                data={addresses}
                                renderItem={({ item }) => renderAddressCard(item)}
                                keyExtractor={item => item.id}
                                contentContainerStyle={styles.listContainer}
                                ListFooterComponent={
                                    <TouchableOpacity
                                        style={styles.mainAddButton}
                                        onPress={() => setShowForm(true)}
                                    >
                                        <Text style={styles.mainAddButtonText}>ADD ADDRESS</Text>
                                    </TouchableOpacity>
                                }
                                showsVerticalScrollIndicator={false}
                            />
                        )}
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    mainContainer: {
        flex: 1,
    },
    listWrapper: {
        flex: 1,
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
        fontSize: 12,
        fontWeight: '700',
        color: '#000000',
        letterSpacing: 1,
    },
    content: {
        flex: 1,
    },
    emptyOuterContainer: {
        flex: 1,
        height: 500,
        paddingTop: 20,
    },
    emptyContainer: {
        marginHorizontal: 20,
    },
    emptyText: {
        fontSize: 15,
        color: COLORS.black,
        marginBottom: 30,
        fontWeight: '500',
    },
    addAddressButton: {
        backgroundColor: '#00b0b5',
        paddingVertical: 12,
        borderRadius: 25,
    },
    addAddressButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 1.2,
        textAlign: 'center',
    },
    listContainer: {
        padding: 16,
    },
    addressCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    cardHeader: {
        marginBottom: 6,
    },
    addressTypeLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: 'black',
    },
    userName: {
        fontSize: 14,
        fontWeight: '500',
        color: 'black',
        marginBottom: 12,
    },
    addressDetails: {
        marginBottom: 10,
    },
    addressText: {
        fontSize: 14,
        fontWeight: '500',
        color: 'black',
        lineHeight: 22,
    },
    mobileText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
        marginTop: 10,
    },
    serviceableText: {
        fontSize: 13,
        color: '#00b0b5',
        marginTop: 12,
        fontWeight: '500',
        letterSpacing: 1.06,
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    editBtn: {
        paddingVertical: 5,
    },
    editBtnText: {
        fontSize: 13,
        color: '#00b0b5',
        fontWeight: '500',
        letterSpacing: 1.06,
    },
    defaultPill: {
        backgroundColor: '#ffc929',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 16,
    },
    defaultPillText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#2a2a2a',
        letterSpacing: 1.06,
    },
    deleteBtn: {
        padding: 5,
        marginLeft: 8,
    },
    rightFooterActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mainAddButton: {
        backgroundColor: '#00b0b5',
        paddingVertical: 12,
        borderRadius: 25,
        marginTop: 10,
    },
    mainAddButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 1.2,
        textAlign: 'center',
    },
});

export default AddressScreen;
