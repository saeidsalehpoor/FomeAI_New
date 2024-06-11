import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Video } from 'expo-av';
import axios from 'axios';
import { API_URL } from '@env';
import { Button, TextInput, Card, Title, Paragraph, Provider as PaperProvider } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';

const Record = ({ route, navigation }) => {
    const { userId } = route.params;
    const [videoUri, setVideoUri] = useState(null);
    const [savedUri, setSavedUri] = useState(null);
    const [exerciseType, setExerciseType] = useState('');
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Plank', value: 'plank' },
        { label: 'Push-ups', value: 'pushup' }
        // Add more exercises as needed
    ]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera permissions to make this work!');
            }
        })();
    }, []);

    const takeVideo = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            setVideoUri(result.assets[0].uri);
            console.log('Video recorded at: ', result.assets[0].uri);
            saveVideo(result.assets[0].uri);
        } else {
            console.log('Video recording was cancelled');
        }
    };

    const selectVideo = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            setVideoUri(result.assets[0].uri);
            console.log('Video selected: ', result.assets[0].uri);
            saveVideo(result.assets[0].uri);
        } else {
            console.log('Video selection was cancelled');
        }
    };

    const saveVideo = async (uri) => {
        const fileName = uri.split('/').pop();
        const newPath = `${FileSystem.documentDirectory}${fileName}`;

        try {
            await FileSystem.moveAsync({
                from: uri,
                to: newPath,
            });
            setSavedUri(newPath);
            console.log('Video saved to: ', newPath);
        } catch (error) {
            console.log('Error saving video: ', error);
        }
    };

    const discardVideo = async () => {
        if (savedUri) {
            try {
                await FileSystem.deleteAsync(savedUri);
                setSavedUri(null);
                setVideoUri(null);
                setExerciseType('');
                console.log('Video discarded and deleted.');
            } catch (error) {
                console.log('Error discarding video: ', error);
            }
        }
    };

    const showResult = async () => {
        const formData = new FormData();
        formData.append('file', {
            uri: savedUri,
            name: savedUri.split('/').pop(),
            type: 'video/mp4'
        });
        formData.append('action', exerciseType);

        setLoading(true);

        try {
            const response = await axios.post('http://4.237.66.89:3000/upload?file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Server response:', response.data);

            const { uploadedS3Uri, processedS3Uri, outputData } = response.data;
            const { suggestion, information } = outputData.result;
            const { count } = information; 
         
            // Navigate to ResultScreen with the result data
            navigation.navigate('You', {
                processedS3Uri: processedS3Uri.split('/').pop(), // Extracting file name
                suggestion,
                count
            });
        } catch (error) {
            console.log('Error showing result: ', error);
            Alert.alert('Error', 'There was an error fetching the result.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                {savedUri && (
                    <Card style={styles.card}>
                        <Card.Content>
                            <Title>Video Details</Title>
                            <Paragraph>Video saved at: {savedUri}</Paragraph>
                            <Video
                                source={{ uri: savedUri }}
                                rate={1.0}
                                volume={1.0}
                                isMuted={false}
                                resizeMode="contain"
                                shouldPlay
                                isLooping
                                style={styles.video}
                            />
                            <DropDownPicker
                                open={open}
                                value={exerciseType}
                                items={items}
                                setOpen={setOpen}
                                setValue={setExerciseType}
                                setItems={setItems}
                                placeholder="Select Exercise Type"
                                style={styles.input}
                            />
                            <TextInput
                                label="Video Path"
                                value={savedUri}
                                editable={false}
                                mode="outlined"
                                style={styles.input}
                            />
                            <Button mode="contained" onPress={discardVideo} style={styles.button}>
                                Discard Video
                            </Button>
                            <Button mode="contained" onPress={showResult} style={styles.button} disabled={loading}>
                                {loading ? <ActivityIndicator color="#fff" /> : 'Show Result'}
                            </Button>
                        </Card.Content>
                    </Card>
                )}
                <Button mode="contained" onPress={takeVideo} style={styles.recordButton}>
                    Record Video
                </Button>
                <Button mode="contained" onPress={selectVideo} style={styles.recordButton}>
                    Select Video from Gallery
                </Button>
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
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
    input: {
        marginBottom: 10,
    },
    button: {
        marginTop: 10,
    },
    recordButton: {
        marginTop: 20,
    },
});

export default Record;