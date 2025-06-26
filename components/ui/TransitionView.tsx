import { useEffect, useRef } from "react";
import { Animated, Easing, ViewProps } from "react-native";

interface EffectProps extends ViewProps {
    children: React.ReactNode;
}

export default function TransitionView({ children, style, ...props }: EffectProps) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;

    useEffect(() => {
        const enterAnimation = Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 50,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 50,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
        ]);

        enterAnimation.start();

        return () => {
            // Animação de saída ao desmontar
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 0.9,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();
        };
    }, []);

    return (
        <Animated.View 
            style={[style, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]} 
            {...props}
        >
            {children}
        </Animated.View>
    );
}
