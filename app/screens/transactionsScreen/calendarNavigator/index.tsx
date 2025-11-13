import { Colors } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ITEM_WIDTH = 75;
const ITEM_SPACING = 0;
const SPACING_DEFAULT = 10;
const DEFAULT_SIZE = 55;
const RADIUS_DEFAULT = 16;
const SCREEN_WIDTH = Dimensions.get('window').width;
const CENTER_OFFSET = (SCREEN_WIDTH - ITEM_WIDTH) / 4;

const CalendarNavigator: React.FC<{ onDateChange: (date: Date) => void }> = ({ onDateChange }) => {
    const scrollRef = useRef<ScrollView>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;

    const now = new Date();
    const currentMonthIndex = now.getMonth();
    const currentYear = now.getFullYear();

    const months = Array.from({ length: 24 }, (_, i) => {
        const year = currentYear + Math.floor(i / 12);
        const monthIndex = i % 12;
        const monthNames = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        return { label: `${monthNames[monthIndex]}`, monthIndex, year };
    });


    useEffect(() => {
        scrollToIndex(currentMonthIndex, true);
        setCurrentIndex(currentMonthIndex);
        onDateChange(new Date(currentYear, currentMonthIndex, 1));
    }, []);

    const updateToCurrentDate = () => {
        scrollToIndex(currentMonthIndex, false);
        setCurrentIndex(currentMonthIndex);
    }

    const scrollToIndex = (index: number, isInit: boolean) => {
        if (index < 0 || index >= months.length && !isInit) return;
        const x = index * (ITEM_WIDTH + ITEM_SPACING);
        scrollRef.current?.scrollTo({ x, animated: true });
        setCurrentIndex(index);
        onDateChange(new Date(currentYear, index, 1));
    };

    const handleNext = () => { scrollToIndex(currentIndex + 1, false) }
    const handlePrevious = () => { scrollToIndex(currentIndex - 1, false) }

    const onScrollEnd = (e: any) => {
        const x = e.nativeEvent.contentOffset.x;
        const index = Math.round(x / (ITEM_WIDTH + ITEM_SPACING));
        setCurrentIndex(index);
        onDateChange(new Date(currentYear, index, 1));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{months[currentIndex]?.year}</Text>

            <View style={styles.ContainerContent}>

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
                                style={[styles.card, index === currentIndex && styles.activeCard,
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
                                    ]
                                }]}
                            >
                                <Text style={[styles.monthText, index === currentIndex && styles.activeText]}>
                                    {month.label}
                                </Text>
                            </Animated.View>
                        ))}
                    </Animated.ScrollView>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <Feather name="chevron-right" size={24} color="black" />
                </TouchableOpacity>
            </View>

            {/**<View style={styles.menu}>

                <TouchableOpacity style={styles.menuTab} onPress={handleNext}>
                    <Feather name="filter" size={16} color="black" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuTab} onPress={updateToCurrentDate}>
                    <Feather name="calendar" size={16} color="black" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuTab} onPress={handleNext}>
                    <Feather name="search" size={16} color="black" />
                </TouchableOpacity>
            </View>*/}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: SPACING_DEFAULT, backgroundColor: Colors.light.background },
    title: { textAlign: 'center', fontWeight: 'bold', fontSize: 16, marginBottom: SPACING_DEFAULT, backgroundColor: Colors.light.background },
    ContainerContent: {
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
    menu: {
        flexDirection: 'row',
        backgroundColor: Colors.light.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuTab: {
        padding: SPACING_DEFAULT,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: RADIUS_DEFAULT,
        margin: 5,
        backgroundColor: Colors.light.background
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

export default CalendarNavigator;