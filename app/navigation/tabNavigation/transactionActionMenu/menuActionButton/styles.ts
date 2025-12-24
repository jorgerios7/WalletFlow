import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card: {
        justifyContent: 'center', 
        alignItems: 'center', 
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25, 
        shadowRadius: 8, 
        elevation: 6, 
        borderWidth: 0.5, 
        flexDirection: 'row',
        padding: 10
    }
});