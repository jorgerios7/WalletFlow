import { Colors } from "@/constants/Colors";
import React, { useContext } from "react";
import { ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PreferencesContext } from "../context/PreferencesProvider";

export function LoadScreen({ marginBottom }: { marginBottom?: number }) {

    const { preferences } = useContext(PreferencesContext);
    const insets = useSafeAreaInsets();
    return (
        <ActivityIndicator
            size="large"
            color={Colors[preferences.theme.appearance].iconPrimary}
            style={{
                flex: 1, backgroundColor: Colors[preferences.theme.appearance].background,
                marginBottom: marginBottom ? marginBottom : insets.bottom,
                marginTop: insets.top
            }}
        />
    );
}
