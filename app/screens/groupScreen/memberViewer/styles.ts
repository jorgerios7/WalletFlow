import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 10,
        padding: 10,
        borderRadius: 10
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10
    },
    viewer: {
        gap: 10
    },
    title: {
        fontSize: 16,
        alignSelf: "center"
    }
});
