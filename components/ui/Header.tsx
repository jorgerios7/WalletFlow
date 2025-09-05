import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";

type Direction = 'normal' | 'inverted';

interface HeaderProps {
    children?: React.ReactNode;
    onPress?: () => void;
    backgroundColor?: string;
    direction?: Direction;
}

export default function Header({ onPress, children, backgroundColor, direction }: HeaderProps) {

    const styleDynamic = {
        backgroundColor: backgroundColor
            ? backgroundColor
            : Colors.light.shadow
    }

    function childrenPosition_1() {
        return (
            direction === 'normal'
                ? 0
                : 2
        );
    };

    function childrenPosition_2() {
        return (
            direction === 'normal'
                ? 2
                : 0
        )
    };

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[styles.container, styleDynamic]}>
                {React.Children.count(children) === React.Children.count(children) && (
                    <>
                        <View style={{ flex: 1, alignItems: 'flex-start' }}>
                            {React.Children.toArray(children)[childrenPosition_1()]}
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            {React.Children.toArray(children)[1]}
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            {React.Children.toArray(children)[childrenPosition_2()]}
                        </View>
                    </>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        //height: 50,
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    }
});
