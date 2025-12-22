import { db } from "@/app/config/firebaseConfig";
import { User } from "@/app/types/User";
import { doc, getDoc } from "firebase/firestore";

export default async function LoadUserData(uid: string): Promise<User | null> {
  if (!uid || uid.trim() === "") return null;

  let data: User | null = null;

  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      data = userSnap.data() as User;
    }

  } catch (error) {
    console.error("(UserService) Erro ao buscar usuário:", error);
    throw error;
  } finally {
    return data;
  }
}