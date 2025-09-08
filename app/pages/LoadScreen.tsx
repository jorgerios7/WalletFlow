import { Colors } from "@/constants/Colors";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export function LoadScreen() {
    return (
        <View style={styles.container}>
            <ActivityIndicator
                style={styles.loader}
                size="large"
                color={Colors.light.highlightBackgroun_1}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { width: '100%', height: '100%', backgroundColor: 'transparent' },
    loader: { flex: 1, justifyContent: "center", alignItems: "center" }
});
