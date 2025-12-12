import { ThemeContext, ThemeProvider } from "@/components/ThemeProvider";
import { useContext, useEffect, useState } from "react";
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
  const { theme } = useContext(ThemeContext);

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
      <ThemeProvider>
        <SplashScreen />
      </ThemeProvider>
    );

  // Not authenticated
  if (!auth.isAuthenticated) {
    return (
      <ThemeProvider>
        <UserAccessScreen
          isVisible
          onPress={(value) => setAuth((prev) => ({ ...prev, isAuthenticated: value }))}
          onUserId={(id) => setAuth((prev) => ({ ...prev, user_id: id }))}
        />
      </ThemeProvider>
    );
  }

  // Authenticated → loading user & group
  if (data.isLoading || isGrouped === null) {
    return (
      <ThemeProvider>
        <LoadScreen theme={theme.appearance} />
      </ThemeProvider>
    );
  }

  // Authenticated → no group yet
  if (!isGrouped) {
    return (
      <ThemeProvider>
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
      </ThemeProvider>
    );
  }

  // Authenticated → grouped → main app
  return (
    <ThemeProvider>
      <TabNavigation
        isVisible
        onUpdating={(isUpdating) => isUpdating && loadUserAndGroup()}
        userData={data.user as User}
        groupData={data.group as Group}
        onDismiss={() => setAuth((prev) => ({ ...prev, isAuthenticated: false }))}
      />
    </ThemeProvider>
  );
}
