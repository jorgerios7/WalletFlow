import { db } from "@/app/config/firebaseConfig";
import { BalanceValues, MixedTransactionEntry } from "@/app/types/Finance";
import { collection, getDocs } from "firebase/firestore";

export default async function LoadTransactions(
    date: string, groupId: string, onLoading: (loading: boolean) => void, onBalanceCalculation?: (balance: BalanceValues) => void
): Promise<MixedTransactionEntry[] | undefined> {

    try {
        onLoading(true);

        if (!date) return [];

        const [selectedDay, selectedMonth, selectedYear] = date.split("/");

        const transactionsRef = collection(db, `groups/${groupId}/transactions`);
        const transactionsSnapshot = await getDocs(transactionsRef);

        const result: MixedTransactionEntry[] = [];

        function Balance() {
            // Ordem dos índices:
            // typeIndex:      0 = income,  1 = expense
            // paymentIndex:   0 = concluded, 1 = pending

            // Matriz 2x2 para valores totalizados:
            // totals[typeIndex][paymentIndex]
            const totals = [
                [0, 0], // income: [concluded, pending]
                [0, 0]  // expense: [concluded, pending]
            ];

            let totalIncome = 0;
            let totalExpense = 0;

            for (const { type, paymentType, value = 0 } of result) {

                const typeIndex = type === "income" ? 0 : 1;
                const payIndex = paymentType === "concluded" ? 0 : 1;

                if (typeIndex === 0) totalIncome += value;
                else totalExpense += value;

                totals[typeIndex][payIndex] += value;
            }

            const [[concludedIncome, pendingIncome], [concludedExpense, pendingExpense]] = totals;

            const balance: BalanceValues = {
                totalIncomeBalance: totalIncome, totalExpenseBalance: totalExpense,
                totalConcludedIncomeBalance: concludedIncome, totalPendingIncomeBalance: pendingIncome,
                totalConcludedExpenseBalance: concludedExpense, totalPendingExpenseBalance: pendingExpense,
                totalConcludedSum: concludedIncome + concludedExpense
            };

            return balance;
        }

        for (const transactionDoc of transactionsSnapshot.docs) {
            const transData = transactionDoc.data();

            const entriesRef = collection(db, `groups/${groupId}/transactions/${transactionDoc.id}/entries`);

            const entriesSnapshot = await getDocs(entriesRef);

            for (const entryDoc of entriesSnapshot.docs) {
                const entData = entryDoc.data();

                const [day, month, year] = entData.dueDate?.split("/") ?? ["", "", ""];

                if (month === selectedMonth && year === selectedYear) {

                    result.push({
                        transactionId: transactionDoc.id, ...transData, ...entData
                    } as MixedTransactionEntry);
                }
            }
        }

        onBalanceCalculation?.(Balance());

        return result;

    } catch (error) {
        console.error("(FinanceService.tsx) Erro ao carregar dados:", error);
    } finally {
        onLoading(false);
    }
}