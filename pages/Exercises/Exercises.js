import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import HorizontalCardSlider from './HorizontalCardSlider';

const exercises = [
    {
        id: 1,
        name: 'Plank',
        scores: 'Previous score: 3   Personal best: 5',
        description: 'Planks are a fundamental bodyweight exercise that primarily target the chest muscles (pectoralis major), shoulders (deltoids), and triceps. \n\nPlanks can be performed anywhere and require no equipment, making them a versatile and effective exercise for building strength and endurance.',
        properform: 'Starting Position: Begin in a high plank position with hands placed slightly wider than shoulder-width apart and feet together. \n\nDescent: Lower your body by bending your elbows, keeping them at a 45-degree angle to your body. Maintain a straight line from head to heels. \n\nAscent: Push through your palms to straighten your arms and return to the starting position.',
        image: 'https://www.realsimple.com/thmb/rEmEAm4vfx67IRbFgoVA0RzhTgI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/health-benefits-of-pushups-GettyImages-498315681-7008d40842444270868c88b516496884.jpg',
        image2: 'https://as1.ftcdn.net/v2/jpg/02/51/72/70/1000_F_251727033_Sp140eSaObNSjHvHfyfUoOiWejqKK1rd.jpg',
    },
    {
        id: 2,
        name: 'Push-ups',
        scores: 'Previous score: 4   Personal best: 6',
        description: 'Push-ups are a fundamental bodyweight exercise that primarily target the chest muscles (pectoralis major), shoulders (deltoids), and triceps. \n\nPush-ups can be performed anywhere and require no equipment, making them a versatile and effective exercise for building strength and endurance.',
        properform: 'Starting Position: Begin in a high plank position with hands placed slightly wider than shoulder-width apart and feet together. \n\nDescent: Lower your body by bending your elbows, keeping them at a 45-degree angle to your body.',
        image: 'https://st2.depositphotos.com/2171279/9077/i/950/depositphotos_90778954-stock-photo-woman-doing-plank-exercise-in.jpg',
        image2: 'https://www.shutterstock.com/image-vector/step-instruction-push-woman-cartoon-600nw-454190938.jpg'
    },
];


const Exercises = ({ route}) => {
    const { userId, displayName } = route.params;

    // Split the displayName on space and get the first part
    const displayNameParts = displayName.split(' ');
    const firstName = displayNameParts[0];

    return (
        <PaperProvider>
            <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                    <Text style={styles.welcomeText}>Welcome back, </Text>
                    <Text style={styles.displayName}>{firstName}</Text>
                </View>
                <Text style={styles.exercisesTitle}>Exercises</Text>
                <HorizontalCardSlider data={exercises} />
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
});

export default Exercises;
