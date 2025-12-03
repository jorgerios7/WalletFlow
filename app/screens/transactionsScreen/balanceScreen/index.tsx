import { ThemeType } from "@/app/types/appearance";
import { BalanceValues } from "@/app/types/Finance";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const format = (isLoading: boolean, value: number) => `R$ ${(isLoading ? 0 : value).toFixed(2)}`;

export default function BalanceScreen({ theme, isLoading, balanceValues }: { theme: ThemeType, isLoading: boolean; balanceValues: BalanceValues }) {
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
    <View style={[styles.container, { backgroundColor: Colors[theme].background, borderTopColor: Colors[theme].borderInvert }]}>
      {/* Header */}
      <Pressable style={[styles.containerContent, { backgroundColor: Colors[theme].background }]} onPress={toggleExpand}>
        <Text style={[styles.text, { backgroundColor: Colors[theme].background, color: Colors[theme].textSecondary }]}>
          Saldo final:
        </Text>

        <Text style={[styles.text, { backgroundColor: Colors[theme].background, color: Colors[theme].textSecondary }]}>
          {format(isLoading, balanceValues.totalConcludedSum)}
        </Text>
      </Pressable>

      {/* Botão */}
      <Pressable style={[styles.iconBtn, { backgroundColor: Colors[theme].background }]} onPress={toggleExpand}>
        <MaterialIcons name={isExpanded ? "expand-less" : "expand-more"} size={20} color={Colors[theme].primary} />
      </Pressable>

      {/* Dropdown */}
      {isExpanded && (
        <View style={[styles.dropdown, { backgroundColor: Colors[theme].background }]}>
          {rows.map((item, index) => (
            <View key={index} style={[styles.item, { backgroundColor: Colors[theme].background }]}>
              <Text
                style={[styles.text, { backgroundColor: Colors[theme].background, color: Colors[theme].textSecondary }]}
              >
                {item.label}
              </Text>

              <Text
                style={[styles.text, { backgroundColor: Colors[theme].background, color: Colors[theme].textSecondary }]}
              >
                {format(isLoading, item.value)}
              </Text>
            </View>
          ))}

          {/* Fecha ao clicar */}
          <Pressable style={[styles.iconBtn, { backgroundColor: Colors[theme].background }]} onPress={toggleExpand}>
            <MaterialIcons
              name="expand-less"
              size={20}
              color={Colors[theme].primary}
            />
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { borderTopWidth: 0.5, borderBottomWidth: 0.5 },
  containerContent: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10 },
  text: { fontSize: 12, fontStyle: "italic" },
  dropdown: { width: "100%", position: "absolute", top: 0, zIndex: 999, padding: 10, gap: 10, borderBottomWidth: 0.5 },
  item: { flexDirection: "row", justifyContent: "space-between" },
  iconBtn: { alignItems: "center", paddingVertical: 5 }
});
