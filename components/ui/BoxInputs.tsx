import { Colors } from "@/constants/Colors";
import { Platform, StyleSheet, ViewProps, useWindowDimensions } from "react-native";
import TransitionView from "./TransitionView";

interface BoxInputsProps extends ViewProps {
    children: React.ReactNode;
    transparentBackground?: boolean;
}

export default function BoxInputs({ children, style, ...props }: BoxInputsProps) {
    const { width } = useWindowDimensions();

    const dynamicStyle = {
        width: Platform.OS === "web" ? width / 2 : width - 50,
        alignSelf: "center" as "auto" | "flex-start" | "flex-end" | "center" | "stretch" | "baseline",
    };

    return (
        <TransitionView style={[styles.form, dynamicStyle, style]} {...props}>
            {children}
        </TransitionView>
    );
}

const styles = StyleSheet.create({
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
        backgroundColor: Colors.light.background,
    },
});
