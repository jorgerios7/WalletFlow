import { onAuthStateChanged } from "firebase/auth";
import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";
import { auth } from "../config/firebaseConfig";
import LoadGroupData from "../services/firebase/groupService/loadGroupData";
import LoadUserData from "../services/firebase/userService/loadUserData";
import UpdateEmail from "../services/firebase/userService/updateEmail";
import UpdatePassword from "../services/firebase/userService/updatePassword";
import UpdateUserName from "../services/firebase/userService/updateUserName";
import { Group } from "../types/Group";
import {
    UpdateEmailProps,
    UpdatePasswordProps,
    UpdateUsernameProps,
    User,
    UserContextData
} from "../types/User";

const UserContext = createContext<UserContextData | undefined>(undefined);

interface UserDataProviderProps {
    children: ReactNode;
} 

export default function UserProvider({
    children
}: UserDataProviderProps) {
    const [userId, setUserId] = useState<string | null>(null);

    const [user, setUser] = useState<User | null>(null);
    const [group, setGroup] = useState<Group | null>(null);

    const [loadingUserAndGroup, setLoadingUserAndGroup] = useState<boolean>(false);
    const [loadingAuth, setLoadingAuth] = useState<boolean>(true);

    const authenticated = Boolean(userId);

    const [hasInitialized, setHasInitialized] = useState(false);

    const [error, setError] = useState<Error | null>(null);

    const userHasGroup = Boolean(group);
 
    async function updateUserName(value: UpdateUsernameProps) {
        try {
            await UpdateUserName(value);
            await loadUserAndGroupData();
        } catch (err) {
            setError(err as Error);
            throw err;
        }
    }

    async function updateEmail(value: UpdateEmailProps) {
        try {
            await UpdateEmail(value);
            await loadUserAndGroupData();
        } catch (err) {
            setError(err as Error);
            throw err;
        }
    }

    async function updatePassword(value: UpdatePasswordProps) {
        try {
            await UpdatePassword(value);
            await loadUserAndGroupData();
        } catch (err) {
            setError(err as Error);
            throw err;
        }
    }

    const loadUserAndGroupData = useCallback(async () => {
        if (!userId) {
            setUser(null);
            setGroup(null);
            setError(null);

            if (!hasInitialized) {
                setLoadingUserAndGroup(false);
                setHasInitialized(true);
            }

            return;
        }

        try {
            const userData = await LoadUserData(userId);

            if (!userData?.groupId) {
                setUser(userData);
                setGroup(null);
            } else {
                const groupData = await LoadGroupData(userData.groupId);
                setUser(userData);
                setGroup(groupData);
            }
        } catch (err) {
            setError(err as Error);
            setUser(null);
            setGroup(null);
        } finally {
            if (!hasInitialized) {
                setLoadingUserAndGroup(false);
                setHasInitialized(true);
            }
        }
    }, [userId, hasInitialized]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUserId(firebaseUser.uid);
            } else {
                setUserId("");
            }

            setLoadingAuth(false);
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        if (loadingAuth) return;

        if (!authenticated) {
            setUser(null);
            setGroup(null);
            setLoadingAuth(false);
            return;
        }

        loadUserAndGroupData();
    }, [loadingAuth, authenticated, loadUserAndGroupData]);

    const value = useMemo<UserContextData>(() => ({
        user,
        group,
        userId,
        userHasGroup,
        loadingUserAndGroup,
        loadingAuth,
        authenticated,
        error,
        updateUserName,
        updateEmail,
        updatePassword,
        refresh: loadUserAndGroupData
    }), [
        user,
        group,
        userId,
        userHasGroup,
        loadingUserAndGroup,
        loadingAuth,
        authenticated,
        error,
        loadUserAndGroupData
    ]);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser(): UserContextData {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUser deve ser usado dentro de um UserProvider");
    }

    return context;
}
