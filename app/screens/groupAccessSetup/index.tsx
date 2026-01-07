import { PreferencesContext } from "@/app/context/PreferencesProvider";
import CustomButton from "@/components/ui/CustomButton";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { useContext, useState } from "react";
import { Text, View } from "react-native";
import CreateGroupScreen from "./createGroupScreen";
import JoinGroupScreen from "./joinGroupScreen";

const GroupAccessSetup: React.FC = () => {
    const { preferences } = useContext(PreferencesContext);

    const [currentScreen, setCurrentScreen] = useState<"home" | "create" | "join">("home");

    if (currentScreen === "home") {
        return (
            <View
                style={{
                    padding: 10,
                    backgroundColor: Colors[preferences.theme.appearance].surface,
                    justifyContent: "center",
                    alignItems: "center", gap: 40
                }}
            >
                <Text
                    style={{
                        color: Colors[preferences.theme.appearance].textPrimary,
                        fontSize: Typography[preferences.fontSizeType].lg.fontSize
                    }}
                >
                    Bem vindo!
                </Text>

                <Text
                    style={{
                        color: Colors[preferences.theme.appearance].textPrimary,
                        fontSize: Typography[preferences.fontSizeType].md.fontSize,
                        textAlign: "justify"
                    }}
                >
                    Para continuar, você precisa criar um novo grupo ou entrar em um existente.
                </Text>

                <CustomButton
                    text={'Continuar'}
                    onPress={() => setCurrentScreen("create")}
                />
            </View>
        )
    }

    return (
        <View
            style={{
                //flex: 1,
                //padding: 10,
                backgroundColor: Colors[preferences.theme.appearance].surface,
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            {currentScreen === "create" ? (
                <CreateGroupScreen
                    onJoinGroup={() => setCurrentScreen("join")} />
            ) : currentScreen === "join" && (
                <JoinGroupScreen
                    onDismiss={() => setCurrentScreen("create")}
                />
            )}
        </View>
    );
}

export default GroupAccessSetup;