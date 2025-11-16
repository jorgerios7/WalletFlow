import { db } from "@/app/config/firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";
import { Alert } from "react-native";

export default async function DeleteEntry(
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