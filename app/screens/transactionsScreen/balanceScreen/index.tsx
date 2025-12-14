import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { BalanceValues } from "@/app/types/Finance";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const format = (isLoading: boolean, value: number) => `R$ ${(isLoading ? 0 : value).toFixed(2)}`;

export default function BalanceScreen({ isLoading, balanceValues }: { isLoading: boolean; balanceValues: BalanceValues }) {
  const { preferences } = useContext(PreferencesContext);

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
    <View style={[styles.container,
    { backgroundColor: Colors[preferences.theme.appearance].surface, borderTopColor: Colors[preferences.theme.appearance].border }
    ]}
    >
      {/* Header */}
      <Pressable style={[styles.containerContent, { backgroundColor: Colors[preferences.theme.appearance].surface }]} onPress={toggleExpand}>
        <Text
          style={[styles.text, {
            color: Colors[preferences.theme.appearance].textSecondary,
            fontSize: Typography[preferences.fontSizeType].xs.fontSize,
            lineHeight: Typography[preferences.fontSizeType].xs.lineHeight
          }]}
        >
          Saldo final:
        </Text>

        <Text style={[styles.text, {
          color: Colors[preferences.theme.appearance].textSecondary,
          fontSize: Typography[preferences.fontSizeType].xs.fontSize,
          lineHeight: Typography[preferences.fontSizeType].xs.lineHeight
        }]}
        >
          {format(isLoading, balanceValues.totalConcludedSum)}
        </Text>
      </Pressable>

      {/* Botão */}
      <Pressable style={[styles.iconBtn, { backgroundColor: Colors[preferences.theme.appearance].surface }]} onPress={toggleExpand}>
        <MaterialIcons name={isExpanded ? "expand-less" : "expand-more"} size={20} color={Colors[preferences.theme.appearance].iconPrimary} />
      </Pressable>

      {/* Dropdown */}
      {isExpanded && (
        <View style={[styles.dropdown, { backgroundColor: Colors[preferences.theme.appearance].surface }]}>
          {rows.map((item, index) => (
            <View key={index} style={[styles.item, { backgroundColor: Colors[preferences.theme.appearance].surface }]}>
              <Text
                style={[styles.text, {
                  color: Colors[preferences.theme.appearance].textSecondary,
                  fontSize: Typography[preferences.fontSizeType].sm.fontSize,
                  lineHeight: Typography[preferences.fontSizeType].sm.lineHeight
                }]}
              >
                {item.label}
              </Text>

              <Text
                style={[styles.text, {
                  color: Colors[preferences.theme.appearance].textSecondary,
                  fontSize: Typography[preferences.fontSizeType].sm.fontSize,
                  lineHeight: Typography[preferences.fontSizeType].sm.lineHeight
                }]}
              >
                {format(isLoading, item.value)}
              </Text>
            </View>
          ))}

          {/* Fecha ao clicar */}
          <Pressable style={[styles.iconBtn, { backgroundColor: Colors[preferences.theme.appearance].surface }]} onPress={toggleExpand}>
            <MaterialIcons
              name="expand-less"
              size={20}
              color={Colors[preferences.theme.appearance].iconPrimary}
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
