import { PreferencesContext } from '@/app/context/PreferencesProvider';
import { LoadScreen } from '@/app/pages/LoadScreen';
import NotFoundScreen from '@/app/pages/NotFoundScreen';
import { MixedTransactionEntry, Transactions, UpdateEntryProps } from '@/app/types/Finance';
import { Colors } from '@/constants/Colors';
import React, { useContext } from 'react';
import { SectionList, View } from 'react-native';
import FinanceDetailsItem from './financeDetailsItem';
import { GroupEntriesByDate } from './groupEntriesByDate';
import { HeaderSection } from './headerSection';

interface Props {
  entries_list: MixedTransactionEntry[];
  isLoading: boolean;
  onPressingInfo: (items: Transactions) => void;
  onPressDelete: (id: { transaction: string, entry: string }, values: { paymentType: string, value: number }) => void;
  onPressingEditPayment: (id: { transaction: string, entry: string }, values: UpdateEntryProps) => void
}

const FinanceItemRecycler: React.FC<Props> = ({ entries_list, isLoading, onPressingInfo, onPressDelete, onPressingEditPayment }) => {

  const { preferences } = useContext(PreferencesContext);

  const sections = GroupEntriesByDate(entries_list);

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (

        <LoadScreen />

      ) : sections.length === 0 ? (

        <NotFoundScreen />

      ) : (
        <SectionList
          stickySectionHeadersEnabled
          style={{
            backgroundColor: Colors[preferences.theme.appearance].background,
            padding: 10
          }}
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
                    type: values.type,
                    paymentType: values.paymentType,
                    paymentDate: values.paymentDate,
                    paymentMethod: values.paymentMethod,
                    paymentBank: values.paymentBank,
                    paymentBankCard: values.paymentBankCard, 
                    value: values.value
                  }
                  )
                }
                onPressingDelete={onPressDelete}
                onPressingInfo={onPressingInfo}
              />
            );
          }}
          renderSectionHeader={({ section }) =>
            <HeaderSection
              date={section.title}
              value={section.value}
            />
          }
          ListHeaderComponent={
            <View
              style={{ height: 10 }}
            />
          }
          ItemSeparatorComponent={() =>
            <View
              style={{ height: 0 }}
            />
          }
          SectionSeparatorComponent={() =>
            <View
              style={{ height: 10 }}
            />
          }
        />
      )}
    </View>
  );
};

export default FinanceItemRecycler;
