
const pincodeDatabase = {

    '110001': { city: 'New Delhi', state: 'Delhi' },
    '400001': { city: 'Mumbai', state: 'Maharashtra' },
    '560001': { city: 'Bangalore', state: 'Karnataka' },
    '600001': { city: 'Chennai', state: 'Tamil Nadu' },
    '700001': { city: 'Kolkata', state: 'West Bengal' },
    '500001': { city: 'Hyderabad', state: 'Telangana' },
    '380001': { city: 'Ahmedabad', state: 'Gujarat' },
    '411001': { city: 'Pune', state: 'Maharashtra' },
    '641001': { city: 'Coimbatore', state: 'Tamil Nadu' },
    '302001': { city: 'Jaipur', state: 'Rajasthan' },
    '226001': { city: 'Lucknow', state: 'Uttar Pradesh' },
    '160001': { city: 'Chandigarh', state: 'Chandigarh' },
    '800001': { city: 'Patna', state: 'Bihar' },
    '751001': { city: 'Bhubaneswar', state: 'Odisha' },
    '682001': { city: 'Kochi', state: 'Kerala' },
};

/**
 * Fetch city and state based on pincode
 * @param {string} pincode - 6 digit pincode
 * @returns {Promise<{city: string, state: string} | null>}
 */
export const fetchLocationByPincode = async (pincode) => {
    if (!pincode || pincode.length !== 6 || !/^\d{6}$/.test(pincode)) {
        throw new Error('Invalid pincode format. Please enter a 6-digit pincode.');
    }


    await new Promise(resolve => setTimeout(resolve, 500));


    const location = pincodeDatabase[pincode];


    if (location) {
        return location;
    }

    try {
        return null;
    } catch (error) {
        console.error('Error fetching pincode data:', error);
        return null;
    }
};


/**
 * Validate pincode format
 * @param {string} pincode
 * @returns {boolean}
 */
export const isValidPincode = (pincode) => {
    return /^\d{6}$/.test(pincode);
};

/**
 * Add a new pincode to the local database (for testing)
 * @param {string} pincode
 * @param {string} city
 * @param {string} state
 */
export const addPincodeToDatabase = (pincode, city, state) => {
    pincodeDatabase[pincode] = { city, state };
};
