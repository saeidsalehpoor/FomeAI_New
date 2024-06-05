// HorizontalCardSlider.js
import React, { useRef, useState } from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Card from './Card';

const HorizontalCardSlider = ({ data }) => {
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const scrollToIndex = (index) => {
        setCurrentIndex(index);
        flatListRef.current.scrollToIndex({ index, animated: true });
    };

    const handleNext = () => {
        if (currentIndex < data.length - 1) {
            scrollToIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            scrollToIndex(currentIndex - 1);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handlePrev} style={styles.arrowButton}>
                <Icon name="chevron-left" size={30} color="#000" />
            </TouchableOpacity>
            <FlatList
                ref={flatListRef}
                data={data}
                renderItem={({ item }) => <Card item={item} />}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.list}
                onScrollToIndexFailed={() => {}}
            />
            <TouchableOpacity onPress={handleNext} style={styles.arrowButton}>
                <Icon name="chevron-right" size={30} color="#000" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    arrowButton: {
        padding: 10,
    },
    list: {
        flexGrow: 1,
        paddingHorizontal: 0,
    },
});

export default HorizontalCardSlider;
