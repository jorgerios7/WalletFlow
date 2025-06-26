import { Colors } from "@/constants/Colors";
import { StyleSheet, ViewProps, useWindowDimensions } from "react-native";
import { ThemedView } from "../ThemedView";
import TransitionView from "./TransitionView";

interface BoxInputsProps extends ViewProps {
    children: React.ReactNode;
    transparentBackground?: boolean;
}

export default function BoxInputs({ children, style, ...props }: BoxInputsProps) {
    const { width } = useWindowDimensions();

    const dynamicStyle = {
        width: width - 50,
        alignSelf: "center" as "auto" | "flex-start" | "flex-end" | "center" | "stretch" | "baseline",
    };

    return (
        <ThemedView darkColor="white" lightColor="black" style={styles.main}>
            <TransitionView style={[styles.form, dynamicStyle, style]} {...props}>
                {children}
            </TransitionView>
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
        marginTop: 30,
        borderRadius: 5,
        borderColor: Colors.light.tabIconSelected,
        borderWidth: 0.5,
        padding: 20,
        shadowOffset: { width: 8, height: 20 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 2,
        backgroundColor: Colors.light.tint,
    },
});
