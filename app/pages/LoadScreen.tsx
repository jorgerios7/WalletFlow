import { Colors } from "@/constants/Colors";
import React from "react";
import { ActivityIndicator } from "react-native";
import { ThemeType } from "../types/appearance";

export function LoadScreen({theme, marginBottom }: { theme: ThemeType, marginBottom?: number }) {
    return (
        <ActivityIndicator
            style={{ flex: 1, backgroundColor: Colors[theme].background, marginBottom: marginBottom ? marginBottom : 0 }}
            size="large"
            color={Colors[theme].iconPrimary}
        />
    );
}
