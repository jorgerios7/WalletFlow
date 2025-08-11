import { db } from "@/app/config/firebaseConfig";
import { Home } from "@/app/types/Home";
import { doc, getDoc } from "firebase/firestore";

export async function FetchHomeData(homeId: string): Promise<Home | null> {
  if (!homeId || homeId.trim() === "") return null;

  try {
    const homeRef = doc(db, "homes", homeId);
    const homeSnap = await getDoc(homeRef);

    if (homeSnap.exists()) {
      return homeSnap.data() as Home;
    }
  } catch (error) {
    console.error("(HomeService) Erro ao buscar Home:", error);
  }

  return null;
}
