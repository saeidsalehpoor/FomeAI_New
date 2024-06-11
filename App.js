import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalFontStyle, updateGlobalFontStyle } from './globalStyles';
import styles from './App.styles';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Login/Register';
import Training from './pages/Exercises/Training';
//import ShowResult from './pages/Record/ShowResult';
import Record from './pages/Record/Record';



SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

const CustomSplashScreen = () => {
  return (
    <View style={styles.splashContainer}>
      <Text style={styles.splashText}>Loading, please wait...</Text>
      <Entypo name="rocket" size={30} color="white" />
    </View>
  );
};

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontSize, setFontSize] = useState(30); 

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Entypo.font);
        await new Promise(resolve => setTimeout(resolve, 2000));

        const fontSettings = await AsyncStorage.getItem('fontSettings');
        if (fontSettings) {
          const parsedFontSettings = JSON.parse(fontSettings);
          updateGlobalFontStyle(parsedFontSettings);
        }

      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return <CustomSplashScreen />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen
              name="Home"
              component={Home}
              initialParams={{ userId: '123' }}
            />
            <Stack.Screen name="Training" component={Training} />
            <Stack.Screen name="Record" component={Record} />
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
