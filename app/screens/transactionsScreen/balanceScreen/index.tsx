import { Entries } from "@/app/types/Finance";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const BalanceScreen: React.FC<{ isLoading: boolean, list: Entries[], totalValue: number }> = ({ isLoading, list, totalValue }) => {

  const [isExpanded, setIsExpanded] = useState(false);

  function toggleExpand() { setIsExpanded(!isExpanded) }

  function balanceCalculation() {
    const cleanList = { income: 0, expense: 0, paymentsPending: 0, paymentsConcluded: 0, total: 0 };

    if (isLoading) return cleanList;

    const field = { income: 0, expense: 0, paymentsPending: 0, paymentsConcluded: 0, total: totalValue };

      for (const entry of list) {
        const { type, paymentType, value } = entry;

        if (type === "income") field.income += value;
        if (type === "expense") field.expense += value;
        if (paymentType === "pending") field.paymentsPending += value;
        if (paymentType === "concluded") field.paymentsConcluded += value;
      }

      return field;
  }

  const balance = balanceCalculation();

  function Button() {
    return (
      <Pressable
        style={{ position: 'relative', alignItems: 'center', width: 'auto', backgroundColor: Colors.light.background }}
        onPress={toggleExpand}
      >
        <MaterialIcons name={isExpanded ? 'expand-less' : 'expand-more'} size={20} color={Colors.light.highlightBackgroun_1} />
      </Pressable>
    );
  }

  function Menu({ children }: { children?: React.ReactNode }) {
    if (!isExpanded) return null;

    return (
      <View style={styles.dropdown}>
        {children}
        <Button />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      <Pressable style={styles.containerContent} onPress={() => setIsExpanded(!isExpanded)}>
        <Text style={styles.text}>Saldo total:</Text>
        <Text style={styles.text}>R$ {balance.total.toFixed(2)}</Text>
      </Pressable>

      <Button />

      <Menu
        children={
          <Pressable style={{ gap: 10 }} onPress={() => setIsExpanded(false)}>
            <View style={styles.item}>
              <Text style={styles.text}>Saldo de entradas:</Text>
              <Text style={styles.text}>R$ {balance.income.toFixed(2)}</Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.text}>Saldo de saídas:</Text>
              <Text style={styles.text}>R$ {balance.expense.toFixed(2)}</Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.text}>Saldo de pagamentos concluídos:</Text>
              <Text style={styles.text}>R$ {balance.paymentsConcluded.toFixed(2)}</Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.text}>Saldo de pagamentos pendentes:</Text>
              <Text style={styles.text}>R$ {balance.paymentsPending.toFixed(2)}</Text>
            </View>
          </Pressable>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.light.background, borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: 'grey' },
  containerContent: {
    backgroundColor: Colors.light.background, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10
  }, text: { fontSize: 12, fontStyle: 'italic', backgroundColor: 'white' },
  dropdown: {
    width: '100%', position: "absolute", top: '40%', zIndex: 999, marginTop: 0, backgroundColor: Colors.light.background, paddingTop: 10,
    paddingStart: 10, paddingEnd: 10, gap: 8, borderBottomWidth: 0.5, borderColor: 'grey'
  },
  item: { flexDirection: 'row', justifyContent: 'space-between' }
});

export default BalanceScreen;