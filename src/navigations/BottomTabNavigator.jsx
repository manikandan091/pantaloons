import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/HomeScreen';
import WishlistScreen from '../screen/WishlistScreen';
import InstoreScreen from '../screen/InstoreScreen';
import SearchScreen from '../screen/SearchScreen';
import ProfileScreen from '../screen/ProfileScreen';

const Tab = createBottomTabNavigator();

const FloatingInstoreButton = ({ children, onPress }) => (
    <View style={styles.floatingContainer}>
        <TouchableOpacity
            style={styles.floatingButton}
            onPress={onPress}
            activeOpacity={0.8}
        >
            {children}
        </TouchableOpacity>
    </View>
);

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarActiveTintColor: '#009688',
                tabBarInactiveTintColor: '#3cc6b8',
                tabBarStyle: {
                    height: 70,
                    backgroundColor: 'white',
                    borderTopWidth: 1,
                    borderTopColor: '#eee',
                    elevation: 8,
                    paddingBottom: 10,
                    paddingTop: 10,
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: 'bold',
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Text style={{ fontSize: 20, color, fontWeight: 'bold' }}>Home</Text>
                    ),
                }}
            />
            <Tab.Screen
                name="Wishlist"
                component={WishlistScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Text style={{ fontSize: 20, color, fontWeight: 'bold' }}>Wishlist</Text>
                    ),
                }}
            />
            <Tab.Screen
                name="Instore"
                component={InstoreScreen}
                options={{
                    tabBarLabel: 'Instore',
                    tabBarButton: (props) => (
                        <FloatingInstoreButton {...props}>
                            <Text style={styles.floatingIcon}>Instore</Text>
                            <Text style={styles.floatingLabel}>Instore</Text>
                        </FloatingInstoreButton>
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Text style={{ fontSize: 20, color, fontWeight: 'bold' }}>Search</Text>
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Text style={{ fontSize: 20, color, fontWeight: 'bold' }}>Profile</Text>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    floatingContainer: {
        top: -30, 
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    floatingButton: {
        width: 65,
        height: 65,
        borderRadius: 32.5,
        backgroundColor: '#00BFA5', 
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        borderWidth: 4,
        borderColor: 'white',
    },
    floatingIcon: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
    },
    floatingLabel: {
        position: 'absolute',
        bottom: -25, 
        fontSize: 10,
        color: '#009688',
        fontWeight: 'bold',
        width: 60,
        textAlign: 'center',
    },
});

export default BottomTabNavigator;
