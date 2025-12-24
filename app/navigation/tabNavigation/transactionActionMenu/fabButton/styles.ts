import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card: {
        width: 60,
        height: 60,
        borderRadius: 999,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 6,
        borderWidth: 0.5,
        position: 'absolute',
        left: '50%',
        transform: [{ translateX: -72 / 2 }],
        zIndex: 110, backgroundColor: "transparent"
    }
});