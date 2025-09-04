import FinancialItem from '@/app/layout/FinancialItem';
import { Transactions, Type } from '@/app/types/Finance';
import { Colors } from '@/constants/Colors';
import React, { useEffect } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';

interface ItemRecyclerProps {
  list: Transactions[];
  dateFilter?: string;
  isStatusFilteringEnabled: boolean;
  paymentFilter?: string;
  onTotalValueChange?: (total: number) => void;
  bottomMargin?: number;
  onPressingItem: (datas: Transactions) => void;
}

interface Section {
  title: string;
  data: Transactions[];
}

const groupByDate = (list: Transactions[]): Section[] => {
  const grouped: { [key: string]: Transactions[] } = {};

  for (const item of list) {
    if (!grouped[item.dueDate]) {
      grouped[item.dueDate] = [];
    }
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
    .map((date) => ({
      title: date,
      data: grouped[date],
    }));
};

const RecyclerItem: React.FC<ItemRecyclerProps> = ({
  list,
  dateFilter,
  isStatusFilteringEnabled,
  paymentFilter,
  onTotalValueChange,
  bottomMargin = 0,
  onPressingItem,
}) => {

  const filteredList = list.filter((item) => {
    if (!dateFilter) return true;

    const [itemDay, itemMonth, itemYear] = item.dueDate.split('/');
    const [filterDay, filterMonth, filterYear] = dateFilter.split('/');

    return itemMonth === filterMonth && itemYear === filterYear;
  });

  const filteredPaidList = filteredList.filter((item) => {
    if (!isStatusFilteringEnabled) return true;
    return item.payment === paymentFilter;
  });

  const totalValue = filteredPaidList.reduce((sum, item) => {
    const signedValue =
      item.type === Type.expense ? -item.totalValue : item.totalValue;
    return sum + signedValue;
  }, 0);

  useEffect(() => {
    onTotalValueChange?.(totalValue);
  }, [totalValue, onTotalValueChange]);

  const sections = groupByDate(filteredList);

  return (
    <View style={{ flex: 1 }}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.transactionId}
        renderItem={({ item }) => (
          <FinancialItem item={item} onPress={onPressingItem} />
        )}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{section.title}</Text>
          </View>
        )}
        style={[styles.scrollContent, { marginBottom: bottomMargin }]}
        ListHeaderComponent={<View style={styles.headerSpacer} />}
        ListFooterComponent={<View style={styles.footerSpacer} />}
        stickySectionHeadersEnabled
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    backgroundColor: Colors.light.shadow,
  },
  headerSpacer: {
    height: 10,
  },
  footerSpacer: {
    height: 0,
  },
  sectionHeader: {
    backgroundColor: Colors.light.shadow,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sectionHeaderText: {
    fontSize: 12,
    color: Colors.light.text,
    alignSelf: 'center'
  },
});

export default RecyclerItem;
