import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { fetchLocationByPincode, isValidPincode } from '../../utils/pincodeService';

const AddressForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        pincode: '',
        city: '',
        state: '',
        addressDetails: '',
        locality: '',
        landmark: '',
        phoneNumber: '',
        addressType: 'Home',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [pincodeLoading, setPincodeLoading] = useState(false);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handlePincodeChange = async (value) => {
        // Only allow numbers
        const numericValue = value.replace(/[^0-9]/g, '');
        handleInputChange('pincode', numericValue);

        // Auto-fetch city and state when pincode is 6 digits
        if (numericValue.length === 6) {
            setPincodeLoading(true);
            try {
                const location = await fetchLocationByPincode(numericValue);
                if (location) {
                    setFormData(prev => ({
                        ...prev,
                        city: location.city,
                        state: location.state,
                    }));
                    setErrors(prev => ({ ...prev, pincode: '' }));
                } else {
                    setErrors(prev => ({
                        ...prev,
                        pincode: 'Invalid pincode. Please check and try again.'
                    }));
                    setFormData(prev => ({ ...prev, city: '', state: '' }));
                }
            } catch (error) {
                setErrors(prev => ({ ...prev, pincode: error.message }));
                setFormData(prev => ({ ...prev, city: '', state: '' }));
            } finally {
                setPincodeLoading(false);
            }
        } else if (numericValue.length < 6) {
            // Clear city and state if pincode is incomplete
            setFormData(prev => ({ ...prev, city: '', state: '' }));
        }
    };

    const handlePhoneChange = (value) => {
        const numericValue = value.replace(/[^0-9]/g, '');
        if (numericValue.length <= 10) {
            handleInputChange('phoneNumber', numericValue);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (!formData.pincode) {
            newErrors.pincode = 'Pincode is required';
        } else if (!isValidPincode(formData.pincode)) {
            newErrors.pincode = 'Please enter a valid 6-digit pincode';
        }

        if (!formData.city) {
            newErrors.city = 'City is required';
        }

        if (!formData.state) {
            newErrors.state = 'State is required';
        }

        if (!formData.addressDetails.trim()) {
            newErrors.addressDetails = 'Address details are required';
        }

        if (!formData.locality.trim()) {
            newErrors.locality = 'Locality is required';
        }

        if (!formData.phoneNumber) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (formData.phoneNumber.length !== 10) {
            newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            setLoading(true);
            // Simulate API call
            setTimeout(() => {
                setLoading(false);
                if (onSubmit) {
                    onSubmit(formData);
                }
            }, 1000);
        }
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.formContent}>
                {/* Full Name */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Full Name *</Text>
                    <TextInput
                        style={[styles.input, errors.fullName && styles.inputError]}
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChangeText={(value) => handleInputChange('fullName', value)}
                        placeholderTextColor="#999999"
                    />
                    {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
                </View>

                {/* Pincode */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Pincode *</Text>
                    <View style={styles.inputWithLoader}>
                        <TextInput
                            style={[styles.input, errors.pincode && styles.inputError]}
                            placeholder="Enter 6-digit pincode"
                            value={formData.pincode}
                            onChangeText={handlePincodeChange}
                            keyboardType="numeric"
                            maxLength={6}
                            placeholderTextColor="#999999"
                        />
                        {pincodeLoading && (
                            <ActivityIndicator
                                size="small"
                                color="#00B0B5"
                                style={styles.loader}
                            />
                        )}
                    </View>
                    {errors.pincode && <Text style={styles.errorText}>{errors.pincode}</Text>}
                </View>

                {/* City and State Row */}
                <View style={styles.rowContainer}>
                    <View style={[styles.fieldContainer, styles.halfWidth]}>
                        <Text style={styles.label}>City *</Text>
                        <TextInput
                            style={[styles.input, styles.disabledInput]}
                            placeholder="Auto-filled"
                            value={formData.city}
                            editable={false}
                            placeholderTextColor="#999999"
                        />
                    </View>

                    <View style={[styles.fieldContainer, styles.halfWidth]}>
                        <Text style={styles.label}>State *</Text>
                        <TextInput
                            style={[styles.input, styles.disabledInput]}
                            placeholder="Auto-filled"
                            value={formData.state}
                            editable={false}
                            placeholderTextColor="#999999"
                        />
                    </View>
                </View>

                {/* Address Details */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Address Details *</Text>
                    <TextInput
                        style={[styles.input, styles.textArea, errors.addressDetails && styles.inputError]}
                        placeholder="Flat, House no., Building, Company, Apartment"
                        value={formData.addressDetails}
                        onChangeText={(value) => handleInputChange('addressDetails', value)}
                        multiline
                        numberOfLines={3}
                        textAlignVertical="top"
                        placeholderTextColor="#999999"
                    />
                    {errors.addressDetails && <Text style={styles.errorText}>{errors.addressDetails}</Text>}
                </View>

                {/* Locality */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Locality *</Text>
                    <TextInput
                        style={[styles.input, errors.locality && styles.inputError]}
                        placeholder="Area, Street, Sector, Village"
                        value={formData.locality}
                        onChangeText={(value) => handleInputChange('locality', value)}
                        placeholderTextColor="#999999"
                    />
                    {errors.locality && <Text style={styles.errorText}>{errors.locality}</Text>}
                </View>

                {/* Landmark */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Landmark (Optional)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="E.g. Near Apollo Hospital"
                        value={formData.landmark}
                        onChangeText={(value) => handleInputChange('landmark', value)}
                        placeholderTextColor="#999999"
                    />
                </View>

                {/* Phone Number */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Phone Number *</Text>
                    <View style={styles.phoneContainer}>
                        <Text style={styles.phonePrefix}>+91</Text>
                        <TextInput
                            style={[styles.input, styles.phoneInput, errors.phoneNumber && styles.inputError]}
                            placeholder="Enter 10-digit mobile number"
                            value={formData.phoneNumber}
                            onChangeText={handlePhoneChange}
                            keyboardType="phone-pad"
                            maxLength={10}
                            placeholderTextColor="#999999"
                        />
                    </View>
                    {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}
                </View>

                {/* Address Type */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Address Type *</Text>
                    <View style={styles.addressTypeContainer}>
                        {['Home', 'Work', 'Other'].map((type) => (
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

                {/* Submit Button */}
                <TouchableOpacity
                    style={[styles.submitButton, loading && styles.submitButtonDisabled]}
                    onPress={handleSubmit}
                    disabled={loading}
                    activeOpacity={0.8}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                        <Text style={styles.submitButtonText}>SAVE ADDRESS</Text>
                    )}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    formContent: {
        padding: 16,
    },
    fieldContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 4,
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
    textArea: {
        height: 80,
        paddingTop: 12,
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
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfWidth: {
        width: '48%',
    },
    phoneContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    phonePrefix: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333333',
        marginRight: 8,
        paddingVertical: 12,
    },
    phoneInput: {
        flex: 1,
    },
    addressTypeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    addressTypeButton: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 4,
        marginHorizontal: 4,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    addressTypeButtonActive: {
        backgroundColor: '#00B0B5',
        borderColor: '#00B0B5',
    },
    addressTypeText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666666',
    },
    addressTypeTextActive: {
        color: '#FFFFFF',
    },
    submitButton: {
        backgroundColor: '#00B0B5',
        paddingVertical: 16,
        borderRadius: 4,
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 24,
    },
    submitButtonDisabled: {
        opacity: 0.6,
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
});

export default AddressForm;
