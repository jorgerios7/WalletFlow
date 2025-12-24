import { PreferencesContext } from '@/app/context/PreferencesProvider';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Dimensions, ScrollView, Text, View } from 'react-native';
import MonthViewer from './monthViewer';
import NavigationButton from './navigationButton';
import { styles } from './styles';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SCREEN_WIDTH / 5;
const CENTER_OFFSET = (SCREEN_WIDTH - ITEM_WIDTH) / 4;
const ITEM_SPACING = 0;
const SPACING_DEFAULT = 25;
const DEFAULT_SIZE = SPACING_DEFAULT * 2;
const RADIUS_DEFAULT = 99;

const MONTH_NAMES = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

interface MonthItem {
    month: string;
    monthIndex: number;
    year: number;
}

const generateMonths = (startYear: number, total: number): MonthItem[] =>
    Array.from({ length: total }, (_, i) => {
        const year = startYear + Math.floor(i / 12);
        const monthIndex = i % 12;

        return {
            month: MONTH_NAMES[monthIndex],
            monthIndex,
            year
        };
    });

const CalendarNavigator: React.FC<{ onDateChange: (date: Date) => void }> = ({ onDateChange }) => {
    const { preferences } = useContext(PreferencesContext);

    const scrollRef = useRef<ScrollView>(null);
    const scrollX = useRef(new Animated.Value(0)).current;

    const today = new Date();
    const initialMonthIndex = today.getMonth();
    const initialYear = today.getFullYear();

    const dates = useMemo(
        () => generateMonths(initialYear, 24),
        [initialYear]
    );

    const [currentIndex, setCurrentIndex] = useState(0);

    const dynamicTextStyle = useMemo(() => ({
        fontSize: Typography[preferences.fontSizeType].md.fontSize,
        lineHeight: Typography[preferences.fontSizeType].md.lineHeight
    }), [preferences.fontSizeType]);

    useEffect(() => {
        scrollToIndex(initialMonthIndex, true);
        setCurrentIndex(initialMonthIndex);
        onDateChange(new Date(initialYear, initialMonthIndex, 1));
    }, []);

    const updateToCurrentDate = () => {
        scrollToIndex(initialMonthIndex, false);
        setCurrentIndex(initialMonthIndex);
    }

    const scrollToIndex = (index: number, isInit: boolean) => {
        if (index < 0 || index >= dates.length && !isInit) return;
        const x = index * (ITEM_WIDTH + ITEM_SPACING);
        scrollRef.current?.scrollTo({ x, animated: true });
        setCurrentIndex(index);
        onDateChange(new Date(initialYear, index, 1));
    };

    const handleNext = () => { scrollToIndex(currentIndex + 1, false) }
    const handlePrevious = () => { scrollToIndex(currentIndex - 1, false) }

    const handleScrollEnd = (e: any) => {
        const x = e.nativeEvent.contentOffset.x;
        const index = Math.round(x / (ITEM_WIDTH + ITEM_SPACING));
        setCurrentIndex(index);
        onDateChange(new Date(initialYear, index, 1));
    };

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: Colors[preferences.theme.appearance].background }
            ]}
        >

            <Text
                style={[
                    styles.title, dynamicTextStyle,
                    {
                        marginBottom: SPACING_DEFAULT,
                        color: Colors[preferences.theme.appearance].textPrimary
                    }
                ]}
            >
                Ano {dates[currentIndex]?.year}
            </Text>

            <View
                style={[
                    styles.ContainerContent,
                    { backgroundColor: Colors[preferences.theme.appearance].background }
                ]}
            >

                <NavigationButton direction={"previous"} onPress={handlePrevious} />

                <MonthViewer
                    centerOffSet={CENTER_OFFSET}
                    currentIndex={currentIndex}
                    onScrollEnd={handleScrollEnd}
                    scrollRef={scrollRef}
                    scrollX={scrollX}
                    dates={dates}
                    rowLayout={{
                        rowWidth: SPACING_DEFAULT + ITEM_WIDTH * 2.7,
                        rowHeight: DEFAULT_SIZE,
                        rowSpacing: ITEM_SPACING
                    }}
                    cardLayout={{
                        cardWidth: ITEM_WIDTH,
                        cardHeight: DEFAULT_SIZE,
                        cardMargin: ITEM_SPACING / 2,
                        cardSpacing: ITEM_SPACING,
                        cardRadius: RADIUS_DEFAULT
                    }}
                />

                <NavigationButton
                    direction={"next"}
                    onPress={handleNext}
                />

            </View>
        </View>
    );
};

export default CalendarNavigator;