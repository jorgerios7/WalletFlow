import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PreferencesContext } from "../context/PreferencesProvider";


export default function NotFoundScreen({ marginBottom }: { marginBottom?: number }) {
  const { preferences } = useContext(PreferencesContext);

  return (
    <View
      style={[styles.container, {
        backgroundColor: Colors[preferences.theme.appearance].background,
        marginBottom: marginBottom ? marginBottom : 0
      }]}
    >
      <Feather
        name="inbox"
        size={48}
        color={Colors[preferences.theme.appearance].iconPrimary}
      />
      <Text
        style={[styles.message, {
          color: Colors[preferences.theme.appearance].textPrimary
        }]}
      >
        Ainda não há dados
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 10 },
  message: { marginTop: 12, fontSize: 16, textAlign: "center", fontWeight: "500" }
});


