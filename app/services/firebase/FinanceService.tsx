import { db } from "@/app/config/firebaseConfig";
import { BalanceValues, Entries, Transactions, TransactionType, UpdateEntryValues } from "@/app/types/Finance";
import { FormatDateBR, SepareteDate } from "@/app/utils/Format";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { Alert } from "react-native";

export async function LoadTransactions(
    date: string, groupId: string, onLoading: (loading: boolean) => void, onBalanceCalculation?: (balance: BalanceValues) => void
): Promise<Entries[] | undefined> {

    try {
        onLoading(true);

        if (!date) return [];

        const [selectedDay, selectedMonth, selectedYear] = date.split("/");

        const transactionsRef = collection(db, `groups/${groupId}/transactions`);
        const transactionsSnapshot = await getDocs(transactionsRef);

        const result: Entries[] = [];

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
                const entData = entryDoc.data() as Partial<Entries>;

                const [day, month, year] = entData.dueDate?.split("/") ?? ["", "", ""];

                if (month === selectedMonth && year === selectedYear) {

                    result.push({
                        transactionId: transactionDoc.id, category: transData.category, totalValue: transData.totalValue,
                        startDate: transData.startDate, totalEntries: transData.totalEntries, description: transData.description,

                        entrieId: entryDoc.id, type: entData.type ?? entData.paymentType, paymentType: entData.paymentType,
                        dueDate: entData.dueDate, paymentBank: entData.paymentBank, payment: entData.paymentType,
                        paymentDate: entData.paymentDate, paymentMethod: entData.paymentMethod, paymentBankCard: entData.paymentBankCard,
                        entrieNumber: entData.entrieNumber, value: entData.value ?? 0,
                        ...entData,
                    } as Entries);
                }
            }
        }

        onBalanceCalculation?.(Balance());

        console.log("(FinanceService.tsx) Transações carregadas com sucesso!");

        return result;

    } catch (error) {
        console.error("(FinanceService.tsx) Erro ao carregar dados:", error);
    } finally {
        onLoading(false);
    }
}


export async function UploadTransaction(
    userId: string, groupId: string, type: TransactionType, transactions: Transactions,
    entries: Entries, onLoading: (isLoading: boolean) => void
) {
    try {
        onLoading(true);

        const transactionDataCleaned = Object.fromEntries(Object.entries(transactions).filter(([_, value]) => value !== ""));
        const entriesDataCleaned = Object.fromEntries(Object.entries(entries).filter(([_, value]) => value !== ""));

        const transactionRef = collection(db, "groups", groupId, "transactions");

        const transactionDocRef = await addDoc(transactionRef, {
            ...transactionDataCleaned, createdBy: userId, createdAt: new Date().toISOString(), totalValue: transactions.totalValue,
        });

        await updateDoc(transactionDocRef, { transactionId: transactionDocRef.id });

        const entriesRef = collection(db, "groups", groupId, "transactions", transactionDocRef.id, "entries");

        const startDate = SepareteDate(entries.dueDate);

        const entriesPromises = Array.from({ length: transactions.totalEntries || 1 }).map(async (_, i) => {
            const dueDate = new Date(startDate);
            const value = transactions.totalEntries === 0
                ? transactions.totalValue
                : transactions.totalValue / (transactions.totalEntries || 1);

            const monthOffset = transactions.recurrenceType === "installment" ? i + 1 : i;
            dueDate.setMonth(dueDate.getMonth() + monthOffset);

            const entryDocRef = await addDoc(entriesRef, {
                ...entriesDataCleaned,
                type,
                entrieNumber: (i + 1),
                value,
                dueDate: FormatDateBR(dueDate),
                createdAt: new Date().toISOString(),
            });

            await updateDoc(entryDocRef, { entrieId: entryDocRef.id });
        });

        await Promise.all(entriesPromises);
    } catch (error: any) {
        console.error("(FinanceService.tsx) Erro ao salvar:", error);
        Alert.alert("Erro", error.message || "Não foi possível salvar");
    } finally {
        onLoading(false);
    }
}

export async function UpdateEntry(
    { ids: { group, transaction, entry }, newEntry, onUpdate }:
        { ids: { group: string, transaction: string, entry: string }, newEntry: UpdateEntryValues, onUpdate: (isUpdate: boolean) => void }
) {
    try {
        onUpdate(true);

        const entriesDataCleaned = Object.fromEntries(
            Object.entries(newEntry).filter(([_, value]) => value !== "")
        );

        const entryRef = doc(db, "groups", group, "transactions", transaction, "entries", entry);

        await updateDoc(entryRef, entriesDataCleaned);

    } catch (error: any) {
        console.error("(FinanceService.tsx) Erro ao atualizar:", error);
        Alert.alert("Erro", error.message || "Não foi possível atualizar o documento");
    } finally {
        onUpdate(false);
    }
}

export async function DeleteEntry(
    { ids: { group, transaction, entry }, onDelete }:
        { ids: { group: string, transaction: string, entry: string }, onDelete: (isDeleting: boolean) => void }
) {
    try {
        onDelete(true);
        const entryRef = doc(db, "groups", group, "transactions", transaction, "entries", entry);

        await deleteDoc(entryRef);

        console.log("(FinanceService.tsx) Entrada deletada com sucesso!");

    } catch (error: any) {
        console.error("(FinanceService.tsx) Erro ao deletar:", error);
        Alert.alert("Erro", error.message || "Não foi possível deletar o documento");
    } finally {
        onDelete(false);
    }
}


