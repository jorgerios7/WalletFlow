import { LoadTransactions } from '@/app/services/firebase/FinanceService';
import { Entries, Transactions } from '@/app/types/Finance';
import ConfirmationScreen from '@/components/ui/ConfirmationScreen';
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
  const [paymentScreen, setPaymentScreen] = useState(
    {
      isVisible: false, id: { transaction: '', entry: '' },
      values: { paymentType: '', paymentDate: '', paymentMethod: '', paymentBank: '', paymentBankCard: '' }
    }
  );

  const [financeReportScreen, setFinanceReportScreen] = useState({ isVisible: false, data: null as Transactions | null });

  const [confirmationScreen, setConfirmationScreen] = useState({ isVisible: false, message: '', id: '' });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchEntries = async () => {
      const entries = await LoadTransactions(group_id, setLoading);
      if (isMounted) setEntriesList(entries || []);
    };

    fetchEntries();

    return () => { isMounted = false };
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
          setPaymentScreen({
            isVisible: true, id: { transaction: id.transaction, entry: id.entry },
            values: {
              paymentType: values.paymentType, paymentDate: values.paymentDate, paymentMethod: values.paymentMethod,
              paymentBank: values.paymentBank, paymentBankCard: values.paymentBankCard
            }
          });
        }}
        onPressDelete={(id) => setConfirmationScreen({ isVisible: true, message: 'Tem certeza que deseja excluir esta entrada?', id: id })}
        onPressingInfo={(list) => { setFinanceReportScreen({ isVisible: true, data: list }) }}
      />

      <ContentScreen
        visible={paymentScreen.isVisible}
        title={'Editar pagamento'}
        uploading={false}
        children={
          <PaymentScreen
            ids={{ group: group_id, transaction: paymentScreen.id.transaction, entry: paymentScreen.id.entry }}
            values={
              {
                paymentType: paymentScreen.values.paymentType, paymentDate: paymentScreen.values.paymentDate, paymentMethod: paymentScreen.values.paymentMethod,
                paymentBank: paymentScreen.values.paymentBank, paymentBankCard: paymentScreen.values.paymentBankCard
              }}
            onDismiss={() => {
              setPaymentScreen({
                isVisible: false, id: { transaction: '', entry: '' },
                values: { paymentType: '', paymentDate: '', paymentMethod: '', paymentBank: '', paymentBankCard: '' }
              });
            }}
          />
        }
      />

      <FinanceReportScreen
        isVisible={financeReportScreen.isVisible}
        data={financeReportScreen.data}
        onClose={() => setFinanceReportScreen({ isVisible: false, data: null })}
      />

      <ConfirmationScreen
        isVisible={confirmationScreen.isVisible}
        message={confirmationScreen.message}
        onConfirm={() => console.log('Delete entry with id:', confirmationScreen.id)}
        onCancel={() => setConfirmationScreen((prev) => ({ ...prev, isVisible: false, id: '' }))} />
    </View>
  );
};

export default TransactionsScreen;
