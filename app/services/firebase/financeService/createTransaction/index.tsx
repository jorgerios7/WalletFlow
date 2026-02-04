import { db } from "@/app/config/firebaseConfig";
import { Entries, Transactions, TransactionType } from "@/app/types/Finance";
import { FormatDateBR, SepareteDate } from "@/app/utils/Format";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { Alert } from "react-native";

export default async function CreateTransaction(
    userId: string, groupId: string, type: TransactionType, transactions: Transactions,
    entries: Entries, onUploading: (isUploading: boolean) => void
) {
    try {
        onUploading(true);

        const transactionDataCleaned = Object.fromEntries(Object.entries(transactions).filter(([_, value]) => value !== ""));
        const entriesDataCleaned = Object.fromEntries(Object.entries(entries).filter(([_, value]) => value !== ""));

        const transactionRef = collection(db, "groups", groupId, "transactions");

        const transactionDocRef = await addDoc(transactionRef, {
            ...transactionDataCleaned,
            createdBy: userId,
            createdAt: new Date().toISOString(),
            totalValue: type === "expense"
                ? - transactions.totalValue
                : transactions.totalValue
        });

        await updateDoc(
            transactionDocRef, {
            transactionId: transactionDocRef.id
        });

        const entriesRef = collection(db, "groups", groupId, "transactions", transactionDocRef.id, "entries");

        const startDate = SepareteDate(transactions.recurrenceFrequency === "daily" ? transactions.startDate : entries.dueDate);

        const entriesPromises = Array.from({ length: transactions.totalEntries || 1 }).map(async (_, i) => {
            const dueDate = new Date(startDate);
            const value = transactions.totalEntries === 0
                ? transactions.totalValue
                : transactions.totalValue / (transactions.totalEntries || 1);

            switch (transactions.recurrenceFrequency) {

                case "daily":
                    dueDate.setDate(startDate.getDate() + i);
                    break;

                case "weekly":
                    dueDate.setDate(startDate.getDate() + i * 7);
                    break;

                case "monthly":
                    dueDate.setMonth(startDate.getMonth() + i);
                    break;

                default:
                    break;
            }

            const entryDocRef = await addDoc(entriesRef, {
                ...entriesDataCleaned,
                type,
                createdAt: new Date().toISOString(),
                entrieNumber: (i + 1),
                dueDate: FormatDateBR(dueDate),
                value: type === "expense"
                    ? - value
                    : value
            });

            await updateDoc(entryDocRef, { entrieId: entryDocRef.id });
        });

        await Promise.all(entriesPromises);
    } catch (error: any) {
        console.error("(FinanceService.tsx) Erro ao salvar:", error);
        Alert.alert("Erro", error.message || "Não foi possível salvar");
    } finally {
        onUploading(false);
    }
}