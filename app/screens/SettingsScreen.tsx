import FinanceData from '@/assets/database/FinanceData';
import RecyclerItem from '@/components/ui/RecyclerItem';
import { BottomSheet } from '@/components/ui/sheet/BottomSheet';
import TotalValueScreen from '@/components/ui/TotalValueScreen';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import FinancialReportScreen from '../layout/FinancialReportScreen';
import HorizontalCalendar from '../navigation/HorizontalCalendar';
import Finance from '../types/Finance';

const SettingsScreen = () => {
  const [dateSelected, setDate] = useState('');
  const [dataBase, setDataBase] = useState<any[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [selectedItemData, setSelectedItemData] = useState<Finance | null>(null);

  const loadData = () => {
    return FinanceData();
  };

  useEffect(() => {
    const data = loadData();
    setDataBase(data);

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
  sheetText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default SettingsScreen;
