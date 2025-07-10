import { RouteProp, useRoute } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { db } from '../config/firebaseConfig';
import { User } from '../types/User';

type AnalysisScreenRouteProp = RouteProp<{ Analysis: { user: User } }, 'Analysis'>;
const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: 'rgb(206, 206, 206)',
  backgroundGradientTo: 'rgb(248, 249, 255)',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

export default function AnalysisScreen() {
  const route = useRoute<AnalysisScreenRouteProp>();
    const { user } = route.params;
    const HOME_ID = user.homeId;
  const insets = useSafeAreaInsets();
  const [rawData, setRawData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, `homes/${HOME_ID}/transactions`));
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setRawData(data);
      } catch (error) {
        console.error('Erro ao buscar transações:', error);
      }
    };

    fetchData();
  }, []);

  function extractMonth(dateStr: string) {
    const [day, month, year] = dateStr.split('/');
    return `${month}/${year}`;
  }

  const monthlyMap: Record<string, { income: number; expense: number }> = {};
  rawData.forEach((item) => {
    const month = extractMonth(item.startDate);
    if (!monthlyMap[month]) {
      monthlyMap[month] = { income: 0, expense: 0 };
    }
    if (item.type === 2) {
      monthlyMap[month].income += item.totalValue;
    } else if (item.type === 3) {
      monthlyMap[month].expense += item.totalValue;
    }
  });

  const months = Object.keys(monthlyMap);
  const incomeValues = months.map((m) => monthlyMap[m].income);
  const expenseValues = months.map((m) => monthlyMap[m].expense);

  const categoryMap: Record<string, number> = {};
  rawData.forEach((item) => {
    if (item.type === 3) {
      categoryMap[item.category] = (categoryMap[item.category] || 0) + item.totalValue;
    }
  });

  const pieData = Object.entries(categoryMap).map(([name, amount], i) => ({
    name,
    amount,
    color: ['#f54242', '#f5a142', '#42f5aa', '#4287f5', '#9b59b6', '#10b981'][i % 6],
    legendFontColor: '#333',
    legendFontSize: 14,
  }));

  const methodMap: Record<string, number> = {};
  rawData.forEach((item) => {
    if (item.type === 3) {
      methodMap[item.method] = (methodMap[item.method] || 0) + item.totalValue;
    }
  });
  const methods = Object.keys(methodMap);
  const methodValues = methods.map((m) => methodMap[m]);

  return (
    <ScrollView contentContainerStyle={[styles.container, { paddingBottom: insets.bottom + 60 }]}>
      

      <Text style={styles.title}>Entradas por Mês</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <BarChart
          style={styles.containerContent}
          data={{ labels: months, datasets: [{ data: incomeValues }] }}
          width={months.length * 60}
          height={250}
          yAxisLabel="R$"
          yAxisSuffix=""
          chartConfig={{ ...chartConfig, color: () => 'green' }}
          fromZero
        />
      </ScrollView>

      <Text style={styles.title}>Saídas por Mês</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <BarChart
          style={styles.containerContent}
          data={{ labels: months, datasets: [{ data: expenseValues }] }}
          width={months.length * 60}
          height={250}
          yAxisLabel="R$"
          yAxisSuffix=""
          chartConfig={{ ...chartConfig, color: () => 'red' }}
          fromZero
        />
      </ScrollView>

      <Text style={styles.title}>Gastos por Categoria</Text>
      <PieChart
        style={styles.containerContent}
        data={pieData}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        accessor="amount"
        paddingLeft='0'
        backgroundColor="transparent"
        absolute
      />

      <Text style={styles.title}>Gastos por Método de Pagamento</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <BarChart
          style={styles.containerContent}
          data={{ labels: methods, datasets: [{ data: methodValues }] }}
          width={methods.length * 100}
          height={250}
          yAxisLabel="R$"
          yAxisSuffix=""
          chartConfig={chartConfig}
          fromZero
        />
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12 },
  containerContent: { borderRadius: 10 },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 12,
  },
});
