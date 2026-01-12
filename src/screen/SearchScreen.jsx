import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MarqueeHeader from '../components/common/MarqueeHeader';

import { SafeAreaView } from 'react-native-safe-area-context';

const SearchScreen = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <MarqueeHeader />
            <View style={styles.container}>
                <Text style={styles.text}>Search Screen</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default SearchScreen;
