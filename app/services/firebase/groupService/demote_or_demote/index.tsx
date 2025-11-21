import { db } from "@/app/config/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

export default async function PromoteOrDemote(isPromote: boolean, groupId: string, userId: string): Promise<void> {
  if (!groupId?.trim() || !userId?.trim()) {
    console.error("(GroupService.tsx) groupID ou userID estão nulos ou vazios!");
    return;
  }

  try {
    const homeRef = doc(db, "groups", groupId);
    await updateDoc(homeRef, {
      [`members.${userId}.role`]: isPromote ? 'owner' : 'member'
    });

    console.log(`(GroupService.tsx) O usuário ${userId} foi ${isPromote ? 'promovido a owner' : 'despromovido para membro'} com sucesso!`);
  } catch (error) {

    console.error(`(GroupService.tsx) Error ao ${isPromote ? 'promover' : 'despromover'} usuário ${userId} pertencente ao grupo ${groupId}`, error);
  }
}