import { db } from "@/app/config/firebaseConfig";
import { Action } from "@/app/types/Group";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";

export default async function CreateGroup(
    action: Action, group: { id: string; name: string }, user: { id: string, name: string, surname: string },
    onReady: () => void, onErrorMessage: (snackbarVisible: boolean, message: string) => void
) {
    let isReady = false;

    try {
        if (action === "newGroup") {
            const groupRef = doc(collection(db, "groups"));
            
            await setDoc(groupRef, {
                name: group.name,
                creation: {
                    "id": user.id,
                    "name": `${user.name} ${user.surname}`,
                    "createdAt": new Date().toISOString()
                },
                members: {
                    [user.id]: {
                        'name': `${user.name} ${user.surname}`,
                        'role': 'owner'
                    }
                },
            });

            await setDoc(doc(db, "publicGroups", groupRef.id), {});
            await updateDoc(doc(db, "users", user.id), { groupId: groupRef.id });

            isReady = true;
        } else if (action === "addMember") {
            
            await updateDoc(doc(db, "users", user.id), { groupId: group.id });
            await setDoc(doc(db, "groups", group.id), {
                members: {
                    [user.id]: {
                        'name': `${user.name} ${user.surname}`,
                        'role': 'member'
                    }
                }
            }, { merge: true });

            isReady = true;
        }
    } catch (error) {
        console.error("(CreateGroup.tsx) Erro:", error);
        onErrorMessage(true, "Erro ao configurar o grupo.");
    } finally {
        if (isReady) onReady();
    }
}