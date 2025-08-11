import { db } from "@/app/config/firebaseConfig";
import { User } from "@/app/types/User";
import { doc, getDoc } from "firebase/firestore";

export async function FetchUserData(uid: string): Promise<User | null> {
  if (!uid || uid.trim() === "") return null;

  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data() as User;
    }
  } catch (error) {
    console.error("(UserService) Erro ao buscar usuário:", error);
  }

  return null;
}
