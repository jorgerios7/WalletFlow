import { db } from "@/app/config/firebaseConfig";
import { Entries, Transactions, TransactionType, UpdateEntryValues } from "@/app/types/Finance";
import { FormatDateBR, SepareteDate } from "@/app/utils/Format";
import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { Alert } from "react-native";

export async function LoadTransactions(groupId: string, onLoading: (loading: boolean) => void): Promise<Entries[] | undefined> {
    try {
        onLoading(true);

        const transactionsRef = collection(db, `groups/${groupId}/transactions`);
        const transactionsSnapshot = await getDocs(transactionsRef);

        const entries: Entries[] = [];

        for (const transactionDoc of transactionsSnapshot.docs) {
            const transData = transactionDoc.data();

            const entriesRef = collection(db, `groups/${groupId}/transactions/${transactionDoc.id}/entries`);

            const entriesSnapshot = await getDocs(entriesRef);

            const entriesDocs = entriesSnapshot.docs.map((doc) => {
                const entData = doc.data() as Partial<Entries>;
                return {
                    transactionId: transactionDoc.id, category: transData.category, totalValue: transData.totalValue,
                    startDate: transData.startDate, totalEntries: transData.totalEntries,

                    entrieId: doc.id, type: entData.paymentType, dueDate: entData.dueDate, paymentBank: entData.paymentBank, payment: entData.payment,
                    paymentDate: entData.paymentDate, paymentMethod: entData.paymentMethod, paymentBankCard: entData.paymentBankCard,
                    entrieNumber: entData.entrieNumber, value: entData.value,

                    ...entData
                } as Entries;
            });

            entries.push(...entriesDocs);
        }
        console.log("(FinanceService.tsx) As transações fora carregadas com sucesso!.");

        return entries as Entries[];

    } catch (error) {

        console.error("(FinanceService.tsx) Erro ao carregar dados: ", error);
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

