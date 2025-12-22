import { db } from "@/app/config/firebaseConfig";
import { UpdateEntryProps, UpdateIdsProps } from "@/app/types/Finance";
import { doc, updateDoc } from "firebase/firestore";
import { Alert } from "react-native";

interface Props {
    ids: UpdateIdsProps,
    groupId: string,
    newEntry: UpdateEntryProps, 
    onRefresh: () => void;
}

export default async function UpdateEntry({ ids: { transaction, entry }, groupId, newEntry, onRefresh, }: Props) {
    try {
        const entriesDataCleaned = Object.fromEntries(
            Object.entries(newEntry).filter(([_, value]) => value !== "")
        );

        const entryRef = doc(db, "groups", groupId, "transactions", transaction, "entries", entry);

        await updateDoc(entryRef, entriesDataCleaned);

    } catch (error: any) {
        console.error("(UpdateEntry.tsx) Erro ao atualizar:", error);
        Alert.alert("Erro", error.message || "Não foi possível atualizar o documento");
    } finally {

        onRefresh();
    }
}