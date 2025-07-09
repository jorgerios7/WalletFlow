import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./config/firebaseConfig";
import BottomTabs from "./navigation/BottomTabs";
import UserAccessScreen from "./pages/auth/UserAccessScreen";
import SplashScreen from "./pages/SplashScreen";
import { User } from "./types/User";

export default function AppMain() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [uid, setUId] = useState('');

  const loadData = async () => {
    if (!uid) return;

    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      const data = userDoc.data() as User;
      
      setIsReady(true);

      console.log("userData: ", data);
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const userIsLogged = false;
      setIsAuthenticated(userIsLogged);
      setIsLoading(false);
    };

    checkLogin();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [uid]);

  if (isLoading) return <SplashScreen />;

  if (!isAuthenticated)
    return <UserAccessScreen onPress={setIsAuthenticated} getUId={setUId} />;

  return isReady ? <BottomTabs /> : <SplashScreen />;
}
