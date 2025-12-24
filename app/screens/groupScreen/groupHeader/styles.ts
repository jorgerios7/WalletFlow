import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    title: {
        fontWeight: "400",
        alignSelf: "center"
    },
    header: {
        padding: 10,
        height: 100,
        justifyContent: 'center'
    },
    headerContent: {
        height: 100,
        backgroundColor: "transparent",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center'
    },
    groupNameContent: {
        padding: 10,
        justifyContent: "space-between",
        flexDirection: 'row',
        borderRadius: 10,
    }
});