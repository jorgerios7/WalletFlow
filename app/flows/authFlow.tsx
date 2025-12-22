import { useUser } from "../context/UserProvider";
import SplashScreen from "../pages/SplashScreen";
import UserAccessScreen from "../screens/userAccessScreen";
import UserFlow from "./userFlow";

export default function AuthFlow() {
    const {
        loadingAuth,
        authenticated
    } = useUser();

    if (loadingAuth) {
        return (
            <SplashScreen />
        );
    }

    if (!authenticated) {
        return (
            <UserAccessScreen />
        );
    }

    return (
        <UserFlow />
    );
}