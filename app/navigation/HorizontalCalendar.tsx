import { Colors } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const ITEM_WIDTH = 70;
const ITEM_SPACING = 1;
const SCREEN_WIDTH = Dimensions.get('window').width;
const CENTER_OFFSET = (SCREEN_WIDTH - ITEM_WIDTH) / 4;

const HorizontalCalendar = () => {
    const scrollRef = useRef<ScrollView>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;

    const data = [
        { dayNumber: '01', dayName: 'Segunda-feira' },
        { dayNumber: '02', dayName: 'Terça-feira' },
        { dayNumber: '03', dayName: 'Quarta-feira' },
        { dayNumber: '04', dayName: 'Quinta-feira' },
        { dayNumber: '05', dayName: 'Sexta-feira' },
        { dayNumber: '06', dayName: 'Sábado' },
        { dayNumber: '07', dayName: 'Domingo' },
    ];

    const scrollToIndex = (index: number) => {
        if (index < 0 || index >= data.length) return;
        const x = index * (ITEM_WIDTH + ITEM_SPACING);
        scrollRef.current?.scrollTo({ x, animated: true });
        setCurrentIndex(index);
    };

    const handleNext = () => scrollToIndex(currentIndex + 1);
    const handlePrevious = () => scrollToIndex(currentIndex - 1);

    const onScrollEnd = (e: any) => {
        const x = e.nativeEvent.contentOffset.x;
        const index = Math.round(x / (ITEM_WIDTH + ITEM_SPACING));
        setCurrentIndex(index);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Junho de 2025</Text>

            <View style={styles.row}>
                <TouchableOpacity style={styles.button} onPress={handlePrevious}>
                    <Feather name="chevron-left" size={24} color="black" />
                </TouchableOpacity>

                <Animated.ScrollView
                    ref={scrollRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={ITEM_WIDTH + ITEM_SPACING}
                    decelerationRate="normal"
                    contentContainerStyle={{ paddingHorizontal: CENTER_OFFSET }}
                    onMomentumScrollEnd={onScrollEnd}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={16}
                >
                    {data.map((item, index) => (
                        <Animated.View
                            key={index}
                            style={[
                                styles.card,
                                index === currentIndex && styles.activeCard,
                                {
                                    transform: [
                                        {
                                            scale: scrollX.interpolate({
                                                inputRange: [
                                                    (index - 1) * (ITEM_WIDTH + ITEM_SPACING),
                                                    index * (ITEM_WIDTH + ITEM_SPACING),
                                                    (index + 1) * (ITEM_WIDTH + ITEM_SPACING),
                                                ],
                                                outputRange: [0.9, 1, 0.9],
                                                extrapolate: 'clamp',
                                            }),
                                        },
                                    ],
                                },
                            ]}
                        >
                            <Text style={[styles.dayNumber, index === currentIndex && styles.activeText]}>
                                {item.dayNumber}
                            </Text>
                            <Text style={[styles.dayName, index === currentIndex && styles.activeText]}>
                                {item.dayName}
                            </Text>
                        </Animated.View>

                    ))}
                </Animated.ScrollView>

                <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <Feather name="chevron-right" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 10, borderBottomColor: 'black', borderBottomWidth: 1 },
    title: { textAlign: 'center', fontSize: 20, marginBottom: 20 },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        
    },
    card: {
        width: ITEM_WIDTH,
        height: 60,
        marginHorizontal: ITEM_SPACING / 3,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 16,
    },
    dayNumber: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    dayName: {
        fontSize: 12,
        color: '#444',
        textAlign: 'center',
        marginTop: 4,
    },
    activeCard: {
        height: ITEM_WIDTH + 10,
        width: ITEM_WIDTH + 10,
        backgroundColor: Colors.light.highlightBackgroun_1,
        borderColor: Colors.light.shadow,
        borderWidth: 1,
    },

    activeText: {
        color: '#fff',
    },

});

export default HorizontalCalendar;
