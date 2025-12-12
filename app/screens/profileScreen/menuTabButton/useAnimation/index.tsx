import { useRef, useState } from "react";
import { Animated } from "react-native";

export default function useAnimation({ openHeightSize }: { openHeightSize: number }) {
    
    const CLOSED_HEIGHT_SIZE = 50;

    const [isExpanded, setIsExpanded] = useState(false);

    const menuHeightAnim = useRef(new Animated.Value(CLOSED_HEIGHT_SIZE)).current;

    const toggleMenu = (open: boolean) => {
        const size = {
            menuHeight: open
                ? openHeightSize
                : CLOSED_HEIGHT_SIZE
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
            Animated.timing(menuHeightAnim, { toValue: size.menuHeight, duration: duration.expand, useNativeDriver: false }),

        ]).start(() => setIsExpanded(open));
    }

    return {
        isExpanded, toggleMenu, size: { menuHeightAnim }
    };
}