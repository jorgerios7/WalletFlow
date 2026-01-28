import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useContext, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    Text,
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
                    theme.surface,
                    theme.background,
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{
                    flex: 1,
                    overflow: 'hidden', // 🔴 essencial para respeitar o rounded
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
                            alignItems: "center",
                            gap: 12,
                        }}
                    >
                        <MaterialIcons
                            name="trending-up"
                            size={60}
                            color={
                                Colors[preferences.theme.appearance]
                                    .iconInverse
                            }
                            style={{
                                backgroundColor:
                                    Colors[preferences.theme.appearance]
                                        .iconBackgroundPrimary,
                                borderRadius: 40,
                                padding: 30,
                            }}
                        />

                        <View
                            style={{ alignItems: "center" }}
                        >
                            <Text
                                style={{
                                    color: Colors[preferences.theme.appearance].iconPrimary,
                                    fontSize: 40,
                                    fontWeight: "700",
                                    margin: 0
                                }}
                            >
                                Wallet Flow
                            </Text>

                            <Text
                                style={{
                                    color: Colors[preferences.theme.appearance].textSecondary,
                                    fontSize: Typography[preferences.fontSizeType].md.fontSize,
                                    fontWeight: "600",
                                    textAlign: "center",
                                    margin: 0
                                }}
                            >
                                Organize suas finanças com inteligência
                            </Text>
                        </View>
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
