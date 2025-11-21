import { db } from "@/app/config/firebaseConfig";
import { Group } from "@/app/types/Group";
import { doc, getDoc } from "firebase/firestore";

export default async function LoadGroup(groupId: string): Promise<Group | null> {
  if (!groupId || groupId.trim() === "") return null;

  let data: Group | null = null;

  try {
    const homeRef = doc(db, "groups", groupId);
    const groupSnap = await getDoc(homeRef);

    if (groupSnap.exists()) {
      data = groupSnap.data() as Group;
    }
  } catch (error) {

    console.error(`(GroupService.tsx) Erro ao buscar Grupo ${groupId}`, error);
  } finally {

    console.log("(GroupService.tsx) Os dados grupo foram atualizados com sucesso!");
    
    return data;
  }
}