import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";

interface HeaderProps {
    children?: React.ReactNode;
    onPress?: () => void;
    backgroundColor?: string;
}

export default function Header({ onPress, children, backgroundColor }: HeaderProps) {

    const styleDynamic = {
        backgroundColor: backgroundColor ? backgroundColor : Colors.light.shadow
    }

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[styles.container, styleDynamic]}>
                {React.Children.count(children) === 2 ? (
                    <>
                        <View style={{ flex: 1, alignItems: 'flex-start' }}>
                            {React.Children.toArray(children)[0]}
                        </View>
                         <View style={{ flex: 1, alignItems: 'center' }}>
                            {React.Children.toArray(children)[1]}
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            {React.Children.toArray(children)[2]}
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
        height: 50,
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10
    },
});
