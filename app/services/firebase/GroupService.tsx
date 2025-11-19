import { db } from "@/app/config/firebaseConfig";
import { Group } from "@/app/types/Group";
import { collection, deleteField, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export async function FetchGroupData(groupId: string): Promise<Group | null> {
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

export async function DeleteMember(groupId: string, userId: string): Promise<void> {
  if (!groupId?.trim() || !userId?.trim()) {
    console.error("(GroupService.tsx) groupID ou userID estão nulos ou vazios!");
    return;
  }

  try {
    const groupRef = doc(db, "groups", groupId);
    const userRef = doc(db, 'users', userId);

    await updateDoc(groupRef, {
      [`members.${userId}`]: deleteField(),
    });

    await updateDoc(userRef, {
      [`groupId`]: deleteField(),
    });

    console.log(`(GroupService.tsx) O usuário ${userId} foi removido da home: ${groupId} e campo groupId foi excluído com sucesso!`);
  } catch (error) {

    console.error(`(GroupService.tsx) Error ao deletar usuário ${userId}`, error);
  }
}

export async function PromoteOrDemote(isPromote: boolean, groupId: string, userId: string): Promise<void> {
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

export async function CreateGroup(
  createNewGroup: boolean, group: { id: string; name: string }, user: { id: string, name: string, surname: string },  
  onReady: () => void, onErrorMessage: (snackbarVisible: boolean, message: string) => void
  
) {
  let isReady = false;

  console.log('(GroupService.tsx) group: ', group, ' user: ', user)

  try {
    if (createNewGroup) {
      const groupRef = doc(collection(db, "groups"));
      await setDoc(groupRef, {
        name: group.name,
        createdBy: user.id,
        createdAt: new Date().toISOString(),
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
    } else {
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
    console.error("(UserService.tsx) Erro:", error);
    onErrorMessage(true, "Erro ao configurar o grupo.");
  } finally {
    if (isReady) onReady();
  }
}


