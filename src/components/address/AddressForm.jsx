import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,

    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddressMap from './AddressMap';

const AddressForm = ({ onSubmit, selectedLocation, onBack, initialData }) => {
    const [formData, setFormData] = useState({
        firstName: initialData?.firstName || '',
        lastName: initialData?.lastName || '',
        mobileNumber: initialData?.mobileNumber || '',
        address: initialData?.address || '',
        houseNo: initialData?.houseNo || '',
        streetName: initialData?.streetName || '',
        area: initialData?.area || '',
        landmark: initialData?.landmark || '',
        pincode: initialData?.pincode || '',
        city: initialData?.city || '',
        state: initialData?.state || '',
        latitude: initialData?.latitude || '',
        longitude: initialData?.longitude || '',
        addressType: (initialData?.addressType === 'Home' || initialData?.addressType === 'Office' || !initialData?.addressType) ? (initialData?.addressType || 'Home') : 'Others',
        customAddressType: (initialData?.addressType === 'Home' || initialData?.addressType === 'Office' || !initialData?.addressType) ? '' : (initialData?.addressType || ''),
        isDefault: initialData?.isDefault || false,
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [pincodeLoading, setPincodeLoading] = useState(false);
    const [showMap, setShowMap] = useState(false);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {

            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

  

   

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (!formData.mobileNumber) {
            newErrors.mobileNumber = 'Mobile number is required';
        } else if (formData.mobileNumber.length !== 10) {
            newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
        }

        if (!formData.houseNo.trim()) {
            newErrors.houseNo = 'House no/Building name is required';
        }

        if (!formData.streetName.trim()) {
            newErrors.streetName = 'Street name is required';
        }

        if (!formData.area.trim()) {
            newErrors.area = 'Area is required';
        }

        if (!formData.pincode) {
            newErrors.pincode = 'Pincode is required';
        } else if (!formData.pincode) {
            newErrors.pincode = 'Please enter a valid 6-digit pincode';
        }

        if (!formData.city) {
            newErrors.city = 'City is required';
        }

        if (!formData.state) {
            newErrors.state = 'State is required';
        }

        if (formData.addressType === 'Others' && !formData.customAddressType.trim()) {
            newErrors.customAddressType = 'Please specify the address type';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            setLoading(true);
            setTimeout(() => {

                setLoading(false);
                if (onSubmit) {
                    const finalData = { ...formData };
                    if (finalData.addressType === 'Others') {
                        finalData.addressType = finalData.customAddressType;
                    }
                    delete finalData.customAddressType;

                    onSubmit(initialData?.id ? { ...finalData, id: initialData.id } : finalData);
                }
            }, 1000);
        }
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.formContent}>
                <View style={styles.sectionHeader}>

                    <Text style={styles.sectionTitle}>{initialData?.id ? 'EDIT ADDRESS' : 'ADD ADDRESS'}</Text>
                    <TouchableOpacity onPress={onBack} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="#000000" />
                    </TouchableOpacity>
                </View>

                <View style={styles.fieldContainer}>

                    <Text style={styles.label}>First name*</Text>
                    <TextInput
                        style={[styles.input, errors.firstName && styles.inputError]}
                        placeholder="John"
                        value={formData.firstName}
                        onChangeText={(value) => handleInputChange('firstName', value)}
                        placeholderTextColor="#999999"
                    />
                    {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
                </View>

                <View style={styles.fieldContainer}>

                    <Text style={styles.label}>Last name</Text>
                    <TextInput
                        style={[styles.input, errors.lastName && styles.inputError]}
                        placeholder="Doe"
                        value={formData.lastName}
                        onChangeText={(value) => handleInputChange('lastName', value)}
                        placeholderTextColor="#999999"
                    />
                    {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
                </View>

                <View style={styles.fieldContainer}>

                    <Text style={styles.label}>Mobile number*</Text>
                    <TextInput
                        style={[styles.input, errors.mobileNumber && styles.inputError]}
                        placeholder="9123456789"
                        value={formData.mobileNumber}
                        onChangeText={handlePhoneChange}
                        keyboardType="phone-pad"
                        maxLength={10}
                        placeholderTextColor="#999999"
                    />
                    {errors.mobileNumber && <Text style={styles.errorText}>{errors.mobileNumber}</Text>}
                </View>

                <TouchableOpacity

                    style={styles.checkboxContainer}
                    onPress={() => setShowMap(!showMap)}
                    activeOpacity={0.7}
                >
                    <View style={styles.checkbox}>
                        {showMap && (
                            <View style={styles.checkboxChecked} />
                        )}
                    </View>
                    <Text style={styles.checkboxLabel}>Choose from map</Text>
                </TouchableOpacity>

                {showMap && (

                   <View style={styles.mapContainer}>
                        <AddressMap
                            onMapTouchStart={() => setMainScrollEnabled(false)}
                            onMapTouchEnd={() => setMainScrollEnabled(true)}
                            onLocationSelect={(coordinate) => {
                                setFormData(prev => ({
                                    ...prev,
                                    latitude: coordinate.latitude.toFixed(6),
                                    longitude: coordinate.longitude.toFixed(6),
                                }));
                            }}
                            markerCoordinate={
                                formData.latitude && formData.longitude
                                    ? {
                                        latitude: parseFloat(formData.latitude),
                                        longitude: parseFloat(formData.longitude)
                                    }
                                    : null
                            }
                        />
                    </View>
                )}

                <View style={styles.fieldContainer}>

                    <Text style={styles.label}>Address</Text>
                    <TextInput
                        style={[styles.input]}
                        placeholder="Enter address"
                        value={formData.address}
                        onChangeText={(value) => handleInputChange('address', value)}
                        placeholderTextColor="#999999"
                    />
                </View>

                <View style={styles.fieldContainer}>

                    <Text style={styles.label}>House no/Building name*</Text>
                    <TextInput
                        style={[styles.input, errors.houseNo && styles.inputError]}
                        placeholder=""
                        value={formData.houseNo}
                        onChangeText={(value) => handleInputChange('houseNo', value)}
                        placeholderTextColor="#999999"
                    />
                    {errors.houseNo && <Text style={styles.errorText}>{errors.houseNo}</Text>}
                </View>

                <View style={styles.fieldContainer}>

                    <Text style={styles.label}>Street name</Text>
                    <TextInput
                        style={[styles.input, errors.streetName && styles.inputError]}
                        placeholder=""
                        value={formData.streetName}
                        onChangeText={(value) => handleInputChange('streetName', value)}
                        placeholderTextColor="#999999"
                    />
                    {errors.streetName && <Text style={styles.errorText}>{errors.streetName}</Text>}
                </View>

                <View style={styles.fieldContainer}>

                    <Text style={styles.label}>Area</Text>
                    <TextInput
                        style={[styles.input, errors.area && styles.inputError]}
                        placeholder=""
                        value={formData.area}
                        onChangeText={(value) => handleInputChange('area', value)}
                        placeholderTextColor="#999999"
                    />
                    {errors.area && <Text style={styles.errorText}>{errors.area}</Text>}
                </View>

                <View style={styles.fieldContainer}>

                    <Text style={styles.label}>Landmark</Text>
                    <TextInput
                        style={styles.input}
                        placeholder=""
                        value={formData.landmark}
                        onChangeText={(value) => handleInputChange('landmark', value)}
                        placeholderTextColor="#999999"
                    />
                </View>

                <View style={styles.fieldContainer}>

                    <Text style={styles.label}>Pincode*</Text>
                    <View style={styles.inputWithLoader}>
                        <TextInput
                            style={[styles.input, errors.pincode && styles.inputError]}
                            placeholder=""
                            value={formData.pincode}
                            keyboardType="numeric"
                            maxLength={6}
                            placeholderTextColor="#999999"
                        />
                        {pincodeLoading && (
                            <ActivityIndicator
                                size="small"
                                color="#00BCD4"
                                style={styles.loader}
                            />
                        )}
                    </View>
                    {errors.pincode && <Text style={styles.errorText}>{errors.pincode}</Text>}
                </View>

               <View style={styles.fieldContainer}>
                    <Text style={styles.label}>City/District*</Text>
                    <TextInput
                        style={[styles.input]}
                        placeholder=""
                        value={formData.city}
                        onChangeText={(value) => handleInputChange('city', value)}
                        placeholderTextColor="#999999"
                    />
                </View>

                <View style={styles.fieldContainer}>

                    <Text style={styles.label}>State*</Text>
                    <TextInput
                        style={[styles.input]}
                        placeholder=""
                        value={formData.state}
                        onChangeText={(value) => handleInputChange('state', value)}
                        placeholderTextColor="#999999"
                    />
                </View>

                {formData.latitude !== '' && (

                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Latitude</Text>
                        <TextInput
                            style={[styles.input, styles.disabledInput]}
                            value={formData.latitude}
                            editable={false}
                            placeholderTextColor="#999999"
                        />
                    </View>
                )}

                {formData.longitude !== '' && (

                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Longitude</Text>
                        <TextInput
                            style={[styles.input, styles.disabledInput]}
                            value={formData.longitude}
                            editable={false}
                            placeholderTextColor="#999999"
                        />
                    </View>
                )}

                <View style={styles.fieldContainer}>

                    <Text style={styles.label}>Address Type</Text>
                    <View style={styles.addressTypeContainer}>
                        {['Home', 'Office', 'Others'].map((type) => (
                            <TouchableOpacity
                                key={type}
                                style={[
                                    styles.addressTypeButton,
                                    formData.addressType === type && styles.addressTypeButtonActive
                                ]}
                                onPress={() => handleInputChange('addressType', type)}
                                activeOpacity={0.7}
                            >
                                <Text
                                    style={[
                                        styles.addressTypeText,
                                        formData.addressType === type && styles.addressTypeTextActive
                                    ]}
                                >
                                    {type}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {formData.addressType === 'Others' && (

                    <View style={styles.fieldContainer}>
                        <TextInput
                            style={[styles.input, errors.customAddressType && styles.inputError]}
                            placeholder="e.g. Gym, Friend's house"
                            value={formData.customAddressType}
                            onChangeText={(value) => handleInputChange('customAddressType', value)}
                            placeholderTextColor="#999999"
                        />
                        {errors.customAddressType && <Text style={styles.errorText}>{errors.customAddressType}</Text>}
                    </View>
                )}

                <TouchableOpacity

                    style={styles.checkboxContainer}
                    onPress={() => handleInputChange('isDefault', !formData.isDefault)}
                    activeOpacity={0.7}
                >
                    <View style={styles.checkbox}>
                        {formData.isDefault && (
                            <View style={styles.checkboxChecked} />
                        )}
                    </View>
                    <Text style={styles.checkboxLabel}>Make this as default address</Text>
                </TouchableOpacity>

                <TouchableOpacity

                    style={[styles.submitButton, loading && styles.submitButtonDisabled]}
                    onPress={handleSubmit}
                    disabled={loading}
                    activeOpacity={0.8}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                        <Text style={styles.submitButtonText}>
                            {initialData?.id ? 'SAVE ADDRESS' : 'ADD ADDRESS'}
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffffff',
        width: '90%',
        boxShadow: '0px 4px 4px rgba(0.25, 0.25, 0.25, 0.25)',
        borderRadius: 12,
        margin: 'auto',
        marginTop: 16,
    },
    formContent: {
        padding: 16,
        paddingTop: 8,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    closeButton: {
        padding: 4,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: '#000000',
        textAlign: 'center',
    },
    fieldContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 13,
        fontWeight: '400',
        color: '#000000',
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: '#D0D0D0',
        borderRadius: 10,
        padding: 12,

        fontSize: 14,
        color: '#000000',
        backgroundColor: '#FFFFFF',
    },
    inputError: {
        borderColor: '#FF0000',
    },
    disabledInput: {
        backgroundColor: '#F5F5F5',
        color: '#666666',
    },
    errorText: {
        color: '#FF0000',
        fontSize: 12,
        marginTop: 4,
    },
    inputWithLoader: {
        position: 'relative',
    },
    loader: {
        position: 'absolute',
        right: 12,
        top: 12,
    },
    mapContainer: {
        marginBottom: 20,
        borderRadius: 12,
        overflow: 'hidden',
    },
    addressTypeContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 8,
    },
    addressTypeButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#D0D0D0',
        borderRadius: 20,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    addressTypeButtonActive: {
        backgroundColor: '#FFC107',
        borderColor: '#FFC107',
    },
    addressTypeText: {
        fontSize: 13,
        fontWeight: '500',
        color: '#666666',
    },
    addressTypeTextActive: {
        color: '#000000',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 4,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#00BCD4',
        borderRadius: 4,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        width: 12,
        height: 12,
        backgroundColor: '#00BCD4',
        borderRadius: 2,
    },
    checkboxLabel: {
        fontSize: 13,
        color: '#000000',
    },
    submitButton: {
        backgroundColor: '#00A1A5',
        paddingVertical: 14,
        borderRadius: 24,
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 24,
    },
    submitButtonDisabled: {
        opacity: 0.6,
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
        letterSpacing: 2.33,
    },
});

export default AddressForm;

