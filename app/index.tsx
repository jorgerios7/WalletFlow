import { useEffect, useState } from "react";
import BottomTabs from "./navigation/BottomTabs";
import UserAccessScreen from "./pages/auth/UserAccessScreen";
import SplashScreen from "./pages/SplashScreen";

export default function AppMain() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      // Simulação de verificação 
      await new Promise(resolve => setTimeout(resolve, 2000));
      const userIsLogged = false;

      setIsAuthenticated(userIsLogged);
      setIsLoading(false);
    };

    checkLogin();
  }, []);

  if (isLoading) {
    return <SplashScreen />
  }

  return isAuthenticated ? (
    <BottomTabs />
  ) : (
    <UserAccessScreen onPress={setIsAuthenticated} />
  );
}
