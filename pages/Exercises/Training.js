// Training.js
import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Training = ({ route, navigation }) => {
    const { item } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{item.name}</Text>
            <Image source={{ uri: item.image2 }} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.form}>Proper Form</Text>
                <Text style={styles.description}>{item.properform}</Text>
                <Button color='#cf3e7a' title="Record" onPress={() => alert('Recording...')} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 300,
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    form: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'justify',
    },
});

export default Training;
