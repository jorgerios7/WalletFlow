import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { FontSizeType, ScreenActivationTimeState, ScreensType } from "@/app/types/preferences";
import CustomButton from "@/components/ui/CustomButton";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { useContext, useState } from "react";
import { Text, View } from "react-native";
import PreferencesMenu from "./preferencesMenu";

export default function ConfigurationsMenu() {
    const { preferences, setFontSizeType, setInitScreen, setScreenActivationTime } = useContext(PreferencesContext);
    const [fontSizeTypeState, setFontSizeTypeState] = useState<FontSizeType>(preferences.fontSizeType);
    const [initScreenState, setInitScreenState] = useState<ScreensType>(preferences.initScreen);
    const [screenActivationTime, setScreenActivationTimeState] = useState<ScreenActivationTimeState>(preferences.screenActivationTime);

    function handleFontSizeType() {
        setFontSizeType(fontSizeTypeState)
    };

    function handleInitScreen() {
        setInitScreen(initScreenState);
    };

    function handleScreenActivationTime() {
        setScreenActivationTime(screenActivationTime);
    };

    const textStyle = {
        color: Colors[preferences.theme.appearance].textPrimary, fontSize: Typography[preferences.fontSizeType].sm.fontSize,
        lineHeight: Typography[preferences.fontSizeType].sm.lineHeight
    };

    return (
        <View style={{ gap: 10 }}>
            <Text style={textStyle}>Preferências</Text>

            <PreferencesMenu
                onInitScreenChange={setInitScreenState}
                onScreenStateChange={setScreenActivationTime}
                onFontTypeChange={setFontSizeTypeState}
            />

            <CustomButton
                text={"Salvar alterações"}
                onPress={() => {
                    handleFontSizeType();
                    handleInitScreen();
                    handleScreenActivationTime();
                }}
            />
        </View>
    );
}