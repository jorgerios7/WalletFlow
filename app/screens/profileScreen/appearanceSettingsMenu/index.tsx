import { TextSizeType, ThemeSource, ThemeType } from "@/app/types/appearance";
import { ThemeContext } from "@/components/ThemeProvider";
import { ThemedView } from "@/components/ThemedView";
import CustomButton from "@/components/ui/CustomButton";
import RadioButton from "@/components/ui/RadioButton";
import TextButton from "@/components/ui/TextButton";
import { Colors } from "@/constants/Colors";
import { useContext, useState } from "react";
import { Text, useColorScheme, View } from "react-native";
import MenuModal from "../menuModal";

interface Props { isVisible: boolean, onDismiss: () => void };

export default function AppearanceSettingsMenu({ isVisible, onDismiss }: Props) {
    const systemTheme = useColorScheme();
    const { theme, setTheme } = useContext(ThemeContext);

    const [sampleTextSize, setSampleTextSize] = useState<TextSizeType>("small");

    const [themeState, setThemeState] = useState({ source: theme.source as ThemeSource, appearance: theme.appearance as ThemeType });

    function handleThemeSource() {
        setTheme({
            source: themeState.source,
            appearance:
                themeState.source === "system"
                    ? systemTheme as ThemeType
                    : themeState.appearance
        })
    };

    return (
        <MenuModal
            theme={theme.appearance}
            isVisible={isVisible}
            title={'Aparência'}
            onDismiss={onDismiss}
            children={
                <ThemedView style={{ padding: 20, gap: 10, backgroundColor: Colors[theme.appearance].background }}>

                    <View style={{ height: 130, gap: 20, padding: 20, backgroundColor: Colors[theme.appearance].surface, borderRadius: 10 }}>
                        <Text style={{ color: Colors[theme.appearance].textPrimary, fontSize: 16, alignSelf: 'center' }}>Modo escuro</Text>

                        <RadioButton
                            isHorizontal
                            theme={theme.appearance}
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

                    {/* CARD DO TAMANHO DE FONTE */}
                    <View style={{
                        height: 200,
                        gap: 30,
                        padding: 20,
                        backgroundColor: Colors[theme.appearance].surface,
                        borderRadius: 10
                    }}>
                        <Text style={{ color: Colors[theme.appearance].textPrimary, fontSize: 16, alignSelf: 'center' }}>
                            Tamanho da fonte
                        </Text>

                        <View style={{ height: 50, justifyContent: 'center' }}>
                            <Text
                                style={{
                                    color: Colors[theme.appearance].textPrimary,
                                    fontStyle: 'italic',
                                    textAlign: 'center',
                                    fontSize:
                                        sampleTextSize === "small" ? 16 :
                                            sampleTextSize === "medium" ? 20 : 24,
                                }}
                            >
                                {"Olá, tudo bem?"}
                            </Text>
                        </View>

                        <RadioButton
                            isHorizontal
                            theme={theme.appearance}
                            initialValue={sampleTextSize}
                            options={[
                                { label: "Pequeno", value: "small" },
                                { label: "Médio", value: "medium" },
                                { label: "Grande", value: "big" }
                            ]}
                            onSelecting={(value) => setSampleTextSize(value as TextSizeType)}
                        />
                    </View>
                    <CustomButton theme={theme.appearance} text="Salvar alterações" onPress={handleThemeSource} />
                    <TextButton theme={theme.appearance} text="Redefinir alterações" textColor={Colors[theme.appearance].textPrimary} />
                </ThemedView>
            }
        />
    );
}
