import { Colors } from "@/constants/Colors";
import React from "react";
import { ActivityIndicator } from "react-native";

export function LoadScreen({ marginBottom }: { marginBottom?: number }) {
    return (
        <ActivityIndicator
            style={{ flex: 1, backgroundColor: 'transparent', marginBottom: marginBottom ? marginBottom : 0 }}
            size="large"
            color={Colors.light.highlightBackgroun_1}
        />
    );
}
