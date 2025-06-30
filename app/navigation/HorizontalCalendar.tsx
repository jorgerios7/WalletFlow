import { Colors } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface Props {
    onDateChange: (date: Date) => void;
}

const ITEM_WIDTH = 70;
const ITEM_SPACING = 0;
const SPACING_DEFAULT = 10;
const DEFAULT_SIZE = 80;
const RADIUS_DEFAULT = 16;
const SCREEN_WIDTH = Dimensions.get('window').width;
const CENTER_OFFSET = (SCREEN_WIDTH - ITEM_WIDTH) / 4;

const HorizontalCalendar: React.FC<Props> = ({ onDateChange }) => {
    const scrollRef = useRef<ScrollView>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;

    const now = new Date();
    const currentMonthIndex = now.getMonth();
    const currentYear = now.getFullYear();

    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    useEffect(() => {
        setCurrentIndex(currentMonthIndex)
        scrollToIndex(currentMonthIndex, true);
        onDateChange(new Date(currentYear, currentMonthIndex, 1));
    }, []);

    const scrollToIndex = (index: number, isInit: boolean) => {
        if (index < 0 || index >= months.length && !isInit) return;
        const x = index * (ITEM_WIDTH + ITEM_SPACING);
        scrollRef.current?.scrollTo({ x, animated: true });
        setCurrentIndex(index);
        onDateChange(new Date(currentYear, index, 1));
    };

    const handleNext = () => {
        scrollToIndex(currentIndex + 1, false);
    }
    const handlePrevious = () => {
        scrollToIndex(currentIndex - 1, false);
    }

    const onScrollEnd = (e: any) => {
        const x = e.nativeEvent.contentOffset.x;
        const index = Math.round(x / (ITEM_WIDTH + ITEM_SPACING));
        setCurrentIndex(index);
        onDateChange(new Date(currentYear, index, 1));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{currentYear}</Text>

            <View style={styles.calendarContent}>

                <TouchableOpacity style={styles.button} onPress={handlePrevious}>
                    <Feather name="chevron-left" size={24} color="black" />
                </TouchableOpacity>

                <View style={styles.row}>

                    <Animated.ScrollView
                        ref={scrollRef}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={ITEM_WIDTH + ITEM_SPACING}
                        decelerationRate="fast"
                        contentContainerStyle={{ paddingHorizontal: CENTER_OFFSET }}
                        onMomentumScrollEnd={onScrollEnd}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: false }
                        )}
                        scrollEventThrottle={16}
                    >
                        {months.map((month, index) => (
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
                                <Text style={[styles.monthText, index === currentIndex && styles.activeText]}>
                                    {month}
                                </Text>
                            </Animated.View>
                        ))}
                    </Animated.ScrollView>

                </View>

                <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <Feather name="chevron-right" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: SPACING_DEFAULT, borderBottomColor: 'black', borderBottomWidth: 1, backgroundColor: Colors.light.background },
    title: { textAlign: 'center', fontWeight: 'bold', fontSize: 16, marginBottom: SPACING_DEFAULT, backgroundColor: Colors.light.background },
    calendarContent: {
        flexDirection: 'row',
        backgroundColor: Colors.light.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        width: '59%',
        height: DEFAULT_SIZE,
        backgroundColor: Colors.light.background,
    },
    button: {
        width: DEFAULT_SIZE,
        height: DEFAULT_SIZE,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light.background,
        borderRadius: RADIUS_DEFAULT
    },
    card: {
        width: ITEM_WIDTH,
        height: DEFAULT_SIZE,
        marginHorizontal: ITEM_SPACING / 2,
        backgroundColor: Colors.light.background,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: RADIUS_DEFAULT,
    },
    activeCard: {
        backgroundColor: Colors.light.highlightBackgroun_2,
        borderColor: Colors.light.shadow,
        borderWidth: 1,
    },
    monthText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        textAlign: 'center',
    },
    activeText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default HorizontalCalendar;