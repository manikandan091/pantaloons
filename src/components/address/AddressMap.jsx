import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid, Platform, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AddressMap = ({
    initialRegion,
    onLocationSelect,
    markerCoordinate,
    onMapTouchStart,
    onMapTouchEnd,
}) => {
    const [region, setRegion] = useState(
        initialRegion || {
            latitude: 11.1271,
            longitude: 78.6569,
            latitudeDelta: 2.0,
            longitudeDelta: 2.0,
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
            setRegion(prev => ({
                ...prev,
                latitude: markerCoordinate.latitude,
                longitude: markerCoordinate.longitude,
            }));
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
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    };
                    setRegion(newRegion);
                    setMarkerPosition(newRegion);
                    if (onLocationSelect) {
                        onLocationSelect({ latitude, longitude });
                    }
                },
                (error) => {
                    console.error('Error getting location:', error);
                    Alert.alert('Location Error', 'Unable to get current location.');
                },
                { enableHighAccuracy: false, timeout: 30000, maximumAge: 10000 }
            );
        } else {
            Alert.alert('Permission Denied', 'Location permission is required.');
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

    const handleRegionChangeComplete = (newRegion) => {
        console.log('[AddressMap] Region changed:', newRegion);
        setRegion(newRegion);
        // if (onLocationSelect) {
        //     console.log('[AddressMap] Triggering onLocationSelect');
        //     onLocationSelect({
        //         latitude: newRegion.latitude,
        //         longitude: newRegion.longitude
        //     });
        // }
    };

    return (
        <View
            style={styles.container}
            onTouchStart={onMapTouchStart}
            onTouchEnd={onMapTouchEnd}
            onTouchCancel={onMapTouchEnd}
        >
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={region}
                onRegionChangeComplete={handleRegionChangeComplete}
                scrollEnabled
                zoomEnabled
                pitchEnabled
                rotateEnabled
                showsUserLocation={true}
                showsMyLocationButton={true}
                loadingEnabled
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
            >
                <Ionicons name="navigate" size={24} color="#fff" />
            </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        height: 300,
        width: '100%',
        backgroundColor: '#f0f0f0',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
    },
    map: {
        ...StyleSheet.absoluteFill,
    },
    centerMarkerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 40,
        zIndex: 10,
        elevation: 10,
    },
    currentLocationButton: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: '#186c00',
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
        zIndex: 11,
    },
});

export default AddressMap;