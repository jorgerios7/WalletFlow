import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    actionsContainer: {
        position: "absolute",
        right: 10,
        top: 0,
        bottom: 0,
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    actionButton: {
        width: 40,
        height: 60,
        justifyContent: "center",
        alignItems: "center"
    },
    valueContainer: {
        width: "40%"
    },
    card: {
        borderWidth: 0.5,
        borderColor: 'transparent',
        padding: 10,
        zIndex: 2
    },
    text: {
        marginEnd: 2
    },
    cardContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    textContainer: {
        width: "40%"
    },
    image: {
        width: 35,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent"
    }
});
