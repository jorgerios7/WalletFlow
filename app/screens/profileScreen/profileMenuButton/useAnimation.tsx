import { useRef, useState } from "react";
import { Animated, Pressable } from "react-native";

export default function useAnimation(closedSize: number, menuWidth: number, menuHeight: number) {
    const [expanded, setExpanded] = useState(false);

    const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
    const animatedMenuWidth = useRef(new Animated.Value(closedSize)).current;
    const animatedMenuHeight = useRef(new Animated.Value(closedSize)).current;
    const animatedGap = useRef(new Animated.Value(0)).current;
    const animatedContainerUserWidth = useRef(new Animated.Value(closedSize)).current;
    const animatedMainContentHeight = useRef(new Animated.Value(closedSize)).current;
    const animatedProfileButtonWidth = useRef(new Animated.Value(closedSize)).current;
    const animatedProfileButtonHeight = useRef(new Animated.Value(closedSize)).current;
    const smallIconSize = (closedSize / 30);
    const animatedIconScale = useRef(new Animated.Value(smallIconSize)).current;
    const animatedButtonCloseWidth = useRef(new Animated.Value(0)).current;
    const animatedButtonCloseHeight = useRef(new Animated.Value(0)).current;
    const animatedPadding = useRef(new Animated.Value(0)).current;
    const animatedBackground = useRef(new Animated.Value(0)).current;

    const contentOpacity = animatedBackground.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    const animateMenu = (isOpen: boolean) => {
        const targetValues = {
            MENU_WIDTH: isOpen ? menuWidth : closedSize,
            MENU_HEIGHT: isOpen ? menuHeight : closedSize,
            GAP: isOpen ? 20 : 0,
            MAIN_CONTENT_WIDTH: isOpen ? menuWidth - 20 : closedSize,
            MAIN_CONTENT_HEIGHT: isOpen ? 340 : closedSize,
            PADDING: isOpen ? 10 : 0,
            PROFILE_BUTTON_WIDTH: isOpen ? 160 : closedSize,
            PROFILE_BUTTON_HEIGHT: isOpen ? 160 : closedSize,
            ICON_SCALE: isOpen ? 5 : smallIconSize,
            BUTTON_CLOSE_WIDTH: isOpen ? 50 : 0,
            BUTTON_CLOSE_HEIGHT: isOpen ? 50 : 0,
            OPACITY: isOpen ? 1 : 0
        };

        const durationValues = {
            FADE: isOpen ? 500 : 40,
            EXPAND: isOpen ? 100 : 150
        };

        Animated.parallel([
            Animated.timing(animatedMenuWidth, {
                toValue: targetValues.MENU_WIDTH,
                duration: durationValues.EXPAND,
                useNativeDriver: false,
            }),
            Animated.timing(animatedMenuHeight, {
                toValue: targetValues.MENU_HEIGHT,
                duration: durationValues.EXPAND,
                useNativeDriver: false,
            }),
            Animated.timing(animatedGap, {
                toValue: targetValues.GAP,
                duration: durationValues.EXPAND,
                useNativeDriver: false,
            }),
            Animated.timing(animatedContainerUserWidth, {
                toValue: targetValues.MAIN_CONTENT_WIDTH,
                duration: durationValues.EXPAND,
                useNativeDriver: false,
            }),
            Animated.timing(animatedMainContentHeight, {
                toValue: targetValues.MAIN_CONTENT_HEIGHT,
                duration: durationValues.EXPAND,
                useNativeDriver: false,
            }),
            Animated.timing(animatedProfileButtonWidth, {
                toValue: targetValues.PROFILE_BUTTON_WIDTH,
                duration: durationValues.EXPAND,
                useNativeDriver: false,
            }),
            Animated.timing(animatedProfileButtonHeight, {
                toValue: targetValues.PROFILE_BUTTON_HEIGHT,
                duration: durationValues.EXPAND,
                useNativeDriver: false,
            }),
            Animated.timing(animatedIconScale, {
                toValue: targetValues.ICON_SCALE,
                duration: durationValues.EXPAND,
                useNativeDriver: true,
            }),
            Animated.timing(animatedButtonCloseWidth, {
                toValue: targetValues.BUTTON_CLOSE_WIDTH,
                duration: durationValues.EXPAND,
                useNativeDriver: false,
            }),
            Animated.timing(animatedButtonCloseHeight, {
                toValue: targetValues.BUTTON_CLOSE_HEIGHT,
                duration: durationValues.EXPAND,
                useNativeDriver: false,
            }),
            Animated.timing(animatedPadding, {
                toValue: targetValues.PADDING,
                duration: durationValues.EXPAND,
                useNativeDriver: false,
            }),
            Animated.timing(animatedBackground, {
                toValue: targetValues.OPACITY,
                duration: durationValues.FADE,
                useNativeDriver: false,
            }),
        ]).start(() => {
            setExpanded(isOpen);
        });
    };

    return {
        AnimatedPressable,
        expanded,
        animateMenu,
        contentOpacity,
        animatedMenuWidth,
        animatedMenuHeight,
        animatedGap,
        animatedContainerUserWidth,
        animatedMainContentHeight,
        animatedProfileButtonWidth,
        animatedProfileButtonHeight,
        animatedIconScale,
        animatedButtonCloseWidth,
        animatedButtonCloseHeight,
        animatedPadding,
        animatedBackground,
    };
}
