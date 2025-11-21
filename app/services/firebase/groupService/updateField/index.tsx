import { db } from "@/app/config/firebaseConfig";
import { HandleErroMessage } from "@/components/ui/HandleErroMessage";
import { doc, updateDoc } from "firebase/firestore";
import { Alert } from "react-native";

export async function UpdateField(inputs: { label: string, name: string, groupId: string }) {
    try {
        await updateDoc(doc(db, "groups", inputs.groupId), {
            [inputs.label]: inputs.name
        });

        Alert.alert("Sucesso!", "Nome do grupo foi atualizado.");
    } catch (error: any) {

        const msg = HandleErroMessage(error.code);
        console.log("(UpdateField.tsx) Erro: ", error.code);
        Alert.alert("Erro", msg);

        throw error;
    }
}