import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ActivitiesScreen from './ActivitiesScreen';

const Tab = createMaterialTopTabNavigator();

const AchievementsScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Achievements Screen</Text>
        </View>
    );
};

const You = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Activities" component={ActivitiesScreen} />
            <Tab.Screen name="Achievements" component={AchievementsScreen} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default You;
