import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: "100%", 
        flexDirection: "row", 
        gap: 10, 
        justifyContent: 'space-between', 
        padding: 10, 
        borderRadius: 10
    }, 
    containerContent: {
        justifyContent: "center"
    }, 
    title: {
        fontWeight: "400"
    }
});