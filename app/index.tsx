import { Colors } from "@/constants/Colors";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Snackbar } from "react-native-paper";
import { db } from "./config/firebaseConfig";
import BottomTabs from "./navigation/BottomTabs";
import UserAccessScreen from "./pages/auth/UserAccessScreen";
import SplashScreen from "./pages/SplashScreen";
import HomeSetupScreen from "./screens/HomeSetupScreen";
import { FetchHomeData } from "./services/firebase/HomeService";
import { FetchUserData } from "./services/firebase/UserService";
import { Home } from "./types/Home";
import { User } from "./types/User";

export default function AppMain() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [uid, setUId] = useState('');
  const [userData, setUserData] = useState<User | null>(null);
  const [homeData, setHomeData] = useState<Home | null>(null);
  const [isShowHomeSetupScreen, setIsShowHomeSetupScreen] = useState(false);
  const [isSnackbackVisible, setIsSnackbarVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isCreateNewHome, setIsCreateNewHome] = useState(true);
  const [homeSetupInputValues, setHomeSetupInputValues] = useState({ Id_Home: "", Name: "" });
  const [isFetchingUser, setIsFetchingUser] = useState(true);

  const handleCreateUserHome = async (data: { Id_Home: string; Name: string }) => {
    try {
      if (isCreateNewHome) {

        const homeRef = doc(collection(db, "homes"));
        await setDoc(homeRef, {
          name: data.Name,
          createdBy: uid,
          createdAt: new Date().toISOString(),
          members: {
            [uid]: {
              'name': `${userData?.identification.name} ${userData?.identification.surname}`,
              'role': 'owner'
            }
          },
        });

        await setDoc(doc(db, "publicHomes", homeRef.id), {});

        await updateDoc(doc(db, "users", uid), { homeId: homeRef.id });

      } else {

        await updateDoc(doc(db, "users", uid), { homeId: data.Id_Home });

        await setDoc(doc(db, "homes", data.Id_Home), {
          members: {
            [uid]: {
              'name': `${userData?.identification.name} ${userData?.identification.surname}`,
              'role': 'member'
            }
          }
        }, { merge: true });
      }
    } catch (error) {

      console.error("(Index.tsx) Erro:", error);
      setErrorMessage("Erro ao configurar a Home.");
      setIsSnackbarVisible(true);
    } finally {

      fetchUserAndHomeData();
    }
  };

  const fetchUserAndHomeData = async () => {
    if (!uid) return;

    let user: User | null = null;
    let home: Home | null = null;

    setIsFetchingUser(true);

    try {

      user = await FetchUserData(uid);

      if (!user || !user.homeId) {
        setIsShowHomeSetupScreen(true);
      } else {
        home = await FetchHomeData(user.homeId);
        setIsShowHomeSetupScreen(false);
      }
    } catch (error) {

      console.error("(Index.tsx) Erro ao buscar dados:", error);
    } finally {

      setUserData(user);
      setHomeData(home);
      setIsReady(true);
      setIsFetchingUser(false);
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
    if (uid) {
      fetchUserAndHomeData();
    }
  }, [uid]);

  if (isLoading) return <SplashScreen />;

  if (!isAuthenticated)
    return <UserAccessScreen onPress={setIsAuthenticated} getUId={setUId} />;

  if (!isReady || !userData || isFetchingUser) return <SplashScreen />;

  const renderMainContent = () => {
    return (
      <>
        <HomeSetupScreen
          shouldRender={isShowHomeSetupScreen}
          onPressingReturnButton={() => setIsAuthenticated(false)}
          values={homeSetupInputValues}
          isCreateNewHome={(action) => setIsCreateNewHome(action)}
          errorMessage={(message) => {
            setErrorMessage(message);
            setIsSnackbarVisible(true);
          }}
          whenIsReady={(values) => {
            if (!uid) {
              setErrorMessage("(Index.tsx) Usuário não autenticado.");
              setIsSnackbarVisible(true);
              return;
            }
            const updatedData = { ...homeSetupInputValues, ...values };

            setHomeSetupInputValues(updatedData);
            handleCreateUserHome(updatedData);
          }}
        />

        {!isShowHomeSetupScreen && homeData && (
          <BottomTabs
            homeData={homeData}
            userData={userData}
          />
        )}
      </>
    );
  }

  return (
    <>
      {renderMainContent()}

      <Snackbar
        visible={isSnackbackVisible}
        onDismiss={() => setIsSnackbarVisible(false)}
        style={{ backgroundColor: Colors.light.tint }}
        action={{
          label: "Fechar",
          onPress: () => setIsSnackbarVisible(false),
        }}
      >
        {errorMessage}
      </Snackbar>
    </>
  );
}