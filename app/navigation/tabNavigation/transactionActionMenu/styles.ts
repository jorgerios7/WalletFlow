import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  menuActionContainer: {
    width: '100%', alignItems: 'center', justifyContent: 'center',
    backgroundColor: "transparent", position: 'absolute', bottom: 85, gap: 10
  },
  overlay: { flex: 1, zIndex: 100 }
});