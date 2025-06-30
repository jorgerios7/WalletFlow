import TotalValueScreen from '@/components/ui/TotalValueScreen';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import HorizontalCalendar from '../navigation/HorizontalCalendar';

const SettingsScreen = () => {
  const [dateSelected, setDate] = useState('');

  return (
    <View >
      <HorizontalCalendar onDateChange={(date) => {
        setDate(date.toLocaleDateString('pt-BR'));
      }} />

      <TotalValueScreen value={'123,00'}/>
      
      <Text>{dateSelected}</Text>
    </View>
  );
};

export default SettingsScreen;
