import { LoadTransactions } from '@/app/services/firebase/FinanceService';
import { Entries, Transactions } from '@/app/types/Finance';
import { User } from '@/app/types/User';
import Header from '@/components/ui/Header';
import TotalValueScreen from '@/components/ui/TotalValueScreen';
import { RouteProp, useRoute } from '@react-navigation/native';
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

  useEffect(() => {
    let isMounted = true;

    const fetchEntries = async () => {
      const entries = await LoadTransactions(groupId, setLoading);
      if (isMounted) setEntriesList(entries || []);
    };

    fetchEntries();

    return () => {
      isMounted = false;
    };
  }, [date]);

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
