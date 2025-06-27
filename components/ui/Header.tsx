import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";

interface HeaderProps {
    children?: React.ReactNode;
    onPress?: () => void;
}

export default function Header({ onPress, children }: HeaderProps) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                {React.Children.count(children) === 2 ? (
                    <>
                        <View style={{ flex: 1, alignItems: 'flex-start' }}>
                            {React.Children.toArray(children)[0]}
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            {React.Children.toArray(children)[1]}
                        </View>
                    </>
                ) : (
                    React.Children.map(children, (child, index) => (
                        <View key={index} style={{ marginHorizontal: 5 }}>
                            {child}
                        </View>
                    ))
                )}
            </View>
        </TouchableWithoutFeedback>
    );
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
