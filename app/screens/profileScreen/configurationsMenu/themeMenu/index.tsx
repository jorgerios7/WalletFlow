import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { FontSizeType, ThemeSource, ThemeType } from "@/app/types/preferences";

import RadioButton from "@/components/ui/RadioButton";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { useContext, useState } from "react";
import { Text, View } from "react-native";

interface Props {
    onThemeChange: (themeState: { source: ThemeSource, appearance: ThemeType }) => void;
    onFontTypeChange: (fontSizeTypeState: FontSizeType) => void;
};

export default function ThemeMenu({ onThemeChange, onFontTypeChange }: Props) {
    const { preferences } = useContext(PreferencesContext);

    const [fontSizeTypeState, setFontSizeTypeState] = useState<FontSizeType>(preferences.fontSizeType);

    return (
        <View style={{ padding: 10, gap: 10, backgroundColor: "transparent" }}>
            <View style={{ gap: 10, padding: 10, backgroundColor: Colors[preferences.theme.appearance].surface, borderRadius: 10 }}>
                <Text
                    style={{
                        color: Colors[preferences.theme.appearance].textPrimary, fontSize: Typography[preferences.fontSizeType].lg.fontSize,
                        lineHeight: Typography[preferences.fontSizeType].lg.lineHeight, alignSelf: 'center'
                    }}
                >
                    Modo escuro
                </Text>

                <RadioButton
                    isHorizontal
                    initialValue={
                        preferences.theme.source === "system"
                            ? "system"
                            : preferences.theme.appearance
                    }
                    options={[
                        { label: "Ligado", value: "dark" },
                        { label: "Desligado", value: "light" },
                        { label: "Automático", value: "system" },
                    ]}

                    onSelecting={(mode) => {
                        onThemeChange({
                            source: mode !== "system"
                                ? "manual"
                                : "system",
                            appearance: mode as ThemeType
                        });
                    }}
                />
            </View>

            <View style={{
                gap: 10, padding: 10, backgroundColor: Colors[preferences.theme.appearance].surface, borderRadius: 10
            }}>
                <Text
                    style={{
                        color: Colors[preferences.theme.appearance].textPrimary, fontSize: Typography[preferences.fontSizeType].lg.fontSize,
                        lineHeight: Typography[preferences.fontSizeType].lg.lineHeight, alignSelf: 'center'
                    }}>
                    Tamanho da fonte
                </Text>

                <View style={{ height: 50, justifyContent: 'center' }}>
                    <Text
                        style={{
                            color: Colors[preferences.theme.appearance].textPrimary,
                            fontStyle: 'italic',
                            textAlign: 'center',
                            fontSize:
                                fontSizeTypeState === "small"
                                    ? 16 :
                                    fontSizeTypeState === "medium"
                                        ? 20
                                        : 24,
                        }}
                    >
                        {"Olá, tudo bem?"}
                    </Text>
                </View>

                <RadioButton
                    isHorizontal
                    initialValue={preferences.fontSizeType}
                    options={[
                        { label: "Pequeno", value: "small" },
                        { label: "Médio", value: "medium" },
                        { label: "Grande", value: "big" },
                        //{ label: "Automático", value: "system" }
                    ]}
                    onSelecting={(value) => {
                        onFontTypeChange(value as FontSizeType);
                        setFontSizeTypeState(value as FontSizeType);
                    }}
                />
            </View>
        </View>
    );
}
