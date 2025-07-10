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
import { Transactions } from '../types/Finance';
import { User } from '../types/User';

type TransactionScreenRouteProp = RouteProp<{ Transactions: { user: User } }, 'Transactions'>;

const TransactionScreen = () => {
  const route = useRoute<TransactionScreenRouteProp>();
  const { user } = route.params;
  const HOME_ID = user.homeId;
  const [dateSelected, setDate] = useState('');
  const [dataBase, setDataBase] = useState<Transactions[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [selectedItemData, setSelectedItemData] = useState<Transactions | null>(null);

  // 🔄 Busca dados do Firestore
  const loadData = async () => {
    const snapshot = await getDocs(collection(db, `homes/${HOME_ID}/transactions`));
    const data: Transactions[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Transactions[];
    setDataBase(data);
  };

  useEffect(() => {
    loadData();
  }, [dateSelected]);

  return (
    <View style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
      <HorizontalCalendar
        onDateChange={(date) => {
          setDate(date.toLocaleDateString('pt-BR'));
        }}
      />

      <TotalValueScreen value={totalValue} />

      <RecyclerItem
        list={dataBase}
        dateFilter={dateSelected}
        isStatusFilteringEnabled={false}
        statusFilter={false}
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
