import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 10,
        borderWidth: 0.5,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    content: {
        flexDirection: "row",
        gap: 5
    },
    text: {
        alignSelf: "center"
    },
    containerOwnerIcon: {
        alignSelf: 'center'
    },
    containerShare: {
        alignSelf: 'center'
    }
});