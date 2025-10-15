import { db } from '@/app/config/firebaseConfig';
import { Entries, Transactions } from '@/app/types/Finance';
import { User } from '@/app/types/User';
import Header from '@/components/ui/Header';
import TotalValueScreen from '@/components/ui/TotalValueScreen';
import { RouteProp, useRoute } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import CalendarNavigator from './calendarNavigator';
import FinanceItemRecycler from './recyclerFinanceItem';
import FinanceReportScreen from './recyclerFinanceItem/financeReportScreen';

type TransactionsScreenRouteProp = RouteProp<{ Transactions: { user: User } }, 'Transactions'>;

const TransactionsScreen = () => {
  const route = useRoute<TransactionsScreenRouteProp>();
  const { user } = route.params;
  const groupId = user.groupId;
  const [date, setDate] = useState('');
  const [entriesList, setEntriesList] = useState<Entries[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [showFinanceReportScreen, setShowFinanceReportScreen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Transactions | null>(null);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);

      const transactionsRef = collection(db, `groups/${groupId}/transactions`);
      const transactionsSnapshot = await getDocs(transactionsRef);

      const entries: Entries[] = [];

      for (const transactionDoc of transactionsSnapshot.docs) {
        if (transactionDoc.id === 'undefined') return null;

        const transData = transactionDoc.data();

        const entriesRef = collection(db, `groups/${groupId}/transactions/${transactionDoc.id}/entries`);

        const entriesSnapshot = await getDocs(entriesRef);

        const entriesDocs = entriesSnapshot.docs.map((doc) => {
          const entData = doc.data() as Partial<Entries>;
          return {
            installmentId: doc.id, transactionId: transactionDoc.id, category: transData.category, type: entData.type,
            startDate: transData.startDate, totalEntries: transData.totalEntries, dueDate: entData.dueDate,
            totalValue: transData.totalValue, payment: entData.payment, paymentDate: entData.paymentDate, method: entData.method,
            ...entData
          } as Entries;
        });

        entries.push(...entriesDocs);
      }

      setEntriesList(entries);

    } catch (error) {
      console.error("(TransactionsScreen.tsx) Erro ao carregar dados: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData() }, [date]);

  return (
    <View style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
      <Header>
        <View style={{ height: 60 }} />
      </Header>

      <CalendarNavigator onDateChange={(date) => setDate(date.toLocaleDateString('pt-BR'))} />

      <TotalValueScreen value={totalValue} />

      <FinanceItemRecycler
        entries_list={entriesList}
        selectedDate={date}
        selectedPaymentType={'concluded'}
        isLoading={loading}
        onTotalValueChange={(total) => setTotalValue(total)}
        bottomMargin={96}
        onPressingItem={(selected) => {
          setSelectedItem(selected);
          setShowFinanceReportScreen(true);
        }}
      />

      <FinanceReportScreen
        isVisible={showFinanceReportScreen}
        data={selectedItem}
        onClose={() => setShowFinanceReportScreen(false)}
      />
    </View>
  );
};

export default TransactionsScreen;
