import { BalanceValues } from "@/app/types/Finance";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const format = (isLoading: boolean, value: number) => `R$ ${(isLoading ? 0 : value).toFixed(2)}`;

export default function BalanceScreen({ isLoading, balanceValues }: { isLoading: boolean; balanceValues: BalanceValues }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  const rows = [
    { label: "Entradas", value: balanceValues.totalIncomeBalance },
    { label: "Saídas", value: balanceValues.totalExpenseBalance },
    { label: "Entradas concluídas", value: balanceValues.totalConcludedIncomeBalance },
    { label: "Entradas pendentes", value: balanceValues.totalPendingIncomeBalance },
    { label: "Saídas concluídas", value: balanceValues.totalConcludedExpenseBalance },
    { label: "Saídas pendentes", value: balanceValues.totalPendingExpenseBalance },
    { label: "Saldo final", value: balanceValues.totalConcludedSum }
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <Pressable style={styles.containerContent} onPress={toggleExpand}>
        <Text style={styles.text}>Saldo final:</Text>
        <Text style={styles.text}>
          {format(isLoading, balanceValues.totalConcludedSum)}
        </Text>
      </Pressable>

      {/* Botão */}
      <Pressable style={styles.iconBtn} onPress={toggleExpand}>
        <MaterialIcons
          name={isExpanded ? "expand-less" : "expand-more"}
          size={20}
          color={Colors.light.highlightBackgroun_1}
        />
      </Pressable>

      {/* Dropdown */}
      {isExpanded && (
        <View style={styles.dropdown}>
          {rows.map((item, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.text}>{item.label}</Text>
              <Text style={styles.text}>{format(isLoading, item.value)}</Text>
            </View>
          ))}

          {/* Fecha ao clicar */}
          <Pressable style={styles.iconBtn} onPress={toggleExpand}>
            <MaterialIcons
              name="expand-less"
              size={20}
              color={Colors.light.highlightBackgroun_1}
            />
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.light.background, borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: "grey" },
  containerContent: {
    backgroundColor: Colors.light.background, flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10
  },
  text: { fontSize: 12, fontStyle: "italic", backgroundColor: "white" },
  dropdown: {
    width: "100%", position: "absolute", top: 0, zIndex: 999, backgroundColor: Colors.light.background, padding: 10, gap: 10,
    borderBottomWidth: 0.5, borderColor: "grey"
  },
  item: { flexDirection: "row", justifyContent: "space-between" },
  iconBtn: { alignItems: "center", backgroundColor: Colors.light.background, paddingVertical: 5 }
});
