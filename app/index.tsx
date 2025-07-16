import { Colors } from "@/constants/Colors";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Snackbar } from "react-native-paper";
import { db } from "./config/firebaseConfig";
import BottomTabs from "./navigation/BottomTabs";
import UserAccessScreen from "./pages/auth/UserAccessScreen";
import SplashScreen from "./pages/SplashScreen";
import AddHomeIdScreen from "./screens/AddHomeIdScreen";
import { User } from "./types/User";

export default function AppMain() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [uid, setUId] = useState('');
  const [userData, setUserData] = useState<User | null>(null);
  const [isFirstAcces, setIsFirstAcces] = useState(true);
  const [isSnackbackVisible, setIsSnackbarVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isCreateNewHome, setIsCreateNewHome] = useState(true);
  const [idHomeInputValue, setIdHomeInputValue] = useState({ Id_Home: "", Name: "" });

  const handleCreateUserHome = async (data: { Id_Home: string; Name: string }) => {
    try {
      if (isCreateNewHome) {

        const homeRef = doc(collection(db, "homes"));
        await setDoc(homeRef, {
          name: data.Name,
          createdBy: uid,
          createdAt: new Date().toISOString(),
          members: {
            [uid]: 'owner',
          },
        });

        await setDoc(doc(db, "publicHomes", homeRef.id), {});

        await updateDoc(doc(db, "users", uid), { homeId: homeRef.id });

      } else {
        await updateDoc(doc(db, "users", uid), { homeId: data.Id_Home });

        await setDoc(doc(db, "homes", data.Id_Home), {
          members: {
            [uid]: 'member'
          }
        }, { merge: true });
      }

      setIsFirstAcces(false);

    } catch (error) {
      console.error("Erro ao criar ou vincular ID_Home:", error);
      setErrorMessage("Erro ao configurar a Home.");
      setIsSnackbarVisible(true);
    }
  };

  const loadData = async () => {
    if (!uid) return;

    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      const data = userDoc.data() as User;

      setIsReady(true);
      setUserData(data);
    }
  };

  const checkHIdExistence = async () => {
    if (!uid) return;

    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      const data = userDoc.data() as User;

      if (!data.homeId || data.homeId.trim() === "") {
        setIsFirstAcces(true);

      } else {

        setIsFirstAcces(false);
      }
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
      checkHIdExistence();
      loadData();
    }
  }, [uid]);

  if (isLoading) return <SplashScreen />;

  if (!isAuthenticated)
    return <UserAccessScreen onPress={setIsAuthenticated} getUId={setUId} />;

  return (
    <>
      {isReady && userData ? (
        isFirstAcces ? (
          <AddHomeIdScreen
            shouldRender={isFirstAcces}
            onPressingReturnButton={() => setIsAuthenticated(false)}
            values={idHomeInputValue}
            isCreateNewHome={(action) => setIsCreateNewHome(action)}
            errorMessage={(message) => {
              setErrorMessage(message);
              setIsSnackbarVisible(true);
            }}
            whenIsReady={(values) => {
              if (!uid) {
                setErrorMessage("Usuário não autenticado.");
                setIsSnackbarVisible(true);
                return;
              }
              const updatedData = { ...idHomeInputValue, ...values };

              setIdHomeInputValue(updatedData);
              handleCreateUserHome(updatedData);
            }}
          />
        ) : (
          <BottomTabs data={userData} />
        )
      ) : (
        <SplashScreen />
      )}

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
