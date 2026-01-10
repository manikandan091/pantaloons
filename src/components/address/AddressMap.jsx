import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid, Platform, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AddressMap = ({
    initialRegion,
    onLocationSelect,
    markerCoordinate
}) => {
    const [region, setRegion] = useState(
        initialRegion || {
            latitude: 28.6139,
            longitude: 77.2090,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    );

    const [markerPosition, setMarkerPosition] = useState(
        markerCoordinate || {
            latitude: 28.6139,
            longitude: 77.2090,
        }
    );

    useEffect(() => {
        if (markerCoordinate) {
            setMarkerPosition(markerCoordinate);
        }
    }, [markerCoordinate]);

    const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Permission',
                        message: 'This app needs access to your location to show your current position on the map.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        }
        return true;
    };

    const handleUseCurrentLocation = async () => {
        const hasPermission = await requestLocationPermission();

        if (hasPermission) {
            Geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const newRegion = {
                        latitude,
                        longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    };
                    const newMarker = { latitude, longitude };

                    setRegion(newRegion);
                    setMarkerPosition(newMarker);

                    if (onLocationSelect) {
                        onLocationSelect({ latitude, longitude });
                    }
                },
                (error) => {
                    console.error('Error getting location:', error);
                    Alert.alert('Error', 'Unable to get current location. Please try again.');
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        } else {
            Alert.alert('Permission Denied', 'Location permission is required to use this feature.');
        }
    };

    const handleMarkerDragEnd = (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setMarkerPosition({ latitude, longitude });

        if (onLocationSelect) {
            onLocationSelect({ latitude, longitude });
        }
    };

    const handleMapPress = (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setMarkerPosition({ latitude, longitude });

        if (onLocationSelect) {
            onLocationSelect({ latitude, longitude });
        }
    };

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={region}
                onRegionChangeComplete={setRegion}
                onPress={handleMapPress}
            >
                <Marker
                    coordinate={markerPosition}
                    draggable
                    onDragEnd={handleMarkerDragEnd}
                    title="Selected Location"
                    description="Drag to adjust position"
                />
            </MapView>

            <TouchableOpacity
                style={styles.currentLocationButton}
                onPress={handleUseCurrentLocation}
                activeOpacity={0.7}
            >
                <Ionicons name="navigate" size={24} color="#FFFFFF" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 250,
        width: '90%',
        borderRadius: 12,
        margin: 'auto',
        position: 'relative',
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    currentLocationButton: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: '#00BCD4',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});

export default AddressMap;
