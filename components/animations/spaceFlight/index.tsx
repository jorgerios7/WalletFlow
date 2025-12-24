import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { Colors } from "@/constants/Colors";
import React, { ReactNode, useContext, useEffect, useRef } from "react";
import {
    Animated,
    Dimensions,
    StyleSheet,
    View
} from "react-native";

const { width } = Dimensions.get("window");

const STAR_COUNT = 40;
const STAR_SPEED = 4000;

interface Star {
    x: number;
    y: number;
    size: number;
}

interface Props {
    children: ReactNode;
    height: number;
}

export default function SpaceFlight({ children, height}: Props) {
    const { preferences } = useContext(PreferencesContext);
    const translateY = useRef(new Animated.Value(0)).current;

    const stars: Star[] = Array.from({ length: STAR_COUNT }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1
    }));

    useEffect(() => {
        translateY.setValue(0);

        Animated.loop(
            Animated.timing(translateY, {
                toValue: height,
                duration: STAR_SPEED,
                useNativeDriver: true
            })
        ).start();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: Colors[preferences.theme.appearance].background }]}>
            {/* Camada 1 */}
            <Animated.View
                style={{
                    position: "absolute",
                    width: "100%",
                    height: height,
                    transform: [{ translateY }]
                }}
            >
                {stars.map((star, index) => (
                    <View
                        key={`star-1-${index}`}
                        style={[
                            styles.star,
                            {
                                backgroundColor: Colors[preferences.theme.appearance].iconPrimary,
                                width: star.size,
                                height: star.size,
                                left: star.x,
                                top: star.y
                            }
                        ]}
                    />
                ))}
            </Animated.View>

            {/* Camada 2 (acima da primeira) */}
            <Animated.View
                style={{
                    position: "absolute",
                    width: "100%",
                    height: height,
                    transform: [{ translateY: Animated.subtract(translateY, height) }]
                }}
            >
                {stars.map((star, index) => (
                    <View
                        key={`star-2-${index}`}
                        style={[
                            styles.star,
                            {
                                backgroundColor: Colors[preferences.theme.appearance].iconPrimary,
                                width: star.size,
                                height: star.size,
                                left: star.x,
                                top: star.y
                            }
                        ]}
                    />
                ))}
            </Animated.View>

            {children}
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: "hidden"
    },
    star: {
        position: "absolute",
        borderRadius: 10,
        opacity: 0.8
    }
});
