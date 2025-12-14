import { useEffect, useState } from "react";
import { PreferencesProvider } from "./context/PreferencesProvider";
import TabNavigation from "./navigation/tabNavigation";
import { LoadScreen } from "./pages/LoadScreen";
import SplashScreen from "./pages/SplashScreen";
import GroupAccessSetup from "./screens/groupAccessSetup";
import UserAccessScreen from "./screens/userAccessScreen";
import CreateGroup from "./services/firebase/groupService/createGroup";
import LoadGroup from "./services/firebase/groupService/loadGroup";
import { FetchUserData } from "./services/firebase/UserService";
import { Group } from "./types/Group";
import { User } from "./types/User";

export default function AppMain() {
  const [auth, setAuth] = useState({
    isLoading: true,
    isAuthenticated: false,
    user_id: ""
  });

  const [data, setData] = useState({
    isLoading: false,
    user: null as User | null,
    group: null as Group | null
  });

  const [isGrouped, setIsGrouped] = useState<boolean | null>(null);
  const [showError, setShowError] = useState({ snackbarVisible: false, message: "" });

  // 1. Check login
  useEffect(() => {
    const checkLogin = async () => {
      await new Promise((r) => setTimeout(r, 1000));
      const userIsLogged = false;
      setAuth({ isLoading: false, isAuthenticated: userIsLogged, user_id: "" });
    };
    checkLogin();
  }, []);

  // 2. Load user + group
  const loadUserAndGroup = async () => {
    if (!auth.user_id) return;

    setData((prev) => ({ ...prev, isLoading: true }));
    setIsGrouped(null);

    try {
      const user = await FetchUserData(auth.user_id);

      if (!user || !user.groupId) {
        setIsGrouped(false);
        setData({ isLoading: false, user, group: null });
        return;
      }

      const group = await LoadGroup(user.groupId);
      setIsGrouped(true);
      setData({ isLoading: false, user, group });

    } catch (err) {
      console.error(err);
      setShowError({ snackbarVisible: true, message: "Erro ao carregar dados" });
      setIsGrouped(false);
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated) loadUserAndGroup();
  }, [auth.isAuthenticated]);

  // 3. UI Routing: ONLY ONE SCREEN AT A TIME

  // Loading auth
  if (auth.isLoading)
    return (
      <PreferencesProvider>
        <SplashScreen />
      </PreferencesProvider>
    );

  // Not authenticated
  if (!auth.isAuthenticated) {
    return (
      <PreferencesProvider>
        <UserAccessScreen
          isVisible
          onPress={(value) => setAuth((prev) => ({ ...prev, isAuthenticated: value }))}
          onUserId={(id) => setAuth((prev) => ({ ...prev, user_id: id }))}
        />
      </PreferencesProvider>
    );
  }

  // Authenticated → loading user & group
  if (data.isLoading || isGrouped === null) {
    return (
      <PreferencesProvider>
        <LoadScreen />
      </PreferencesProvider>
    );
  }

  // Authenticated → no group yet
  if (!isGrouped) {
    return (
      <PreferencesProvider>
        <GroupAccessSetup
          isVisible
          onPressingReturnButton={() =>
            setAuth((prev) => ({ ...prev, isAuthenticated: false }))
          }
          onReady={({ action, values }) => {
            if (data.user) {
              CreateGroup(
                action,
                values,
                {
                  id: auth.user_id,
                  name: data.user.identification.name,
                  surname: data.user.identification.surname
                },
                () => loadUserAndGroup(),
                (visible, message) => setShowError({ snackbarVisible: visible, message })
              );
            }
          }}
        />
      </PreferencesProvider>
    );
  }

  // Authenticated → grouped → main app
  return (
    <PreferencesProvider>
      <TabNavigation
        isVisible
        onUpdating={(isUpdating) => isUpdating && loadUserAndGroup()}
        userData={data.user as User}
        groupData={data.group as Group}
        onDismiss={() => setAuth((prev) => ({ ...prev, isAuthenticated: false }))}
      />
    </PreferencesProvider>
  );
}
