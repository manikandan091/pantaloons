import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screen/ProfileScreen';
import AddressScreen from '../screen/AddressScreen';

const Stack = createStackNavigator();

const ProfileStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="ProfileMain"
                component={ProfileScreen}
            />
            <Stack.Screen
                name="Address"
                component={AddressScreen}
            />
        </Stack.Navigator>
    );
};

export default ProfileStackNavigator;
