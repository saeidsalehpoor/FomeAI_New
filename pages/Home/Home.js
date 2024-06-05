// Home.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Exercises from '../Exercises/Exercises';
import You from '../You/You';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const Home = ({ route }) => {
    const { userId, displayName } = route.params;

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Exercises') {
                        iconName = 'clipboard-text';
                    } else if (route.name === 'You') {
                        iconName = 'format-list-bulleted';
                    }

                    return <Icon name={iconName} size={30} color={color} />;
                },
                tabBarLabelStyle: { fontSize: 14 },
                tabBarStyle: { height: 60 },
                tabBarActiveTintColor: '#6200ee', // Active tab color
                tabBarInactiveTintColor: '#8b729e', // Inactive tab color
            })}
        >
            <Tab.Screen 
                name="Exercises" 
                component={Exercises} 
                initialParams={{ userId, displayName }}
                options={{ headerShown: false }} 
            />
            <Tab.Screen 
                name="You" 
                component={You} 
                initialParams={{ userId, displayName }} 
                options={{ headerShown: false }} 
            />
        </Tab.Navigator>
    );
};

export default Home;
