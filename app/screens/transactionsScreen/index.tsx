import { DeleteEntry, LoadTransactions } from '@/app/services/firebase/FinanceService';
import { Entries, MixedTransactionEntry, Transactions } from '@/app/types/Finance';
import ConfirmationScreen from '@/components/ui/ConfirmationScreen';
import Header from '@/components/ui/Header';
import { Colors } from '@/constants/Colors';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import BalanceScreen from './balanceScreen';
import CalendarNavigator from './calendarNavigator';
import FinanceItemRecycler from './recyclerFinanceItem';
import FinanceReportScreen from './recyclerFinanceItem/financeReportScreen';
import ContentScreen from './transactionEditor/contentScreen';
import PaymentScreen from './transactionEditor/paymentScreen';

const TransactionsScreen = ({ group_id }: { group_id: string }) => {
  const [date, setDate] = useState('');
  const [loadData, setLoadData] = useState(false);
  const [entriesList, setEntriesList] = useState<Entries[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [paymentScreen, setPaymentScreen] = useState(
    {
      isVisible: false,
      id: { transaction: '', entry: '' },
      values: { paymentType: '', paymentDate: '', paymentMethod: '', paymentBank: '', paymentBankCard: '' }
    }
  );

  const [financeReportScreen, setFinanceReportScreen] = useState({ isVisible: false, data: null as Transactions | null });

  const [confirmationScreen, setConfirmationScreen] = useState({ isVisible: false, message: '', transactionId: '', entryId: '' });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchEntries = async () => {
      const entries = await LoadTransactions(date, group_id, setLoading);
      if (isMounted) setEntriesList(entries || []);
    };

    fetchEntries();

    return () => { isMounted = false };
  }, [date, loadData]);

  async function handleDelete(transactionId: string, entryId: string) {
    try {
      await DeleteEntry({
        ids: { group: group_id, transaction: transactionId, entry: entryId },
        onDelete: (isDeleting) => {
          setLoadData(isDeleting);
          setConfirmationScreen({ isVisible: false, message: "", transactionId: "", entryId: "" });
        }
      });
    } catch (error) {
      console.error("(transactionsScreen.tsx) Erro ao deletar entrada: ", error);
    }
  }
 
  return (
    <View style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
      <Header backgroundColor={Colors.light.background}><View style={{ height: 40 }} /></Header>

      <CalendarNavigator onDateChange={(date) => setDate(date.toLocaleDateString('pt-BR'))} />

      <BalanceScreen isLoading={loading} list={entriesList} totalValue={totalValue}/>

      <FinanceItemRecycler
        entries_list={entriesList}
        isLoading={loading}
        onTotalValueChange={(total) => setTotalValue(total)}
        bottomMargin={96}
        onPressingEditPayment={(id, values) => {
          setPaymentScreen({
            isVisible: true,
            id: { transaction: id.transaction, entry: id.entry },
            values: {
              paymentType: values.paymentType, paymentDate: values.paymentDate, paymentMethod: values.paymentMethod,
              paymentBank: values.paymentBank, paymentBankCard: values.paymentBankCard
            }
          });
        }}
        onPressDelete={(id, values) => setConfirmationScreen(
          {
            isVisible: true, message: `Tem certeza que deseja excluir esta ${values.paymentType} no valor de R$ ${values.value}?`,
            transactionId: id.transaction, entryId: id.entry
          }
        )}
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
              }
            }
            onUpdate={setLoadData}
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
        data={financeReportScreen.data as MixedTransactionEntry}
        onClose={() => setFinanceReportScreen({ isVisible: false, data: null })}
      />

      <ConfirmationScreen
        isVisible={confirmationScreen.isVisible}
        message={confirmationScreen.message}
        onConfirm={() => handleDelete(confirmationScreen.transactionId, confirmationScreen.entryId)}
        onCancel={() => setConfirmationScreen({ isVisible: false, message: "", transactionId: "", entryId: "" })} />
    </View>
  );
};

export default TransactionsScreen;
