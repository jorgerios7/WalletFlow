import { LoadTransactions } from '@/app/services/firebase/FinanceService';
import { Entries, Transactions } from '@/app/types/Finance';
import Header from '@/components/ui/Header';
import TotalValueScreen from '@/components/ui/TotalValueScreen';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import CalendarNavigator from './calendarNavigator';
import FinanceItemRecycler from './recyclerFinanceItem';
import FinanceReportScreen from './recyclerFinanceItem/financeReportScreen';
import ContentScreen from './transactionEditor/contentScreen';
import PaymentScreen from './transactionEditor/paymentScreen';

const TransactionsScreen = ({ group_id }: { group_id: string }) => {
  const [date, setDate] = useState('');
  const [entriesList, setEntriesList] = useState<Entries[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [paymentScreenVisibility, setPaymentScreenVisibility] = useState(false);
  const [id, setId] = useState({ transaction: '', entry: '' });
  const [itemValueSelected, setItemValueSelected] = useState(
    { paymentType: '', paymentDate: '', paymentMethod: '', paymentBank: '', paymentBankCard: '' }
  );
  const [showFinanceReportScreen, setShowFinanceReportScreen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Transactions | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchEntries = async () => {
      const entries = await LoadTransactions(group_id, setLoading);
      if (isMounted) setEntriesList(entries || []);
    };

    fetchEntries();

    return () => {
      isMounted = false;
    };
  }, [date]);

  return (
    <View style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
      <Header>
        <View style={{ height: 60 }} />
      </Header>

      <CalendarNavigator onDateChange={(date) => setDate(date.toLocaleDateString('pt-BR'))} />

      <TotalValueScreen value={totalValue} />

      <FinanceItemRecycler
        entries_list={entriesList}
        selectedDate={date}
        selectedPaymentType={'concluded'}
        isLoading={loading}
        onTotalValueChange={(total) => setTotalValue(total)}
        bottomMargin={96}
        onPressingEditPayment={(id, values) => {
          setPaymentScreenVisibility(true);
          setId({transaction: id.transaction, entry: id.entry});
          setItemValueSelected(
            {
              paymentType: values.paymentType, paymentDate: values.paymentDate, paymentMethod: values.paymentMethod,
              paymentBank: values.paymentBank, paymentBankCard: values.paymentBankCard
            }
          )
        }
        }
        onPressingInfo={(selected) => {
          setSelectedItem(selected);
          setShowFinanceReportScreen(true);
        }}
      />

      <ContentScreen
        visible={paymentScreenVisibility}
        title={'Editar pagamento'}
        uploading={false}
        children={
          <PaymentScreen
            iDs={{ group: group_id, transaction: id.transaction, entry: id.entry }}
            values={
              {
                paymentType: itemValueSelected.paymentType, paymentDate: itemValueSelected.paymentDate, paymentMethod: itemValueSelected.paymentMethod,
                paymentBank: itemValueSelected.paymentBank, paymentBankCard: itemValueSelected.paymentBankCard
              }
            }
            onDismiss={() => {
              setPaymentScreenVisibility(false);
              setId({ transaction: '', entry: '' })
              setItemValueSelected({ paymentType: '', paymentDate: '', paymentMethod: '', paymentBank: '', paymentBankCard: '' })
            }}
          />
        }
      />

      <FinanceReportScreen
        isVisible={showFinanceReportScreen}
        data={selectedItem}
        onClose={() => setShowFinanceReportScreen(false)}
      />
    </View>
  );
};

export default TransactionsScreen;
