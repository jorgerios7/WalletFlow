import { db } from "@/app/config/firebaseConfig";
import ValidateEmptyFields from "@/components/ValidateEmptyFields";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";

interface Params {
    groupName: string;
    userId: string;
    userFullName: string;
    onSuccess: () => void;
    onFailure: (message: string) => void;
}

export default async function CreateGroup({ userId, userFullName, groupName, onSuccess, onFailure }: Params) {

    const fieldIsEmpty = ValidateEmptyFields(
        { name: groupName },
        { name: "Nome do grupo" }
    );

    if (fieldIsEmpty) {
        onFailure(fieldIsEmpty);
        return;
    };

    try {
        const groupRef = doc(collection(db, "groups"));

        await setDoc(groupRef, {
            name: groupName,
            creation: {
                "id": userId,
                "name": userFullName,
                "createdAt": new Date().toISOString()
            },
            members: {
                [userId]: {
                    'name': userFullName,
                    'role': 'owner'
                }
            },
        });

        await setDoc(doc(db, "publicGroups", groupRef.id), {});
        await updateDoc(doc(db, "users", userId), { groupId: groupRef.id });

        onSuccess();
    } catch (error) {
        console.error("(CreateGroup.tsx) Erro:", error);
        onFailure("Erro ao configurar o grupo.");
    }
}