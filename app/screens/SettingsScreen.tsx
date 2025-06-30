import FinanceData from '@/assets/database/financeData';
import RecyclerItem from '@/components/ui/RecyclerItem';
import TotalValueScreen from '@/components/ui/TotalValueScreen';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import HorizontalCalendar from '../navigation/HorizontalCalendar';

const SettingsScreen = () => {
  const [dateSelected, setDate] = useState('');
  const [dataBase, setDataBase] = useState<any[]>([]);
  const [totalValue, setTotalValue] = useState(0)

  useEffect(() => {
    const data = FinanceData();
    setDataBase(data);

  }, []);

  return (
    <View >
      <HorizontalCalendar onDateChange={(date) => {
        setDate(date.toLocaleDateString('pt-BR'));
      }} />

      <TotalValueScreen value={totalValue} />

      <RecyclerItem
        list={dataBase}
        dateFilter={'02/06/2025'}
        isStatusFilteringEnabled={false}
        statusFilter={false}
        onTotalValueChange={(total) => setTotalValue(total)}
      />

    </View>
  );
};

export default SettingsScreen;
