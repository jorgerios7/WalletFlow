import { db } from "@/app/config/firebaseConfig";
import { deleteField, doc, updateDoc } from "firebase/firestore";

export default async function DeleteMember(groupId: string, userId: string, onDeleting?: (isDeleting: boolean) => void): Promise<void> {
  if (!groupId?.trim() || !userId?.trim()) {
    console.error("(GroupService.tsx) groupID ou userID estão nulos ou vazios!");
    return;
  }

  try {
    onDeleting?.(false);
    const userRef = doc(db, 'users', userId);
    const groupRef = doc(db, "groups", groupId);

    await updateDoc(userRef, {
      [`groupId`]: deleteField(),
    });

    await updateDoc(groupRef, {
      [`members.${userId}`]: deleteField(),
    });

    onDeleting?.(true);

    console.log(`(DeleteMember.tsx) O usuário ${userId} foi removido da home: ${groupId} e campo groupId foi excluído com sucesso!`);
  } catch (error) {

    console.error(`(DeleteMember.tsx) Error ao deletar usuário ${userId}`, error);
  }
}