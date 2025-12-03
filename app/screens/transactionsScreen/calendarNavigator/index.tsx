import { ThemeType } from '@/app/types/appearance';
import { Colors } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SCREEN_WIDTH / 5;
const CENTER_OFFSET = (SCREEN_WIDTH - ITEM_WIDTH) / 4;
const ITEM_SPACING = 0;
const SPACING_DEFAULT = 25;
const DEFAULT_SIZE = SPACING_DEFAULT * 2;
const RADIUS_DEFAULT = 16;

const CalendarNavigator: React.FC<{ theme: ThemeType, onDateChange: (date: Date) => void }> = ({ theme, onDateChange }) => {
    const scrollRef = useRef<ScrollView>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;

    const now = new Date();
    const currentMonthIndex = now.getMonth();
    const currentYear = now.getFullYear();

    const months = Array.from({ length: 24 }, (_, i) => {
        const year = currentYear + Math.floor(i / 12);
        const monthIndex = i % 12;
        const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
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
        <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
            <Text style={[styles.title, { backgroundColor: Colors[theme].background, color: Colors[theme].textPrimary }]}>{months[currentIndex]?.year}</Text>

            <View style={[styles.ContainerContent, { backgroundColor: Colors[theme].background }]}>

                <TouchableOpacity style={[styles.button, { backgroundColor: Colors[theme].background }]} onPress={handlePrevious}>
                    <Feather name="chevron-left" size={24} color={Colors[theme].secondary} />
                </TouchableOpacity>

                <View style={[styles.row, { backgroundColor: Colors[theme].background }]}>
                    <Animated.ScrollView
                        ref={scrollRef}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={ITEM_WIDTH + ITEM_SPACING}
                        decelerationRate="fast"
                        contentContainerStyle={{ paddingHorizontal: CENTER_OFFSET }}
                        onMomentumScrollEnd={onScrollEnd}
                        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
                        scrollEventThrottle={16}
                    >
                        {months.map((month, index) => (
                            <Animated.View
                                key={index}
                                style={[styles.card, { backgroundColor: Colors[theme].background },
                                index === currentIndex && {
                                    backgroundColor: Colors[theme].surfaceVariant, borderColor: Colors[theme].border
                                }, {
                                    transform: [{
                                        scale: scrollX.interpolate({
                                            inputRange: [
                                                (index - 1) * (ITEM_WIDTH + ITEM_SPACING),
                                                index * (ITEM_WIDTH + ITEM_SPACING),
                                                (index + 1) * (ITEM_WIDTH + ITEM_SPACING),
                                            ],
                                            outputRange: [0.9, 1, 0.9],
                                            extrapolate: 'clamp',
                                        }),
                                    }]
                                }]}
                            >
                                <Text
                                    style={[styles.monthText, { color: Colors[theme].textSecondary },
                                    index === currentIndex && [styles.activeText, { color: Colors[theme].textPrimary }]]}
                                >
                                    {month.label}
                                </Text>
                            </Animated.View>
                        ))}
                    </Animated.ScrollView>
                </View>

                <TouchableOpacity style={[styles.button, { backgroundColor: Colors[theme].background }]} onPress={handleNext}>
                    <Feather name="chevron-right" size={24} color={Colors[theme].secondary} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: SPACING_DEFAULT },
    title: { textAlign: 'center', fontWeight: 'bold', fontSize: 16, marginBottom: SPACING_DEFAULT },
    ContainerContent: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    row: { width: SPACING_DEFAULT + ITEM_WIDTH * 2.7, height: DEFAULT_SIZE },
    button: { width: DEFAULT_SIZE, height: DEFAULT_SIZE, justifyContent: 'center', alignItems: 'center', borderRadius: RADIUS_DEFAULT },
    card: {
        width: ITEM_WIDTH, height: DEFAULT_SIZE, marginHorizontal: ITEM_SPACING / 2,
        justifyContent: 'center', alignItems: 'center', borderRadius: RADIUS_DEFAULT
    },
    monthText: { fontSize: 16, fontWeight: '600', textAlign: 'center' },
    activeText: { fontWeight: 'bold' }
});

export default CalendarNavigator;