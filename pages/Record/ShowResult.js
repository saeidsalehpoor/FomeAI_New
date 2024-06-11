import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Provider as PaperProvider } from 'react-native-paper';
import { Video } from 'expo-av';

const ShowResult = ({ route }) => {
    const { processedS3Uri, suggestion, count } = route.params || {};


    const getVideoUri = (s3Uri) => {
        console.log('Received S3 URI:', s3Uri);
        // // Construct the URL using the standard format
        // const key = s3Uri.split('s3://vidaccess/')[1];
        // console.log(key)
        return `https://vidaccess.s3.amazonaws.com/OUTPUT/${s3Uri}`;
    };

    const videoUri = getVideoUri(processedS3Uri);
    console.log('Final Video URI:', videoUri);


    const videoError = (error) => {
        console.log('Video error: ', error);
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                <Card style={styles.card}>
                    <Card.Content>
                        <Text style={styles.title}>Processed Video</Text>
                        <Video
                            source={{ uri: videoUri }}
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            resizeMode="contain"
                            shouldPlay
                            isLooping
                            onError={videoError}
                            style={styles.video}
                        />
                        <Text style={styles.resultText}>Suggestion: {suggestion}</Text>
                        <Text style={styles.resultText}>Successful Count: {count}</Text>
                    </Card.Content>
                </Card>
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
    },
    card: {
        width: '100%',
        marginBottom: 20,
    },
    video: {
        width: '100%',
        height: 300,
        backgroundColor: 'black',
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    resultText: {
        fontSize: 18,
        marginBottom: 5,
    },
});

export default ShowResult;