import { LoadScreen } from '@/app/pages/LoadScreen';
import NotFoundScreen from '@/app/pages/NotFoundScreen';
import { Installment, Transactions, Type } from '@/app/types/Finance';
import { Colors } from '@/constants/Colors';
import React, { useEffect } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import FinanceDetailsItem from './financeDetailsItem';

interface Props {
  transaction_list: Transactions[]; installment_list: Installment[]; dateFilter?: string; isStatusFilteringEnabled: boolean;
  paymentFilter?: string; bottomMargin?: number; loading: boolean; onTotalValueChange?: (total: number) => void;
  onPressingItem: (transactionItems: Transactions, installmentItems: Installment) => void;
}

interface Section { title: string; data: Installment[] }

const groupByDate = (installments: Installment[]): Section[] => {
  const grouped: { [key: string]: Installment[] } = {};

  for (const item of installments) {
    if (!grouped[item.dueDate]) { grouped[item.dueDate] = [] }

    grouped[item.dueDate].push(item);
  }

  return Object.keys(grouped)
    .sort((a, b) => {
      const [da, ma, ya] = a.split('/').map(Number);
      const [db, mb, yb] = b.split('/').map(Number);
      const dateA = new Date(ya, ma - 1, da);
      const dateB = new Date(yb, mb - 1, db);
      return dateA.getTime() - dateB.getTime();
    })
    .map((date) => ({ title: date, data: grouped[date] }));
};

const FinanceItemRecycler: React.FC<Props> = ({
  transaction_list, installment_list, dateFilter, isStatusFilteringEnabled, paymentFilter, bottomMargin = 0,
  loading, onTotalValueChange, onPressingItem
}) => {

  const filteredList = installment_list.filter((item) => {
    if (!dateFilter) return true;

    const [itemDay, itemMonth, itemYear] = item.dueDate.split('/');
    const [filterDay, filterMonth, filterYear] = dateFilter.split('/');

    return itemMonth === filterMonth && itemYear === filterYear;
  });

  const sections = groupByDate(filteredList);

  const filteredPaidList = transaction_list.filter((item) => {
    if (!isStatusFilteringEnabled) return true;
    return item.payment === paymentFilter;
  });

  const totalValue = filteredPaidList.reduce((sum, item) => {
    const signedValue = item.type === Type.expense ? - item.totalValue : item.totalValue;

    return (sum + signedValue);
  }, 0);

  useEffect(() => { onTotalValueChange?.(totalValue) }, [totalValue, onTotalValueChange]);

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
      {loading ? (
        <LoadScreen />
      ) : sections.length === 0 ? (
        <NotFoundScreen />
      ) : (
        <SectionList
          stickySectionHeadersEnabled
          style={[styles.scrollContent, { marginBottom: bottomMargin }]}
          sections={sections}
          keyExtractor={(item) => item.installmentId}
          renderItem={({ item }) => (
            <FinanceDetailsItem
              transaction={item}
              installment={item}
              onPress={(transactionItem, installmentItem) => onPressingItem(transactionItem, installmentItem)} />
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
