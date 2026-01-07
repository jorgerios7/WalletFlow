import { db } from "@/app/config/firebaseConfig";
import { HandleErroMessage } from "@/components/ui/HandleErroMessage";
import ValidateEmptyFields from "@/components/ValidateEmptyFields";
import {
    doc,
    getDoc,
    writeBatch
} from "firebase/firestore";

interface JoinGroupParams {
    userId: string;
    groupId: string;
    userFullName: string;
    onSuccess: () => void;
    onFailure: (message: string) => void;
}

export default async function joinGroup({
    userId,
    groupId,
    userFullName,
    onSuccess,
    onFailure
}: JoinGroupParams): Promise<void> {

    const fieldIsEmpty = ValidateEmptyFields(
        { name: groupId },
        { name: "ID do grupo" }
    );

    if (fieldIsEmpty) {
        onFailure(fieldIsEmpty);
        return;
    }

    try {
        const publicGroupRef = doc(db, "publicGroups", groupId);
        const publicGroupSnap = await getDoc(publicGroupRef);

        if (!publicGroupSnap.exists()) {
            onFailure("ID não encontrado.");
            return;
        }

        const batch = writeBatch(db);

        const userRef = doc(db, "users", userId);
        const groupRef = doc(db, "groups", groupId);

        batch.update(userRef, { groupId });

        batch.set(
            groupRef,
            {
                members: {
                    [userId]: {
                        name: userFullName,
                        role: "member"
                    }
                }
            },
            { merge: true }
        );

        await batch.commit();

        onSuccess();
    } catch (error: any) {
        console.error("(joinGroup) error:", error);

        const errorMessage = HandleErroMessage(error.code);
        onFailure(errorMessage);
    }
}
