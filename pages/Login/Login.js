import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import axios from 'axios';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Login.styles';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      console.log(API_URL);
      const response = await axios.post(`${API_URL}/users/login`, { email, password });
      const { token, user } = response.data;

      // Store token in AsyncStorage
      await AsyncStorage.setItem('token', token);

      // Extract userId from the user object
      const userId = user.id;
      const displayName = user.displayname;

      navigation.navigate('Home', { userId, displayName });
    } catch (error) {
      // Handle different error responses
      if (error.response) {
        if (error.response.status === 400) {
          Alert.alert('Error', 'Email or password is missing');
        } else if (error.response.status === 404) {
          Alert.alert('Error', 'User not found');
        } else if (error.response.status === 401) {
          Alert.alert('Error', 'Incorrect password');
        } else {
          Alert.alert('Error', 'Failed to log in');
        }
      } else if (error.request) {
        Alert.alert('Error', 'No response from the server. Please try again later.');
      } else {
        Alert.alert('Error', 'An unknown error occurred. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        style={styles.input}
        mode="outlined"
      />
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
      <Button mode="text" onPress={() => navigation.navigate('Register')} style={styles.link}>
        Don't have an account? Register
      </Button>
    </View>
  );
};

export default Login;
