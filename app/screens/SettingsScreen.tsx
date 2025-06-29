import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HorizontalCalendar from '../navigation/HorizontalCalendar';

const SettingsScreen = () => {
  const [dateSelected, setDate] = useState('');

  return (
    <View >
      <HorizontalCalendar onDateChange={(date) => {
        setDate(date.toLocaleDateString('pt-BR'));
      }} />
      <Text>{dateSelected}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default SettingsScreen;
