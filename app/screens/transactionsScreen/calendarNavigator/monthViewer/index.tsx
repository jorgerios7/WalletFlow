import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { useContext } from "react";
import { Animated, ScrollView, StyleSheet, Text, View } from "react-native";

interface DatesProps {
    month: string;
    monthIndex: number;
    year: number;
}

interface RowLayoutProps {
    rowWidth: number;
    rowHeight: number;
    rowSpacing: number;

}

interface CardLayoutProps {
    cardWidth: number;
    cardHeight: number;
    cardSpacing: number;
    cardMargin: number;
    cardRadius: number;
}

interface Props {
    dates: DatesProps[];
    rowLayout: RowLayoutProps;
    cardLayout: CardLayoutProps;
    currentIndex: number;
    centerOffSet: number;
    scrollX: Animated.Value;
    scrollRef: React.RefObject<ScrollView | null>
    onScrollEnd: (e: any) => void
}

export default function MonthViewer({
    dates,
    rowLayout,
    cardLayout,
    currentIndex,
    centerOffSet,
    scrollX,
    scrollRef,
    onScrollEnd
}: Props) {
    const { preferences } = useContext(PreferencesContext);
    const { appearance } = preferences.theme;
    const typography = Typography[preferences.fontSizeType].md;

    const {
        rowWidth,
        rowHeight,
        rowSpacing,
    } = rowLayout;

    const {
        cardWidth,
        cardHeight,
        cardSpacing,
        cardMargin,
        cardRadius,
    } = cardLayout;

    const CARD_STEP = cardWidth + cardSpacing;

    const baseTextStyle = {
        fontSize: typography.fontSize,
        lineHeight: typography.lineHeight,
    };

    return (
        <View style={{
            width: rowWidth, height: rowHeight, backgroundColor: Colors[preferences.theme.appearance].background
        }}
        >
            <Animated.ScrollView
                ref={scrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={rowWidth + rowSpacing}
                decelerationRate="fast"
                contentContainerStyle={{ paddingHorizontal: centerOffSet }}
                onMomentumScrollEnd={onScrollEnd}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
                scrollEventThrottle={10}
            >
                {dates.map((date, index) => {
                    const isActive = index === currentIndex;

                    const scale = scrollX.interpolate({
                        inputRange: [
                            (index - 1) * CARD_STEP,
                            index * CARD_STEP,
                            (index + 1) * CARD_STEP,
                        ],
                        outputRange: [0.9, 1, 0.9],
                        extrapolate: "clamp",
                    });

                    return (
                        <Animated.View
                            key={`${date.year}-${date.monthIndex}`}
                            style={[
                                styles.card,
                                {
                                    width: cardWidth,
                                    height: cardHeight,
                                    marginHorizontal: cardMargin,
                                    borderRadius: cardRadius,
                                    backgroundColor: isActive
                                        ? Colors[appearance].accent
                                        : Colors[appearance].background,
                                    transform: [{ scale }],
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.monthText,
                                    baseTextStyle,
                                    {
                                        color: isActive
                                            ? Colors[appearance].textContrast
                                            : Colors[appearance].textPrimary,
                                    },
                                    isActive && styles.activeText,
                                ]}
                            >
                                {date.month}
                            </Text>
                        </Animated.View>
                    );
                })}
            </Animated.ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        justifyContent: "center",
        alignItems: "center",
    },
    monthText: {
        textAlign: "center",
    },
    activeText: {
        fontWeight: "400",
    },
});
