export const GOOGLE_MAPS_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

/**
 * Reverse Geocode: Get address details from latitude and longitude
 * @param {number} latitude 
 * @param {number} longitude 
 * @param {string} apiKey 
 * @returns {Promise<Object|null>}
 */
export const reverseGeocode = async (latitude, longitude, apiKey) => {
    try {
        const response = await fetch(
            `${GOOGLE_MAPS_API_URL}?latlng=${latitude},${longitude}&key=${apiKey}`
        );
        const data = await response.json();

        if (data.status === 'OK' && data.results.length > 0) {
            return parseGeocodeResult(data.results[0]);
        }
        console.warn('Reverse Geocoding failed:', data.status);
        return null;
    } catch (error) {
        console.error('Error in reverseGeocode:', error);
        return null;
    }
};

/**
 * Forward Geocode: Get coordinates from address/city string
 * @param {string} address 
 * @param {string} apiKey 
 * @returns {Promise<Object|null>}
 */
export const forwardGeocode = async (address, apiKey) => {
    try {
        const response = await fetch(
            `${GOOGLE_MAPS_API_URL}?address=${encodeURIComponent(address)}&key=${apiKey}`
        );
        const data = await response.json();

        if (data.status === 'OK' && data.results.length > 0) {
            const result = data.results[0];
            const { lat, lng } = result.geometry.location;
            return {
                latitude: lat,
                longitude: lng,
                ...parseGeocodeResult(result)
            };
        }
        console.warn('Forward Geocoding failed:', data.status);
        return null;
    } catch (error) {
        console.error('Error in forwardGeocode:', error);
        return null;
    }
};

/**
 * Helper to extract relevant address components from Google API response
 * @param {Object} result - Google Maps API result object
 */
const parseGeocodeResult = (result) => {
    const components = result.address_components;

    const getComponent = (types) => {
        return components.find(c => types.every(t => c.types.includes(t)))?.long_name || '';
    };

    return {
        houseNo: getComponent(['street_number']) || '',
        streetName: getComponent(['route']) || '',
        area: getComponent(['sublocality', 'sublocality_level_1']) || getComponent(['neighborhood']) || '',
        city: getComponent(['locality']) || getComponent(['administrative_area_level_2']) || '',
        state: getComponent(['administrative_area_level_1']) || '',
        pincode: getComponent(['postal_code']) || '',
        landmark: getComponent(['point_of_interest']) || '',
        fullAddress: result.formatted_address
    };
};
