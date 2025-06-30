import FinanceData from '@/assets/database/FinanceData';
import RecyclerItem from '@/components/ui/RecyclerItem';
import TotalValueScreen from '@/components/ui/TotalValueScreen';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import HorizontalCalendar from '../navigation/HorizontalCalendar';

const SettingsScreen = () => {
  const [dateSelected, setDate] = useState('');
  const [dataBase, setDataBase] = useState<any[]>([]);
  const [totalValue, setTotalValue] = useState(0);

  const loadData = () => {
    return FinanceData();
  };

  useEffect(() => {
    const data = loadData();
    setDataBase(data);

  }, [dateSelected]);

  return (
    <View style={{ flex: 1 }}>
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
        adjustMarginBottom={96}
      />
    </View>
  );
};

export default SettingsScreen;
