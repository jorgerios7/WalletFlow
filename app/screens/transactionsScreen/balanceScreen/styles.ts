import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 0.5
    },
    containerContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10
    },
    text: {
        fontSize: 12,
        fontStyle: "italic"
    },
    dropdown: {
        width: "100%",
        position: "absolute",
        top: 0,
        zIndex: 999,
        padding: 10,
        gap: 10,
        borderBottomWidth: 0.5
    },
    item: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    iconBtn: {
        alignItems: "center",
        paddingVertical: 5
    }
});