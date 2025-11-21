import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { Snackbar } from "react-native-paper";
import TabNavigation from "./navigation/tabNavigation";
import { LoadScreen } from "./pages/LoadScreen";
import SplashScreen from "./pages/SplashScreen";
import GroupSetupScreen from "./screens/GroupSetupScreen";
import UserAccessScreen from "./screens/userAccessScreen";
import CreateGroup from "./services/firebase/groupService/createGroup";
import LoadGroup from "./services/firebase/groupService/loadGroup";
import { FetchUserData } from "./services/firebase/UserService";
import { Group } from "./types/Group";
import { User } from "./types/User";

export default function AppMain() {
  const [auth, setAuth] = useState({ isLoading: true, isAuthenticated: false, user_id: "" });

  const [data, setData] = useState({ isLoading: false, user: null as User | null, group: null as Group | null });

  const [isGrouped, setIsGrouped] = useState(false);

  const [showError, setShowError] = useState({ snackbarVisible: false, message: "" });

  const loadUserAndGroup = async (update: { isUpdateScreen: boolean, isUpdateData: boolean }) => {
    if (!auth.user_id || !update.isUpdateData) return;

    let user: User | null = null;
    let group: Group | null = null;

    if (update.isUpdateScreen) setData((prev) => ({ ...prev, isLoading: true }));

    try {
      user = await FetchUserData(auth.user_id);

      if (!user || !user.groupId) {
        if (update.isUpdateScreen) setIsGrouped(false);
      } else {
        group = await LoadGroup(user.groupId);
        if (update.isUpdateScreen) setIsGrouped(true);
      }
    } catch (error) {
      console.error("(Index.tsx) Erro ao buscar dados:", error);
    } finally {
      setData((prev) => ({ ...prev, isLoading: false, user: user, group: group }));
    }
  };

  useEffect(() => {
    setAuth((prev) => ({ ...prev, isLoading: true }));

    const checkLogin = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const userIsLogged = false;
      setAuth((prev) => ({ ...prev, isAuthenticated: userIsLogged, isLoading: false }));
    };

    checkLogin();
  }, []);

  useEffect(() => {
    if (auth.user_id && auth.isAuthenticated && !data.isLoading && !auth.isLoading) loadUserAndGroup({ isUpdateScreen: true, isUpdateData: true });
  }, [auth.isAuthenticated]);

  if (auth.isLoading) return <SplashScreen />;

  if (!auth.isLoading && data.isLoading) return <LoadScreen />;

  if (showError.snackbarVisible) {
    return (
      <Snackbar
        visible
        onDismiss={() => setShowError({ snackbarVisible: false, message: "" })}
        style={{ backgroundColor: Colors.light.tint }}
        action={{ label: "Fechar", onPress: () => setShowError({ snackbarVisible: false, message: "" }) }}
      >
        {showError.message}
      </Snackbar>
    )
  }

  return (
    <>
      <UserAccessScreen
        isVisible={!auth.isAuthenticated}
        onPress={(value) => setAuth((prev) => ({ ...prev, isAuthenticated: value }))}
        onUserId={(id) => setAuth((prev) => ({ ...prev, user_id: id }))}
      />

      <GroupSetupScreen
        isVisible={auth.isAuthenticated && !data.isLoading && !isGrouped}
        onPressingReturnButton={() => setAuth((prev) => ({ ...prev, isAuthenticated: false }))}
        onReady={({ action, values }) => {
          {
            data.user && (
              CreateGroup(
                action, values,
                { id: auth.user_id, name: data.user?.identification.name, surname: data.user?.identification.surname },
                () => loadUserAndGroup({ isUpdateScreen: true, isUpdateData: true }), (visible, message) => setShowError({ snackbarVisible: visible, message: message })
              )
            )
          }
        }}
      />

      <TabNavigation
        isVisible={auth.isAuthenticated && !data.isLoading && isGrouped}
        onUpdating={(isUpdating) => loadUserAndGroup({ isUpdateScreen: false, isUpdateData: isUpdating })}
        userData={data.user as User}
        groupData={data.group as Group}
        onDismis={() => setAuth((prev) => ({ ...prev, isAuthenticated: false }))}
      />
    </>
  );
}