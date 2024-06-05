import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const You = () => {
    return (
        <View style={styles.container}><Text>Select an exercise to see details</Text></View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
    },
});

export default You;
