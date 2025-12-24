import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        gap: 10
    },
    containerContent: {
        padding: 10,
        borderRadius: 10
    },
    containerFontSize: {
        width: "100%",
        height: 100,
        padding: 10,
        justifyContent: 'center'
    },
    text: {
        fontStyle: 'normal',
        textAlign: 'center',
    },
    containerScreenTime: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
});