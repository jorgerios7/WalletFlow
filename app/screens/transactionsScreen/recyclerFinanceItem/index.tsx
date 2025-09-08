import { LoadScreen } from '@/app/pages/LoadScreen';
import NotFoundScreen from '@/app/pages/NotFoundScreen';
import { Transactions, Type } from '@/app/types/Finance';
import { Colors } from '@/constants/Colors';
import React, { useEffect } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import FinanceDetailsItem from './financeDetailsItem';

interface Props {
  list: Transactions[];
  dateFilter?: string;
  isStatusFilteringEnabled: boolean;
  paymentFilter?: string;
  onTotalValueChange?: (total: number) => void;
  bottomMargin?: number;
  onPressingItem: (datas: Transactions) => void;
  loading: boolean;
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

const FinanceItemRecycler: React.FC<Props> = ({
  list,
  dateFilter,
  isStatusFilteringEnabled,
  paymentFilter,
  onTotalValueChange,
  bottomMargin = 0,
  onPressingItem,
  loading
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

  function HeaderSection({ text }: { text: string }) {
    return (
      <View style={{
        backgroundColor: Colors.light.shadow, paddingVertical: 8, paddingHorizontal: 16,
      }}>
        <Text
          style={{
            fontSize: 12, color: Colors.light.text, alignSelf: 'center'
          }}
        >
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
          sections={sections}
          keyExtractor={(item) => item.transactionId}
          renderItem={({ item }) => (
            <FinanceDetailsItem item={item} onPress={onPressingItem} />
          )}
          renderSectionHeader={({ section }) => (
            <HeaderSection text={section.title} />
          )}
          style={[styles.scrollContent, { marginBottom: bottomMargin }]}
          ListHeaderComponent={<View style={styles.headerSpacer} />}
          ListFooterComponent={<View style={styles.footerSpacer} />}
          stickySectionHeadersEnabled
        />
      )}
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
  }
});

export default FinanceItemRecycler;
