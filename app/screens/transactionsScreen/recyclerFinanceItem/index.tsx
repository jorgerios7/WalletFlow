import { LoadScreen } from '@/app/pages/LoadScreen';
import NotFoundScreen from '@/app/pages/NotFoundScreen';
import { Entries, PaymentType, Transactions, UpdateEntryValues } from '@/app/types/Finance';
import { Colors } from '@/constants/Colors';
import React, { useEffect } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import FinanceDetailsItem from './financeDetailsItem';

interface Props {
  entries_list: Entries[]; selectedDate: string; selectedPaymentType: PaymentType; selectedMethodType?: string;
  selectedValue?: number; bottomMargin?: number; isLoading: boolean; onTotalValueChange: (total: number) => void;
  onPressingInfo: (items: Transactions) => void; onPressDelete: (id: string) => void;
  onPressingEditPayment: (iDs: { transaction: string, entry: string }, values: UpdateEntryValues) => void;
}

const FinanceItemRecycler: React.FC<Props> = ({
  entries_list, selectedDate, selectedPaymentType, selectedMethodType, selectedValue,
  bottomMargin = 0, isLoading, onTotalValueChange, onPressingInfo, onPressDelete, onPressingEditPayment
}) => {

  function filteredEntries() {
    const newList = entries_list.filter((listedEntries) => {
      if (!selectedDate) return true;

      const [listedDay, listedMonth, listedYear] = listedEntries.dueDate.split('/');
      const [selectedDay, selectedMonth, selectedYear] = selectedDate.split('/');

      const isDay = listedDay === selectedDay;
      const isMonth = listedMonth === selectedMonth;
      const isYear = listedYear === selectedYear;
      const isPayment = listedEntries.payment === selectedPaymentType;
      //const isMethod = listedEntries.purchasingMethod === selectedMethodType;
      const isValue = listedEntries.value === selectedValue;

      return (isMonth && isYear);
    });

    return newList;
  }

  const groupByDate = (entrys: Entries[]): { title: string; data: Entries[] }[] => {
    const grouped: { [key: string]: Entries[] } = {};

    for (const entry of entrys) {
      if (!grouped[entry.dueDate]) { grouped[entry.dueDate] = [] }
      grouped[entry.dueDate].push(entry);
    }

    return Object.keys(grouped)
      .sort((a, b) => {
        const [da, ma, ya] = a.split('/').map(Number);
        const [db, mb, yb] = b.split('/').map(Number);
        const dateA = new Date(ya, ma - 1, da);
        const dateB = new Date(yb, mb - 1, db);
        return dateA.getTime() - dateB.getTime();
      })
      .map((date) => ({ title: date, data: grouped[date] }))
  };

  const sections = groupByDate(filteredEntries());

  const totalValue = filteredEntries().reduce((sum, item) => {
    const validValues = item.payment === 'concluded' ? item.value : 0;
    return (sum + validValues);
  }, 0);

  useEffect(() => { onTotalValueChange(totalValue) }, [totalValue, onTotalValueChange]);

  function HeaderSection({ text }: { text: string }) {
    return (
      <View style={{ backgroundColor: Colors.light.shadow, paddingVertical: 8, paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 12, color: Colors.light.text, alignSelf: 'center' }}>
          {text}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <LoadScreen />
      ) : sections.length === 0 ? (
        <NotFoundScreen />
      ) : (
        <SectionList
          stickySectionHeadersEnabled
          style={[styles.scrollContent, { marginBottom: bottomMargin }]}
          sections={sections}
          keyExtractor={(item) => item.entrieId}
          renderItem={({ item }) => (
            <FinanceDetailsItem
              data={item}
              onPressingEditPayment={(id, values) =>
                onPressingEditPayment(
                  { transaction: id.transaction, entry: id.entry },
                  {
                    paymentType: values.paymentType, paymentDate: values.paymentDate, paymentMethod: values.paymentMethod,
                    paymentBank: values.paymentBank, paymentBankCard: values.paymentBankCard
                  }
                )
              }
              onPressingDelete={(id) => onPressDelete(id)}
              onPressingInfo={(selected) => onPressingInfo(selected)} />
          )}
          renderSectionHeader={({ section }) => (<HeaderSection text={section.title} />)}
          ListHeaderComponent={<View style={styles.headerSpacer} />}
          ListFooterComponent={<View style={styles.footerSpacer} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContent: { backgroundColor: Colors.light.shadow }, headerSpacer: { height: 10 }, footerSpacer: { height: 0 }
});

export default FinanceItemRecycler;
