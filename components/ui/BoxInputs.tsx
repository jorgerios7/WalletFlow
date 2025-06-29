import { Colors } from "@/constants/Colors";
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, ViewProps, useWindowDimensions } from "react-native";
import { ThemedView } from "../ThemedView";
import TransitionView from "./TransitionView";

interface BoxInputsProps extends ViewProps {
    children: React.ReactNode;
}

export default function BoxInputs({ children, style, ...props }: BoxInputsProps) {
    const { width } = useWindowDimensions();

    const dynamicStyle = {
        width: width - 50,
        alignSelf: "center" as "auto" | "flex-start" | "flex-end" | "center" | "stretch" | "baseline",
    };

    return (
        <ThemedView darkColor="white" lightColor="black" style={styles.main}>
            <LinearGradient
                colors={[Colors.light.highlightBackgroun_1, Colors.light.highlightBackgroun_2]} // Azul para roxo
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.container}
            >
                <TransitionView style={[styles.form, dynamicStyle, style]} {...props}>
                    {children}
                </TransitionView>
            </LinearGradient>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    main: {
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        alignItems: "stretch",
    },
    container: {
        borderRadius: 5,
        padding: 10,
        borderColor: Colors.light.shadow,
        borderWidth: 0.5,
    }
});
