import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import axios from 'axios';
import { API_URL } from '@env';
import styles from './Register.styles';

const Register = ({ navigation }) => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {

    const data = {
        password: password,
        displayname: displayName,
        dateofbirth: '2024-05-16',
        gender: 'M',
        email: email
      };
    
    const res = axios.post(`${API_URL}/users/register`, JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json"
    }
    })
    .then((response) => {
        console.log(response.data.message);
        navigation.navigate('Login');
    })
    .catch((error) => {
        console.error(error.message);
        console.log(res.message);
    });

    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register</Text>
      <TextInput
        label="Display Name"
        value={displayName}
        onChangeText={text => setDisplayName(text)}
        style={styles.input}
        mode="outlined"
      />
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
      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        Register
      </Button>
    </View>
  );
};

export default Register;
