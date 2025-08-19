import { db } from "@/app/config/firebaseConfig";
import { Home } from "@/app/types/Home";
import { deleteField, doc, getDoc, updateDoc } from "firebase/firestore";

export async function FetchHomeData(homeId: string): Promise<Home | null> {
  if (!homeId || homeId.trim() === "") return null;

  let data: Home | null = null;

  try {
    const homeRef = doc(db, "homes", homeId);
    const homeSnap = await getDoc(homeRef);

    if (homeSnap.exists()) {
      data = homeSnap.data() as Home;
    }
  } catch (error) {
    console.error("(HomeService.tsx) Erro ao buscar Home:", error);
  } finally {
    console.log("(HomeService.tsx) Os dados foram atualizados com sucesso!");
    return data;
  }
}

export async function DeleteMember(homeId: string, userId: string): Promise<void> {
  if (!homeId?.trim() || !userId?.trim()) {
    console.error("(HomeService.tsx) HomeID ou UserID estão nulos ou vazios!");
    return;
  }

  try {
    const homeRef = doc(db, "homes", homeId);
    const userRef = doc(db, 'users', userId);

    await updateDoc(homeRef, {
      [`members.${userId}`]: deleteField(),
    });

    await updateDoc(userRef, {
      [`homeId`]: deleteField(),
    });

    console.log(`(HomeService.tsx) O usuário ${userId} foi removido da home: ${homeId} e campo homeId foi excluído com sucesso!`);
  } catch (error) {

    console.error(`(HomeService.tsx) Error ao deletar usuário ${userId}`, error);
  }
}

export async function PromoteOrDemote(isPromote: boolean, homeId: string, userId: string): Promise<void> {
  if (!homeId?.trim() || !userId?.trim()) {
    console.error("(HomeService.tsx) HomeID ou UserID estão nulos ou vazios!");
    return;
  }

  try {
    const homeRef = doc(db, "homes", homeId);
    await updateDoc(homeRef, {
      [`members.${userId}.role`]: isPromote ? 'owner' : 'member'
    });
    console.log(`(HomeService.tsx) O usuário ${userId} foi ${isPromote ? 'promovido a owner' : 'despromovido para membro'} com sucesso!`);
  } catch (error) {
    console.error(`(HomeService.tsx) Error ao ${isPromote ? 'promover' : 'despromover'} usuário ${userId} pertencente a home ${homeId}`, error);
  }
}
