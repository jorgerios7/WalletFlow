import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { Colors } from "@/constants/Colors";
import { useContext, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomBottomSheet from "./customBottomSheet";
import HomeScreen from "./homeScreen";
import SignInScreen from "./signInScreen";
import SignUpScreen from "./signUpScreen";

const UserAccessScreen: React.FC = () => {
    const insets = useSafeAreaInsets();

    const { preferences } = useContext(PreferencesContext);

    const [currentScreen, setCurrentScreen] = useState<"home" | "signIn" | "signUp">("home");

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: Colors[preferences.theme.appearance].background,
                marginTop: insets.top,
            }}
        >
            <CustomBottomSheet>
                <HomeScreen
                    isVisible={currentScreen === "home"}
                    onSelect={setCurrentScreen}
                />

                <SignInScreen
                    isVisible={currentScreen === "signIn"}
                    onDismiss={() => setCurrentScreen("home")}
                />

                <SignUpScreen
                    isVisible={currentScreen === "signUp"}
                    onDismiss={() => setCurrentScreen("home")}
                />
            </CustomBottomSheet>
        </View>
    );
}

export default UserAccessScreen;