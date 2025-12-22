import { PreferencesContext } from '@/app/context/PreferencesProvider';
import { LoadScreen } from '@/app/pages/LoadScreen';
import NotFoundScreen from '@/app/pages/NotFoundScreen';
import { Entries, MixedTransactionEntry, Transactions, UpdateEntryProps } from '@/app/types/Finance';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import React, { useContext } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import FinanceDetailsItem from './financeDetailsItem';

interface Props {
  entries_list: MixedTransactionEntry[]; isLoading: boolean; onPressingInfo: (items: Transactions) => void;
  onPressDelete: (id: { transaction: string, entry: string }, values: { paymentType: string, value: number }) => void;
  onPressingEditPayment: (id: { transaction: string, entry: string }, values: UpdateEntryProps) => void
}

const FinanceItemRecycler: React.FC<Props> = ({
  entries_list, isLoading, onPressingInfo, onPressDelete, onPressingEditPayment
}) => {

  const { preferences } = useContext(PreferencesContext);

  const groupByDate = (entries: Entries[]): { title: string; data: Entries[]; value: number }[] => {
    const grouped: { [key: string]: Entries[] } = {};

    for (const entry of entries) {
      if (!grouped[entry.dueDate]) grouped[entry.dueDate] = [];
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
      .map((date) => {
        const [d, m, y] = date.split('/').map(Number);
        const dateObj = new Date(y, m - 1, d);

        const weekday = dateObj.toLocaleDateString('pt-BR', { weekday: 'long' });
        const day = dateObj.toLocaleDateString('pt-BR', { day: '2-digit' });
        const monthYear = dateObj.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

        const title = `${weekday}, dia ${day} de ${monthYear}`.toLowerCase();

        const value = grouped[date].reduce((sum, item) => {
          return sum + (item.paymentType === 'concluded' ? item.value : 0);
        }, 0);

        return { title, data: grouped[date], value };
      });
  };


  const sections = groupByDate(entries_list);

  function HeaderSection({ date, value }: { date: string, value: number }) {
    return (
      <View style={[styles.headerContainer, { backgroundColor: Colors[preferences.theme.appearance].headerBackground }]}>
        <Text style={[styles.textHeader, {
          color: Colors[preferences.theme.appearance].textContrast,
          fontSize: Typography[preferences.fontSizeType].xs.fontSize,
          lineHeight: Typography[preferences.fontSizeType].xs.lineHeight
        }]}
        >
          {date}
        </Text>
        <Text style={[styles.textHeader, {
          color: Colors[preferences.theme.appearance].textContrast,
          fontSize: Typography[preferences.fontSizeType].xs.fontSize,
          lineHeight: Typography[preferences.fontSizeType].xs.lineHeight
        }]}>
          Total: R$ {value.toFixed(2)}
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
          style={{ backgroundColor: Colors[preferences.theme.appearance].background }}
          sections={sections}
          keyExtractor={(item) => item.entrieId}
          renderItem={({ item, index, section }) => {
            const isFirst = index === 0;
            const isLast = index === section.data.length - 1;
            return (
              <FinanceDetailsItem
                data={item}
                dynamicBorder={{ isFirst, isLast }}
                onPressingEditPayment={(id, values) =>
                  onPressingEditPayment({
                    transaction: id.transaction, entry: id.entry
                  }, {
                    paymentType: values.paymentType,
                    paymentDate: values.paymentDate,
                    paymentMethod: values.paymentMethod,
                    paymentBank: values.paymentBank,
                    paymentBankCard: values.paymentBankCard
                  }
                  )
                }
                onPressingDelete={onPressDelete}
                onPressingInfo={onPressingInfo}
              />
            );
          }}
          renderSectionHeader={({ section }) => (<HeaderSection date={section.title} value={section.value} />)}
          ListHeaderComponent={<View style={{ height: 10 }} />}
          ItemSeparatorComponent={() => <View style={{ height: 0 }} />}
          SectionSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '95%', padding: 10, alignSelf: 'center', borderRadius: 10,
    alignContent: 'space-between', flexDirection: 'row', justifyContent: 'space-between'
  },
  textHeader: { fontSize: 12, alignSelf: 'center', fontStyle: 'italic' }
});

export default FinanceItemRecycler;
