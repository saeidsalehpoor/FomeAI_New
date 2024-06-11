import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import HorizontalCardSlider from './HorizontalCardSlider';
import axios from 'axios';
import { API_URL } from '@env';

const Exercises = ({ route }) => {

    const { userId, displayName } = route.params;

    // Split the displayName on space and get the first part
    const displayNameParts = displayName.split(' ');
    const firstName = displayNameParts[0];

    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await axios.get(`${API_URL}/actions/actioncard/${userId}`);
                setExercises(response.data.actions);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchExercises();
    }, [userId]);

    if (loading) {
        return (
            <PaperProvider>
                <SafeAreaView style={styles.container}>
                    <Text style={styles.loadingText}>Loading...</Text>
                </SafeAreaView>
            </PaperProvider>
        );
    }

    if (error) {
        return (
            <PaperProvider>
                <SafeAreaView style={styles.container}>
                    <Text style={styles.errorText}>Error: {error}</Text>
                </SafeAreaView>
            </PaperProvider>
        );
    }

    return (
        <PaperProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.welcomeText}>Welcome back, </Text>
                    <Text style={styles.displayName}>{firstName}</Text>
                </View>
                <Text style={styles.exercisesTitle}>Exercises</Text>
                <HorizontalCardSlider data={exercises} userId={userId}/>
            </SafeAreaView>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 50,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    displayName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4979D0', 
        textAlign: 'left',
    },
    exercisesTitle: {
        fontSize: 20,
        //fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 10,
        marginLeft: 50,
    },
    loadingText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
    errorText: {
        fontSize: 18,
        textAlign: 'center',
        color: 'red',
        marginTop: 20,
    },
});

export default Exercises;
