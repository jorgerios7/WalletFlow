import { db } from '@/app/config/firebaseConfig';
import { Payment, Transactions } from '@/app/types/Finance';
import { User } from '@/app/types/User';
import Header from '@/components/ui/Header';
import { BottomSheet } from '@/components/ui/sheet/BottomSheet';
import TotalValueScreen from '@/components/ui/TotalValueScreen';
import { RouteProp, useRoute } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import CalendarNavigator from './calendarNavigator';
import FinanceItemRecycler from './recyclerFinanceItem';
import FinanceReportScreen from './recyclerFinanceItem/financeReportScreen';

type TransactionsScreenRouteProp = RouteProp<{ Transactions: { user: User } }, 'Transactions'>;

const TransactionsScreen = () => {
  const route = useRoute<TransactionsScreenRouteProp>();
  const { user } = route.params;
  const groupId = user.groupId;
  const [date, setDate] = useState('');
  const [dataBase, setDataBase] = useState<Transactions[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [selectedItemData, setSelectedItemData] = useState<Transactions | null>(null);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const snapshot = await getDocs(collection(db, `groups/${groupId}/transactions`));
      const data: Transactions[] = snapshot.docs.map((doc) => ({
        transactionId: doc.id,
        ...doc.data(),
      })) as Transactions[];
      setDataBase(data);
    } catch (error) {
      console.error("(TransactionsScreen.tsx) Erro ao carregar dados: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [date]);

  return (
    <View style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
      <Header >
        <View style={{ height: 60 }}></View>
      </Header>

      <CalendarNavigator
        onDateChange={(date) => setDate(date.toLocaleDateString('pt-BR'))}
      />

      <TotalValueScreen value={totalValue} />

      <FinanceItemRecycler
        list={dataBase}
        loading={loading}
        dateFilter={date}
        isStatusFilteringEnabled={false}
        paymentFilter={Payment.pending}
        onTotalValueChange={(total) => setTotalValue(total)}
        bottomMargin={96}
        onPressingItem={(selectedItem) => {
          setSelectedItemData(selectedItem);
          setShowBottomSheet(true);
        }}
      />
      <SafeAreaView style={styles.sheetWrapper}>
        <BottomSheet
          isFullHeight={true}
          visible={showBottomSheet}
          onClose={() => setShowBottomSheet(false)}
          isDragHandleVisible={false}
        >
          {selectedItemData && (
            <FinanceReportScreen data={selectedItemData} />
          )}
        </BottomSheet>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  sheetWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default TransactionsScreen;
