import { ThemeContext } from "@/components/ThemeProvider";
import { Colors } from "@/constants/Colors";
import React, { useContext } from "react";
import { ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function LoadScreen({ marginBottom }: { marginBottom?: number }) {

    const { theme } = useContext(ThemeContext);
    const insets = useSafeAreaInsets();
    return (
        <ActivityIndicator
            size="large"
            color={Colors[theme.appearance].iconPrimary}
            style={{
                flex: 1, backgroundColor: Colors[theme.appearance].background,
                marginBottom: marginBottom ? marginBottom : insets.bottom,
                marginTop: insets.top
            }}
        />
    );
}
