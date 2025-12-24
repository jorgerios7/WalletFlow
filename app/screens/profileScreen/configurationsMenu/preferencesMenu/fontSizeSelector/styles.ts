import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
    sliderRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    content: {
        flex: 1,
        paddingVertical: 5
    },
    slider: {
        flex: 1,
        marginHorizontal: 10
    },
    dotsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
        marginHorizontal: 24
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        opacity: 0.4,
    },
    dotActive: {
        opacity: 1
    },
});