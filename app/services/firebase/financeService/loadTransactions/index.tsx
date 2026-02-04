import { db } from "@/app/config/firebaseConfig";
import { BalanceValues, MixedTransactionEntry } from "@/app/types/Finance";
import { collection, getDocs } from "firebase/firestore";
import Balance from "./Balance";

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

        onBalanceCalculation?.(Balance(result));

        return result;

    } catch (error) {
        console.error("(FinanceService.tsx) Erro ao carregar dados:", error);
    } finally {
        onLoading(false);
    }
}