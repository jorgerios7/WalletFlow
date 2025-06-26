import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";

interface HeaderProps {
    children: React.ReactNode;
    onPress?: () => void;
}

export default function Header({ onPress, children }: HeaderProps) {
    return <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={{ flex: 1 }}>
                {children}
            </View>
        </TouchableWithoutFeedback>
    </View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.tint,
        height: 50,
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.light.tint,
    },
});
