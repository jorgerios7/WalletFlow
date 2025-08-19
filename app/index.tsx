import { Colors } from "@/constants/Colors";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Snackbar } from "react-native-paper";
import { db } from "./config/firebaseConfig";
import BottomTabs from "./navigation/BottomTabs";
import UserAccessScreen from "./pages/auth/UserAccessScreen";
import SplashScreen from "./pages/SplashScreen";
import GroupSetupScreen from "./screens/GroupSetupScreen";
import { FetchGroupData } from "./services/firebase/GroupService";
import { FetchUserData } from "./services/firebase/UserService";
import { Group } from "./types/Group";
import { User } from "./types/User";

export default function AppMain() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [uid, setUId] = useState('');
  const [userData, setUserData] = useState<User | null>(null);
  const [groupData, setGroupData] = useState<Group | null>(null);
  const [isShowGroupSetupScreen, setIsShowGroupSetupScreen] = useState(false);
  const [isSnackbackVisible, setIsSnackbarVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isCreateNewGroup, setIsCreateNewGroup] = useState(true);
  const [groupSetupInputValues, setGroupSetupInputValues] = useState({ groupId: "", Name: "" });
  const [isFetchingUser, setIsFetchingUser] = useState(true);

  const handleCreateUserGroup = async (data: { groupId: string; Name: string }) => {
    try {
      if (isCreateNewGroup) {

        const groupRef = doc(collection(db, "groups"));
        await setDoc(groupRef, {
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

        await setDoc(doc(db, "publicGroups", groupRef.id), {});

        await updateDoc(doc(db, "users", uid), { groupId: groupRef.id });

      } else {

        await updateDoc(doc(db, "users", uid), { groupId: data.groupId });

        await setDoc(doc(db, "groups", data.groupId), {
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
      setErrorMessage("Erro ao configurar o grupo.");
      setIsSnackbarVisible(true);
    } finally {

      fetchUserAndGroupData();
    }
  };

  const fetchUserAndGroupData = async () => {
    if (!uid) return;

    let user: User | null = null;
    let home: Group | null = null;

    setIsFetchingUser(true);

    try {

      user = await FetchUserData(uid);

      if (!user || !user.groupId) {
        setIsShowGroupSetupScreen(true);
      } else {
        home = await FetchGroupData(user.groupId);
        setIsShowGroupSetupScreen(false);
      }
    } catch (error) {

      console.error("(Index.tsx) Erro ao buscar dados:", error);
    } finally {

      setUserData(user);
      setGroupData(home);
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
      fetchUserAndGroupData();
    }
  }, [uid]);

  if (isLoading) return <SplashScreen />;

  if (!isAuthenticated)
    return <UserAccessScreen onPress={setIsAuthenticated} getUId={setUId} />;

  if (!isReady || !userData || isFetchingUser) return <SplashScreen />;

  const renderMainContent = () => {
    return (
      <>
        <GroupSetupScreen
          shouldRender={isShowGroupSetupScreen}
          onPressingReturnButton={() => setIsAuthenticated(false)}
          values={groupSetupInputValues}
          isCreateNewGroup={(action) => setIsCreateNewGroup(action)}
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
            const updatedData = { ...groupSetupInputValues, ...values };

            setGroupSetupInputValues(updatedData);
            handleCreateUserGroup(updatedData);
          }}
        />

        {!isShowGroupSetupScreen && groupData && (
          <BottomTabs
            groupData={groupData}
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