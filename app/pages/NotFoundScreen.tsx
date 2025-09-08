import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const NotFoundScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Feather name="inbox" size={48} color={Colors.light.text} />
      <Text style={styles.message}>Ainda não há dados</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.shadow,
    padding: 16,
  },
  message: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.light.text,
    textAlign: "center",
    fontWeight: "500",
  },
});

export default NotFoundScreen;
