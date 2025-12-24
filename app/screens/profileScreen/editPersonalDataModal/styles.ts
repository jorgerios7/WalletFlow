import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    overlay: { flex: 1, justifyContent: "center", alignItems: "center" },
    content: { width: "90%", padding: 10, borderRadius: 10, gap: 10, elevation: 4 },
    title: { fontSize: 16, textAlign: "center", fontWeight: "bold" },
    text: { alignSelf: "center" }
});