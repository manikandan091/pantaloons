import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AddressMap = ({
    initialRegion,
    onLocationSelect,
    markerCoordinate
}) => {
    const [location, setLocation] = useState('Delhi, India');

    const handleSelectLocation = () => {
        console.log('Map placeholder - Location selection');
        if (onLocationSelect) {
            onLocationSelect({
                latitude: 28.6139,
                longitude: 77.2090
            });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.placeholderContainer}>
                <Ionicons name="location" size={48} color="#00B0B5" />
                <Text style={styles.placeholderTitle}>Map Placeholder</Text>
                <Text style={styles.placeholderText}>
                    Google Maps will appear here after configuration
                </Text>
                <Text style={styles.locationText}>{location}</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSelectLocation}
                    activeOpacity={0.7}
                >
                    <Ionicons name="navigate" size={20} color="#FFFFFF" />
                    <Text style={styles.buttonText}>Use Current Location</Text>
                </TouchableOpacity>

                <Text style={styles.infoText}>
                    To enable maps:{'\n'}
                    1. Add Google Maps API key{'\n'}
                    2. Rebuild the app
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: '100%',
        backgroundColor: '#F5F5F5',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    placeholderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    placeholderTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
        marginTop: 8,
    },
    placeholderText: {
        fontSize: 12,
        color: '#666666',
        marginTop: 4,
        textAlign: 'center',
    },
    locationText: {
        fontSize: 14,
        color: '#00B0B5',
        fontWeight: '600',
        marginTop: 8,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#00B0B5',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 4,
        marginTop: 12,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 8,
    },
    infoText: {
        fontSize: 10,
        color: '#999999',
        marginTop: 12,
        textAlign: 'center',
        lineHeight: 14,
    },
});

export default AddressMap;
