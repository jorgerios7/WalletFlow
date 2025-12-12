import { useRef, useState } from "react";
import { Animated } from "react-native";

export default function UseAnimation(screen: { width: number, height: number }) {

    const closed_size = { WIDTH: screen.width, HEIGHT: 100 }

    const [isExpanded, setIsExpanded] = useState(false);

    const topMenuAnim = useRef(new Animated.Value(0)).current;
    const leftMenuAnim = useRef(new Animated.Value(0)).current;

    const topButtonAnim = useRef(new Animated.Value(0)).current;
    const leftButtonAnim = useRef(new Animated.Value(0)).current;

    const topContainerTextAnim = useRef(new Animated.Value(0)).current;
    const leftContainerTextAnim = useRef(new Animated.Value(screen.width / 4)).current;

    const buttonWidthAnim = useRef(new Animated.Value(100)).current;
    const buttonHeightAnim = useRef(new Animated.Value(closed_size.HEIGHT)).current;

    const menuWidthAnim = useRef(new Animated.Value(closed_size.WIDTH)).current;
    const menuHeightAnim = useRef(new Animated.Value(closed_size.HEIGHT)).current;

    const menuBorderRadiusAnim = useRef(new Animated.Value(0)).current;

    const opacityAnim = useRef(new Animated.Value(0)).current;

    const imageScaleAnim = useRef(new Animated.Value(0.7)).current;

    const containerTxtWidthAnim = useRef(new Animated.Value(screen.width / 2.5)).current;
    const containerTxtHeightAnim = useRef(new Animated.Value(closed_size.HEIGHT)).current;

    const toggleMenu = (open: boolean) => {

        const position = {
            topMenu: open
                ? 10
                : 0,
            leftMenu: open
                ? 10
                : 0,
            topButton: open
                ? 50
                : 0,
            leftButton: open
                ? 0.1
                : 0,
            topContainerText: open
                ? 200
                : 0,
            leftContainerText: open
                ? 0
                : screen.width / 4
        };

        const size = {
            menuWidth: open
                ? screen.width - 20
                : closed_size.WIDTH,
            menuHeight: open
                ? screen.height
                : closed_size.HEIGHT,
            buttonWidth: open
                ? screen.width - 20
                : screen.width / 4,
            buttonHeight: open
                ? 150
                : closed_size.HEIGHT,
            imageScale: open
                ? 1.4
                : 0.7,
            containerTxtWidth: open
                ? screen.width - 20
                : screen.width / 2,
            containerTxtHeight: open
                ? 50
                : closed_size.HEIGHT
        };

        const border = {
            menuRadius: open
                ? 20
                : 0
        };

        const transparency = {
            opacity: open
                ? 1
                : 0
        };

        const duration = {
            fade: open
                ? 1
                : 0,
            expand: open
                ? 100
                : 150
        };

        Animated.parallel([
            Animated.timing(topMenuAnim, { toValue: position.topMenu, duration: duration.expand, useNativeDriver: false }),
            Animated.timing(leftMenuAnim, { toValue: position.leftMenu, duration: duration.expand, useNativeDriver: false }),

            Animated.timing(topButtonAnim, { toValue: position.topButton, duration: duration.expand, useNativeDriver: false }),
            Animated.timing(leftButtonAnim, { toValue: position.leftButton, duration: duration.expand, useNativeDriver: false }),

            Animated.timing(topContainerTextAnim, { toValue: position.topContainerText, duration: duration.expand, useNativeDriver: false }),
            Animated.timing(leftContainerTextAnim, { toValue: position.leftContainerText, duration: duration.expand, useNativeDriver: false }),

            Animated.timing(buttonWidthAnim, { toValue: size.buttonWidth, duration: duration.expand, useNativeDriver: false }),
            Animated.timing(buttonHeightAnim, { toValue: size.buttonHeight, duration: duration.expand, useNativeDriver: false }),

            Animated.timing(menuWidthAnim, { toValue: size.menuWidth, duration: duration.expand, useNativeDriver: false }),
            Animated.timing(menuHeightAnim, { toValue: size.menuHeight, duration: duration.expand, useNativeDriver: false }),

            Animated.timing(menuBorderRadiusAnim, { toValue: border.menuRadius, duration: duration.expand, useNativeDriver: false }),

            Animated.timing(opacityAnim, { toValue: transparency.opacity, duration: duration.expand, useNativeDriver: false }),

            Animated.timing(imageScaleAnim, { toValue: size.imageScale, duration: duration.expand, useNativeDriver: false }),

            Animated.timing(containerTxtWidthAnim, { toValue: size.containerTxtWidth, duration: duration.expand, useNativeDriver: false }),
            Animated.timing(containerTxtHeightAnim, { toValue: size.containerTxtHeight, duration: duration.expand, useNativeDriver: false }),
        ]).start(() => setIsExpanded(open));
    }

    return {
        isExpanded, toggleMenu, position: { topMenuAnim, leftMenuAnim, topButtonAnim, leftButtonAnim, topContainerTextAnim, leftContainerTextAnim },
        size: { menuWidthAnim, menuHeightAnim, buttonWidthAnim, buttonHeightAnim, containerTxtWidthAnim, containerTxtHeightAnim },
        menuBorderRadiusAnim, opacityAnim, imageScaleAnim,
    };
}