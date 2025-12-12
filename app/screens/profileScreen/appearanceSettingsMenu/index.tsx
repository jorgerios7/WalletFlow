import { FontSizeType, ThemeSource, ThemeType } from "@/app/types/appearance";
import { ThemeContext } from "@/components/ThemeProvider";
import CustomButton from "@/components/ui/CustomButton";
import RadioButton from "@/components/ui/RadioButton";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { useContext, useState } from "react";
import { Text, useColorScheme, View } from "react-native";

export default function AppearanceSettingsMenu({ expanded }: { expanded: boolean }) {
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

    function handleFontSize() {
        setFontSizeType(fontSizeTypeState)
    };

    return (
        <View style={{ height: expanded ? "auto" : 0, overflow: "hidden", opacity: expanded ? 1 : 0, padding: 10, gap: 10, backgroundColor: "transparent" }}>
            <View style={{ height: 130, gap: 20, padding: 20, backgroundColor: Colors[theme.appearance].surface, borderRadius: 10 }}>
                <Text
                    style={{
                        color: Colors[theme.appearance].textPrimary, fontSize: Typography[fontSizeType].lg.fontSize,
                        lineHeight: Typography[fontSizeType].lg.lineHeight, alignSelf: 'center'
                    }}
                >
                    Modo escuro
                </Text>

                <RadioButton
                    isHorizontal
                    initialValue={theme.source === "system" ? "system" : theme.appearance}
                    options={[
                        { label: "Ligado", value: "dark" },
                        { label: "Desligado", value: "light" },
                        { label: "Automático", value: "system" },
                    ]}
                    onSelecting={(mode) => setThemeState({
                        source: mode !== "system"
                            ? "manual"
                            : "system",
                        appearance: mode as ThemeType
                    })}
                />
            </View>

            <View style={{
                height: 200,
                gap: 30,
                padding: 20,
                backgroundColor: Colors[theme.appearance].surface,
                borderRadius: 10
            }}>
                <Text
                    style={{
                        color: Colors[theme.appearance].textPrimary, fontSize: Typography[fontSizeType].lg.fontSize,
                        lineHeight: Typography[fontSizeType].lg.lineHeight, alignSelf: 'center'
                    }}>
                    Tamanho da fonte
                </Text>

                <View style={{ height: 50, justifyContent: 'center' }}>
                    <Text
                        style={{
                            color: Colors[theme.appearance].textPrimary,
                            fontStyle: 'italic',
                            textAlign: 'center',
                            fontSize:
                                fontSizeTypeState === "small" ? 16 :
                                    fontSizeTypeState === "medium" ? 20 : 24,
                        }}
                    >
                        {"Olá, tudo bem?"}
                    </Text>
                </View>

                <RadioButton
                    isHorizontal
                    initialValue={fontSizeType}
                    options={[
                        { label: "Pequeno", value: "small" },
                        { label: "Médio", value: "medium" },
                        { label: "Grande", value: "big" },
                        //{ label: "Automático", value: "system" }
                    ]}
                    onSelecting={(value) => setFontSizeTypeState(value as FontSizeType)}
                />
            </View>
            <CustomButton
                text="Salvar alterações"
                onPress={() => {
                    handleTheme();
                    handleFontSize();
                }}
            />
        </View>
    );
}
