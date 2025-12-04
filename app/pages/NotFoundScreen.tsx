import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThemeType } from "../types/appearance";

export default function NotFoundScreen({ theme, marginBottom }: {theme: ThemeType,marginBottom?: number }) {
  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background, marginBottom: marginBottom ? marginBottom : 0 }]}>
      <Feather name="inbox" size={48} color={Colors[theme].iconPrimary} />
      <Text style={[styles.message, {color: Colors[theme].textPrimary}]}>Ainda não há dados</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: "center", alignItems: "center", padding: 16},
  message: { marginTop: 12, fontSize: 16, textAlign: "center", fontWeight: "500" }
});


