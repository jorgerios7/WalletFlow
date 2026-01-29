import { useFinancial } from '@/app/context/FinancialProvider';
import { DeleteEntry } from '@/app/services/firebase/financeService/deleteEntry';
import {
  BalanceValues,
  ConfirmationScreenValues,
  DeleteEntryProps,
  MixedTransactionEntry,
  PaymentScreenValues,
  ReportScreenValues,
} from '@/app/types/Finance';
import ConfirmActionModal from '@/components/ui/confirmActionModal';
import React, { useState } from 'react';
import { View } from 'react-native';
import BalanceScreen from './balanceScreen';
import CalendarNavigator from './calendarNavigator';
import FinanceItemRecycler from './recyclerFinanceItem';
import FinanceReportScreen from './recyclerFinanceItem/financeReportScreen';
import PaymentScreen from './transactionEditor/paymentScreen';

const TransactionsScreen = () => {
  const {
    entriesData,
    setDate,
    loading,
    group_id,
    financialBalance,
    refresh
  } = useFinancial();

  const [screenState, setScreenState] = useState({
    PaymentScreenValues,
    ReportScreenValues,
    ConfirmationScreenValues
  });

  async function handleDelete(state: DeleteEntryProps) {
    await DeleteEntry({
      groupId: group_id,
      transactionId: state.ids.transaction,
      entryId: state.ids.entry,
      onDeleting: () => {
        setScreenState((prev) => ({ ...prev, ConfirmationScreenValues }));
        refresh();
      }
    });
  }

  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <CalendarNavigator
        onDateChange={(date) => setDate(date.toLocaleDateString('pt-BR'))}
      />

      <BalanceScreen
        isLoading={loading}
        balanceValues={financialBalance as BalanceValues}
      />

      <FinanceItemRecycler
        entries_list={entriesData || []}
        isLoading={loading}
        onPressingEditPayment={(id, values) => {
          setScreenState((prev) => ({
            ...prev,
            PaymentScreenValues: {
              isVisible: true,
              id: {
                transaction: id.transaction,
                entry: id.entry
              },
              values: {
                paymentType: values.paymentType,
                paymentDate: values.paymentDate,
                paymentMethod: values.paymentMethod,
                paymentBank: values.paymentBank,
                paymentBankCard: values.paymentBankCard
              }
            }
          }))
        }}
        onPressDelete={(id, values) =>
          setScreenState((prev) => ({
            ...prev,
            ConfirmationScreenValues: {
              isVisible: true,
              message: `Tem certeza que deseja excluir esta ${values.paymentType} no valor de R$ ${values.value}?`,
              transactionId: id.transaction,
              entryId: id.entry
            }
          }))
        }
        onPressingInfo={(list) => {
          setScreenState((prev) => ({
            ...prev,
            ReportScreenValues: {
              isVisible: true,
              data: list
            }
          }))
        }}
      />
      <PaymentScreen
        isVisible={screenState.PaymentScreenValues.isVisible}
        id={{
          transaction: screenState.PaymentScreenValues.id.transaction,
          entry: screenState.PaymentScreenValues.id.entry
        }}
        values={{
          paymentType: screenState.PaymentScreenValues.values.paymentType,
          paymentDate: screenState.PaymentScreenValues.values.paymentDate,
          paymentMethod: screenState.PaymentScreenValues.values.paymentMethod,
          paymentBank: screenState.PaymentScreenValues.values.paymentBank,
          paymentBankCard: screenState.PaymentScreenValues.values.paymentBankCard
        }}
        onDismiss={() => {
          setScreenState((prev) => ({ ...prev, PaymentScreenValues }));
        }}
      />

      <FinanceReportScreen
        isVisible={screenState.ReportScreenValues.isVisible}
        data={screenState.ReportScreenValues.data as MixedTransactionEntry}
        onClose={() => setScreenState((prev) => ({ ...prev, ReportScreenValues }))}
      />

      <ConfirmActionModal
        isVisible={screenState.ConfirmationScreenValues.isVisible}
        confirmationMessage={screenState.ConfirmationScreenValues.message}
        onConfirm={() =>
          handleDelete({
            ids: {
              transaction: screenState.ConfirmationScreenValues.transactionId,
              entry: screenState.ConfirmationScreenValues.entryId
            }
          })}
        onCancel={() => setScreenState((prev) => ({ ...prev, ConfirmationScreenValues }))} />
    </View>
  );
};

export default TransactionsScreen;
