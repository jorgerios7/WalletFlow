import { db } from "@/app/config/firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";
import { Alert } from "react-native";

interface Props {
    groupId: string;
    transactionId: string;
    entryId: string;
    onDeleting: () => void;
}

export async function DeleteEntry({
    groupId,
    transactionId,
    entryId,
    onDeleting
}: Props) {
    if (!groupId) return;

    try {
        const entryRef = doc(
            db,
            "groups", groupId,
            "transactions", transactionId,
            "entries", entryId
        );

        await deleteDoc(entryRef);

        onDeleting();

        console.log("Entrada deletada com sucesso");
    } catch (error: any) {
        console.error("Erro ao deletar:", error);
        Alert.alert("Erro", error?.message ?? "Não foi possível deletar o documento");
    }
}
