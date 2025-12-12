import { FontSizeType, ScreensType, ThemeSource, ThemeType } from "@/app/types/appearance";
import { ThemeContext } from "@/components/ThemeProvider";
import CustomButton from "@/components/ui/CustomButton";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { useContext, useState } from "react";
import { Text, useColorScheme, View } from "react-native";
import PreferencesMenu from "./preferencesMenu";
import ThemeMenu from "./themeMenu";

export default function ConfigurationsMenu() {
    const systemTheme = useColorScheme();

    const { theme, fontSizeType, setTheme, setFontSizeType } = useContext(ThemeContext);
    const [themeState, setThemeState] = useState({ source: theme.source as ThemeSource, appearance: theme.appearance as ThemeType });
    const [fontSizeTypeState, setFontSizeTypeState] = useState<FontSizeType>(fontSizeType);

    function handleTheme() {
        setTheme({
            source: themeState.source,
            appearance:
                themeState.source === "system"
                    ? systemTheme as ThemeType
                    : themeState.appearance
        })
    };

    function handleFontSizeType() { setFontSizeType(fontSizeTypeState) };

    const textStyle = {
        color: Colors[theme.appearance].textPrimary, fontSize: Typography[fontSizeType].sm.fontSize,
        lineHeight: Typography[fontSizeType].sm.lineHeight
    };

    function Line() {
        return <View style={{ width: "100%", height: 0.5, backgroundColor: Colors[theme.appearance].border }} />
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
                value={{initScreen: "transactions" as ScreensType, screenOn: true}}
                onInitScreenChange={(screen) => console.log("initScreen: ", screen)}
                onScreenStateChange={(screenOn) => console.log("screenOn: ", screenOn)}
            />

            <CustomButton
                text="Salvar alterações"
                onPress={() => {
                    handleTheme();
                    handleFontSizeType();
                }}
            />

        </View>
    );
}