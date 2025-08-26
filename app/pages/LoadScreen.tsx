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
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent'
    },
    loader: {
        position: 'absolute',
        top: '40%',
        right: '45%',
        backgroundColor: 'transparent',
    }
});
