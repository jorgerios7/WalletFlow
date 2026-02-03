import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { useContext, useState } from "react";
import {
    Image,
    SafeAreaView,
    ScrollView,
    View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Container from "./container";
import SignInScreen from "./signInScreen";
import SignUpScreen from "./signUpScreen";

type ButtonType = "signIn" | "signUp";

const UserAccessScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const { preferences } = useContext(PreferencesContext);
    const [currentScreen, setCurrentScreen] = useState<ButtonType>("signIn");

    const theme = Colors[preferences.theme.appearance];

    return (
        <SafeAreaView
            style={{
                flex: 1,
                marginTop: insets.top,
                marginBottom: insets.bottom,
            }}
        >
            <LinearGradient
                colors={[
                    theme.background,
                    theme.background,
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{
                    flex: 1,
                    overflow: 'hidden',
                }}
            >

                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{
                        flexGrow: 1,
                        padding: 20,
                        paddingBottom: 40,
                        gap: 24,
                    }}
                >

                    {/* header */}
                    <View
                        style={{
                            alignItems: "center"
                        }}
                    >
                        <Image
                            source={require("@/assets/images/splash-foreground.png")}
                            style={{
                                width: 180,
                                height: 180,
                                resizeMode: "contain",
                                borderRadius: 30
                            }}
                        />
                    </View>

                    <Container
                        onChange={(value) => setCurrentScreen(value as ButtonType)}
                    >
                        {/* content */}
                        <SignInScreen
                            isVisible={currentScreen === "signIn"}
                        />

                        <SignUpScreen
                            isVisible={currentScreen === "signUp"}
                        />

                    </Container>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default UserAccessScreen;
