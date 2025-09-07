import Header from '@/components/ui/Header';
import RecyclerItem from '@/components/ui/RecyclerItem';
import { BottomSheet } from '@/components/ui/sheet/BottomSheet';
import TotalValueScreen from '@/components/ui/TotalValueScreen';
import { RouteProp, useRoute } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { db } from '../config/firebaseConfig';
import FinancialReportScreen from '../layout/FinancialReportScreen';
import HorizontalCalendar from '../navigation/HorizontalCalendar';
import { Payment, Transactions } from '../types/Finance';
import { User } from '../types/User';

type TransactionScreenRouteProp = RouteProp<{ Transactions: { user: User } }, 'Transactions'>;

const TransactionScreen = () => {
  const route = useRoute<TransactionScreenRouteProp>();
  const { user } = route.params;
  const groupId = user.groupId;
  const [date, setDate] = useState('');
  const [dataBase, setDataBase] = useState<Transactions[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [selectedItemData, setSelectedItemData] = useState<Transactions | null>(null);

  const loadData = async () => {
    const snapshot = await getDocs(collection(db, `groups/${groupId}/transactions`));
    const data: Transactions[] = snapshot.docs.map((doc) => ({
      transactionId: doc.id,
      ...doc.data(),
    })) as Transactions[];
    setDataBase(data);
  };

  useEffect(() => {
    loadData();
  }, [date]);

  return (
    <View style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>

      <Header >
        <View style={{ height: 60 }}></View>
      </Header>

      <HorizontalCalendar
        onDateChange={(date) => setDate(date.toLocaleDateString('pt-BR'))}
      />

      <TotalValueScreen value={totalValue} />

      <RecyclerItem
        list={dataBase}
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
            <FinancialReportScreen data={selectedItemData} />
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

export default TransactionScreen;
