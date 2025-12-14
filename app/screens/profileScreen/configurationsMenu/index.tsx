import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { FontSizeType, ScreenActivationTimeState, ScreensType, ThemeSource, ThemeType } from "@/app/types/preferences";
import CustomButton from "@/components/ui/CustomButton";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { useContext, useState } from "react";
import { Text, useColorScheme, View } from "react-native";
import PreferencesMenu from "./preferencesMenu";
import ThemeMenu from "./themeMenu";

export default function ConfigurationsMenu() {
    const systemTheme = useColorScheme();

    const { preferences, setTheme, setFontSizeType, setInitScreen, setScreenActivationTime } = useContext(PreferencesContext);

    const [themeState, setThemeState] = useState({
        source: preferences.theme.source as ThemeSource, appearance: preferences.theme.appearance as ThemeType
    });
    const [fontSizeTypeState, setFontSizeTypeState] = useState<FontSizeType>(preferences.fontSizeType);
    const [initScreenState, setInitScreenState] = useState<ScreensType>(preferences.initScreen);
    const [screenActivationTime, setScreenActivationTimeState] = useState<ScreenActivationTimeState>(preferences.screenActivationTime);

    function handleTheme() {
        setTheme({
            source: themeState.source,
            appearance:
                themeState.source === "system"
                    ? systemTheme as ThemeType
                    : themeState.appearance
        })
    };

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

    function Line() {
        return <View style={{ width: "100%", height: 0.5, backgroundColor: Colors[preferences.theme.appearance].border }} />
    };

    return (
        <View style={{ gap: 10 }}>
            <Text style={textStyle}>Aparência</Text>

            <ThemeMenu
                onThemeChange={setThemeState}
                onFontTypeChange={setFontSizeTypeState}
            />

            <Line />

            <Text style={textStyle}>Preferências</Text>

            <PreferencesMenu
                value={{ initScreen: initScreenState, screenState: screenActivationTime }}
                onInitScreenChange={setInitScreenState}
                onScreenStateChange={setScreenActivationTime}
            />

            <Line />

            <CustomButton
                text={"Salvar alterações"}
                onPress={() => {
                    handleTheme();
                    handleFontSizeType();
                    handleInitScreen();
                    handleScreenActivationTime();
                }}
            />
        </View>
    );
}