import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Text, List, Avatar } from 'react-native-paper';
import { ProgressBar } from 'react-native-paper';

const ActivitiesScreen = () => {
    const [selectedActivity, setSelectedActivity] = useState('');
    const [activityPercentage, setActivityPercentage] = useState(0);
    const [filteredActivities, setFilteredActivities] = useState([]);

    const activities = ['Plank', 'Pushup'];
    const action = selectedActivity ? selectedActivity : 'exercise';

    const calculatePercentage = () => {
        const randomPercentage = Math.floor(Math.random() * 100);
        setActivityPercentage(randomPercentage);
    };

    // Define static recent activities. we will update this to get from API when we have the final data result
    const staticRecentActivities = [
        {
            dateTime: "2024-06-15 10:30 AM",
            action: "Pushup",
            correctForms: 8,
            totalReps: 20,
            timeTaken: 45,
            image: require('./push-ups.jpg'),
        },
        {
            dateTime: "2024-016-06 08:25 AM",
            action: "Pushup",
            correctForms: 13,
            totalReps: 43,
            timeTaken: 55,
            image: require('./push-ups.jpg'),
        },
        {
            dateTime: "2024-06-14 09:45 PM",
            action: "Plank",
            correctForms: 15,
            totalReps: 15,
            timeTaken: 60,
            image: require('./plank.jpg'),
        },
        {
            dateTime: "2024-06-13 12:15 PM",
            action: "Pushup",
            correctForms: 10,
            totalReps: 25,
            timeTaken: 50,
            image: require('./push-ups.jpg'),
        },
        {
            dateTime: "2024-06-14 12:15 PM",
            action: "Pushup",
            correctForms: 14,
            totalReps: 30,
            timeTaken: 55,
            image: require('./push-ups.jpg'),
        },
        {
            dateTime: "2024-04-12 09:45 PM",
            action: "Plank",
            correctForms: 13,
            totalReps: 36,
            timeTaken: 40,
            image: require('./plank.jpg'),
        },
    ];

    useEffect(() => {
        if (selectedActivity) {
            const filtered = staticRecentActivities.filter(activity => activity.action === selectedActivity);
            setFilteredActivities(filtered);
        } else {
            setFilteredActivities(staticRecentActivities);
        }
    }, [selectedActivity]);

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={selectedActivity}
                onValueChange={(itemValue) => {
                    setSelectedActivity(itemValue);
                    calculatePercentage();
                }}
                style={styles.picker}
            >
                <Picker.Item label="Select an activity" value="" />
                {activities.map((activity, index) => (
                    <Picker.Item key={index} label={activity} value={activity} />
                ))}
            </Picker>
            <View style={styles.progressContainer}>
                <View style={styles.circle}>
                    <Text style={styles.circleText}>{activityPercentage}%</Text>
                </View>
                <ProgressBar progress={activityPercentage / 100} color='#4979D0' />
                <Text style={styles.progressText}>
                    <Text style={styles.staticText}>You have performed </Text>
                    <Text style={styles.blueText}>{activityPercentage}%</Text>
                    <Text style={styles.staticText}> of </Text>
                    <Text style={styles.blueText}>{action}</Text>
                    <Text style={styles.staticText}> with correct and safe form.</Text>
                </Text>
            </View>
            <View style={styles.recentActivitiesContainer}>
                <Text style={styles.recentActivitiesHeader}>Recent Activities</Text>
                <ScrollView style={styles.scrollView}>
                    <List.Section>
                        {filteredActivities.map((activity, index) => (
                            <List.Item
                                key={index}
                                title={activity.action}
                                description={
                                    <View style={styles.activityDetails}>
                                        <Avatar.Image size={60} source={activity.image} />
                                        <View style={styles.detailsText}>
                                            <Text style={styles.detailsLine}>
                                                Reps with correct form: {activity.correctForms}
                                            </Text>
                                            <Text style={styles.detailsLine}>
                                                Total Reps: {activity.totalReps} | Time Taken: {activity.timeTaken} sec
                                            </Text>
                                            <Text style={styles.dateTime}>{activity.dateTime}</Text>
                                        </View>
                                    </View>
                                }
                            />
                        ))}
                    </List.Section>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    picker: {
        width: '80%',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    progressContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    progressText: {
        marginTop: 10,
        fontSize: 16,
        marginLeft: 20,
        marginRight: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    staticText: {
        color: 'black',
    },
    blueText: {
        color: '#4979D0',
        fontWeight: 'bold',
    },
    circle: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: '#4979D0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fafcfc',
    },
    recentActivitiesContainer: {
        flex: 1,  
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        marginTop: 20,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    recentActivitiesHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    scrollView: {
        flex: 1,
    },
    activityDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailsText: {
        marginLeft: 10,
        flex: 1,
    },
    detailsLine: {
        marginBottom: 5,
    },
    dateTime: {
        color: '#888',
        fontSize: 12,
    },
});


export default ActivitiesScreen;