import { db } from "@/app/config/firebaseConfig";
import { UpdateEntryProps, UpdateIdsProps } from "@/app/types/Finance";
import { deleteField, doc, FieldValue, updateDoc } from "firebase/firestore";
import { Alert } from "react-native";

interface Props {
    ids: UpdateIdsProps;
    groupId: string;
    data: { entry: UpdateEntryProps; newEntry: UpdateEntryProps };
    onRefresh: () => void;
}

type UpdateEntryFirestore = Partial<
    Record<keyof UpdateEntryProps, unknown | FieldValue>
>;

export default async function UpdateEntry({
    ids: { transaction, entry },
    groupId,
    data,
    onRefresh
}: Props) {
    try {
        const { newEntry, entry: currentEntry } = data;
        const { paymentType, paymentDate, paymentMethod, paymentBank, value } = newEntry;

        let entriesDataToUpdate: UpdateEntryFirestore;

        if (paymentType === "pending") {
            entriesDataToUpdate = {
                paymentType,
                paymentDate: deleteField(),
                paymentMethod: deleteField(),
                paymentBank: deleteField(),
                paymentBankCard: deleteField()
            };
        } else if (["Dinheiro", "Boleto"].includes(paymentMethod)) {
            entriesDataToUpdate = {
                paymentType,
                paymentDate,
                paymentMethod,
                value,
                paymentBank: deleteField(),
                paymentBankCard: deleteField()
            };
        } else if (["Pix", "Transfência bancária"].includes(paymentMethod)) {
            entriesDataToUpdate = {
                paymentType,
                paymentDate,
                paymentMethod,
                paymentBank,
                value,
                paymentBankCard: deleteField()
            };
        } else {
            entriesDataToUpdate = Object.fromEntries(
                Object.entries(newEntry).filter(([key, newValue]) => {
                    if (newValue === "") return false;
                    return newValue !== currentEntry[key as keyof UpdateEntryProps];
                })
            );
        }

        if (!Object.keys(entriesDataToUpdate).length) return;

        const entryRef = doc(
            db,
            "groups",
            groupId,
            "transactions",
            transaction,
            "entries",
            entry
        );

        await updateDoc(entryRef, entriesDataToUpdate);

    } catch (error: any) {
        console.error("(UpdateEntry.tsx) Erro ao atualizar:", error);
        Alert.alert("Erro", error.message || "Não foi possível atualizar o documento");
    } finally {
        onRefresh();
    }
}
