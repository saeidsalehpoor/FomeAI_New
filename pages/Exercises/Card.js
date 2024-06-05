// Card.js
import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { Card as PaperCard } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Card = ({ item }) => {
    const navigation = useNavigation();

    const handleStartTraining = () => {
        navigation.navigate('Training', { item });
    };

    return (
        <PaperCard style={styles.card}>
            <PaperCard.Cover source={{ uri: item.image }} style={styles.image} />
            <PaperCard.Content>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.score}>{item.scores}</Text>
                <Text style={styles.description}>{item.description}</Text>
                {/*
                <Text style={styles.form}>Proper Form</Text>
                <Text style={styles.description}>{item.properform}</Text>
    */}
            </PaperCard.Content>
            <PaperCard.Actions style={styles.buttonContainer}>
                <Button title="Start Training" onPress={handleStartTraining} color="#ff69b4" />
            </PaperCard.Actions>
        </PaperCard>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 10,
        width: 300,
    },
    image: {
        height: 150,
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    form: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    score: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 50,
        textAlign: 'justify',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Card;
