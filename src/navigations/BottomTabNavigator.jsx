import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/HomeScreen';
import WishlistScreen from '../screen/WishlistScreen';
import SearchScreen from '../screen/SearchScreen';
import ProfileScreen from '../screen/ProfileScreen';

const Tab = createBottomTabNavigator();



const TabButton = (props) => {
    const { accessibilityState, style, children } = props;
    const focused = accessibilityState ? accessibilityState.selected : false;

    return (
        <TouchableOpacity
            {...props}
            style={[style, styles.tabBtn]}
        >
            {focused && <View style={styles.activeIndicator} />}
            {children}
        </TouchableOpacity>
    );
};

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'black',
                tabBarStyle: {
                    height: 60,
                    backgroundColor: 'white',
                    borderTopWidth: 1,
                    borderTopColor: '#eeeeeeff',
                    elevation: 8,
                    paddingBottom: 5,
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '100',
                    marginBottom: 5,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? 'grid' : 'grid-outline'}
                            size={24}
                            color={"#00B0B5"}
                        />
                    ),
                    tabBarButton: (props) => <TabButton {...props} />,
                }}
            />
            <Tab.Screen
                name="Wishlist"
                component={WishlistScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? 'heart' : 'heart-outline'}
                            size={24}
                            color={"#00B0B5"}
                        />
                    ),
                    tabBarButton: (props) => <TabButton {...props} />,
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? 'search' : 'search-outline'}
                            size={24}
                            color={"#00B0B5"}
                        />
                    ),
                    tabBarButton: (props) => <TabButton {...props} />,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? 'person' : 'person-outline'}
                            size={24}
                            color={"#00B0B5"}
                        />
                    ),
                    tabBarButton: (props) => <TabButton {...props} />,
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBtn: {
        position: 'relative',
    },
    activeIndicator: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: '#009688',
        width: '100%',
    },
});

export default BottomTabNavigator;
