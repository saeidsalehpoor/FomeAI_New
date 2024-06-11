import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { Card as PaperCard } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Card = ({ item, userId }) => {
    const navigation = useNavigation();

    const handleStartTraining = () => {
        navigation.navigate('Training', { item, userId });
    };

    return (
        <PaperCard style={styles.card}>
            <PaperCard.Cover source={{ uri: item.image }} style={styles.image} />
            <PaperCard.Content>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.score}>{item.scores}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </PaperCard.Content>
            <View style={styles.buttonContainer}>
                <Button 
                    title="Start Training" 
                    onPress={handleStartTraining} 
                    color="#4979D0" 
                    style={styles.button} 
                />
            </View>
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
        borderBottomLeftRadius: 0, 
        borderBottomRightRadius: 0, 
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    score: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
        textAlign: 'justify',
    },
    buttonContainer: {
        marginLeft: 30, 
        marginRight: 30, 
        marginBottom : 30
    },
    button: {
        alignSelf: 'flex-start', 
        width: 70,
    },
});

export default Card;
