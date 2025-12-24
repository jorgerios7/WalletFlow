import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { BalanceValues } from "@/app/types/Finance";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";

interface Props {
  isLoading: boolean;
  balanceValues: BalanceValues
}

const format = (isLoading: boolean, value: number) => `R$ ${(isLoading ? 0 : value).toFixed(2)}`;

export default function BalanceScreen({ isLoading, balanceValues }: Props) {
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
    <View
      style={[
        styles.container,
        {
          backgroundColor: Colors[preferences.theme.appearance].background,
          borderColor: Colors[preferences.theme.appearance].border
        }
      ]}
    >
      {/* Header */}
      <Pressable
        style={[
          styles.containerContent,
          { backgroundColor: Colors[preferences.theme.appearance].background }
        ]}
        onPress={toggleExpand}
      >
        <Text
          style={[
            styles.text,
            {
              color: Colors[preferences.theme.appearance].textSecondary,
              fontSize: Typography[preferences.fontSizeType].xs.fontSize,
              lineHeight: Typography[preferences.fontSizeType].xs.lineHeight
            }
          ]}
        >
          Saldo final:
        </Text>

        <Text
          style={[
            styles.text,
            {
              color: Colors[preferences.theme.appearance].textSecondary,
              fontSize: Typography[preferences.fontSizeType].xs.fontSize,
              lineHeight: Typography[preferences.fontSizeType].xs.lineHeight
            }
          ]}
        >
          {format(isLoading, balanceValues.totalConcludedSum)}
        </Text>
      </Pressable>

      {isExpanded && (
        <View
          style={[
            styles.dropdown,
            {
              backgroundColor: Colors[preferences.theme.appearance].background,
              borderColor: Colors[preferences.theme.appearance].border
            }
          ]}
        >
          {rows.map((item, index) => (
            <View
              key={index}
              style={[
                styles.item,
                { backgroundColor: Colors[preferences.theme.appearance].background }
              ]}
            >
              <Text
                style={[
                  styles.text,
                  {
                    color: Colors[preferences.theme.appearance].textSecondary,
                    fontSize: Typography[preferences.fontSizeType].sm.fontSize,
                    lineHeight: Typography[preferences.fontSizeType].sm.lineHeight
                  }
                ]}
              >
                {item.label}
              </Text>

              <Text
                style={[
                  styles.text,
                  {
                    color: Colors[preferences.theme.appearance].textSecondary,
                    fontSize: Typography[preferences.fontSizeType].sm.fontSize,
                    lineHeight: Typography[preferences.fontSizeType].sm.lineHeight
                  }
                ]}
              >
                {format(isLoading, item.value)}
              </Text>
            </View>
          ))}

          {/* Fecha ao clicar */}
          <Pressable
            style={[
              styles.iconBtn,
              { backgroundColor: Colors[preferences.theme.appearance].background }
            ]}
            onPress={toggleExpand}
          >
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
