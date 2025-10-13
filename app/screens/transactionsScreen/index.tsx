import { db } from '@/app/config/firebaseConfig';
import { Installment, Payment, Transactions } from '@/app/types/Finance';
import { User } from '@/app/types/User';
import Header from '@/components/ui/Header';
import { BottomSheet } from '@/components/ui/sheet/BottomSheet';
import TotalValueScreen from '@/components/ui/TotalValueScreen';
import { RouteProp, useRoute } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import CalendarNavigator from './calendarNavigator';
import FinanceItemRecycler from './recyclerFinanceItem';
import FinanceReportScreen from './recyclerFinanceItem/financeReportScreen';

type TransactionsScreenRouteProp = RouteProp<{ Transactions: { user: User } }, 'Transactions'>;

const TransactionsScreen = () => {
  const route = useRoute<TransactionsScreenRouteProp>();
  const { user } = route.params;
  const groupId = user.groupId;
  const [date, setDate] = useState('');
  const [transactionsList, setTransactionsList] = useState<Transactions[]>([]);
  const [installmentList, setInstallmentsList] = useState<Installment[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transactions | null>(null);
  const [selectedInstallment, setSelectedInstallment] = useState<Installment | null>(null);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    if (!groupId) return;

    try {
      setLoading(true);

      const transactionsRef = collection(db, `groups/${groupId}/transactions`);
      const transactionsSnapshot = await getDocs(transactionsRef);

      const transactions: Transactions[] = [];
      const installments: Installment[] = [];

      for (const transactionDoc of transactionsSnapshot.docs) {
        const transData = transactionDoc.data();

        const transactionData: Transactions = {
          accountId: transData.accountId, transactionId: transData.id, createdBy: transData.createdBy, createdAt: transData.createdAt,
          installmentId: transData.installmentId, startDate: transData.startDate, description: transData.description, category: transData.category, 
          type: transData.type,installmentTotalNumber: transData.installmentTotalNumber, dueDate: transData.dueDate, paymentDate: transData.paymentDate,
          recurrenceType: transData.recurrenceType, payment: transData.payment, method: transData.method, totalValue: transData.totalValue
        };

        transactions.push(transactionData);

        console.log("Transaction totalValue: ", transactionData.totalValue);

        const installmentsRef = collection(db, `groups/${groupId}/transactions/${transactionDoc.id}/installments`);
        const installmentsSnapshot = await getDocs(installmentsRef);

        const installmentsDocs = installmentsSnapshot.docs.map((doc) => {
          const instData = doc.data() as Partial<Installment>;
          return {
            installmentId: doc.id, transactionId: transactionDoc.id, category: transactionData.category, type: transactionData.type,
            startDate: transactionData.startDate, installmentTotalNumber: transactionData.installmentTotalNumber,
            dueDate: instData.dueDate, totalValue: instData.value, payment: instData.payment, paymentDate: instData.paymentDate,
            method: instData.method, ...instData,
          } as Installment;
        });

        installments.push(...installmentsDocs);

        console.log("Installment value: ", installmentsDocs.map(inst => inst.value));
      }

      setTransactionsList(transactions);
      setInstallmentsList(installments);

    } catch (error) {
      console.error("(TransactionsScreen.tsx) Erro ao carregar dados: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    console.log("Transactions List: ", transactionsList[totalValue]);
    console.log("Installments List: ", installmentList.map(inst => inst.value));
  }, [date]);

  return (
    <View style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
      <Header >
        <View style={{ height: 60 }}></View>
      </Header>

      <CalendarNavigator onDateChange={(date) => setDate(date.toLocaleDateString('pt-BR'))} />

      <TotalValueScreen value={totalValue} />

      <FinanceItemRecycler
        transaction_list={transactionsList}
        installment_list={installmentList}
        loading={loading}
        dateFilter={date}
        isStatusFilteringEnabled={false}
        paymentFilter={Payment.pending}
        onTotalValueChange={(total) => setTotalValue(total)}
        bottomMargin={96}
        onPressingItem={(transactionItems, installmentItems) => {
          setSelectedTransaction(transactionItems);
          setSelectedInstallment(installmentItems);

          setShowBottomSheet(true);
        }}
      />
      <SafeAreaView style={styles.sheetWrapper}>
        <BottomSheet
          isFullHeight={true}
          visible={showBottomSheet}
          onClose={() => setShowBottomSheet(false)}
          isDragHandleVisible={false}
        >
          {selectedTransaction && selectedInstallment && (
            <FinanceReportScreen transaction={selectedTransaction} installment={selectedInstallment} />
          )}
        </BottomSheet>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  sheetWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default TransactionsScreen;
