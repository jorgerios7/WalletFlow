import { db } from "@/app/config/firebaseConfig";
import { UpdateEntryValues } from "@/app/types/Finance";
import { doc, updateDoc } from "firebase/firestore";
import { Alert } from "react-native";

export default async function UpdateEntry(
    { ids: { group, transaction, entry }, newEntry, onUpdate }:
        {
            ids: { group: string, transaction: string, entry: string },
            newEntry: UpdateEntryValues, onUpdate: (isUpdate: boolean) => void
        }
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