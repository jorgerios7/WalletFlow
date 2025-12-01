import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen({ marginBottom }: { marginBottom?: number }) {
  return (
    <View style={[styles.container, { marginBottom: marginBottom ? marginBottom : 0 }]}>
      <Feather name="inbox" size={48} color={Colors.light.primary} />
      <Text style={styles.message}>Ainda não há dados</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'transparent',
    padding: 16
  },
  message: { marginTop: 12, fontSize: 16, color: Colors.light.textPrimary, textAlign: "center", fontWeight: "500" }
});


