import { TextSizeType, ThemeType } from "@/app/types/appearance";
import { ThemeContext } from "@/components/ThemeContext";
import { ThemedView } from "@/components/ThemedView";
import CustomButton from "@/components/ui/CustomButton";
import RadioButton from "@/components/ui/RadioButton";
import TextButton from "@/components/ui/TextButton";
import { Colors } from "@/constants/Colors";
import { useContext, useState } from "react";
import { Text, View } from "react-native";
import MenuModal from "../menuModal";

interface Props {
    isVisible: boolean;
    onDismiss: () => void;
}

export default function AppearanceSettingsMenu({ isVisible, onDismiss }: Props) {

    // 🔥 Agora o tema vem do Context global 
    const { theme, setTheme } = useContext(ThemeContext);

    const [sampleTextSize, setSampleTextSize] = useState<TextSizeType>("small");

    // Estado local do menu (não muda o app até clicar em "Salvar")
    const [appearanceMode, setAppearanceMode] = useState<ThemeType>(theme);

    function handleConfirm() {
        // ➜ salva o novo tema globalmente
        setTheme(appearanceMode);

        // fecha o modal
        onDismiss();
    }

    return (
        <MenuModal
            theme={theme}
            isVisible={isVisible}
            title={'Aparência'}
            onDismiss={onDismiss}
            children={
                <ThemedView style={{ padding: 20, gap: 10, backgroundColor: Colors[theme].background }}>

                    {/* CARD DO DARKMODE */}
                    <View style={{ height: 130, gap: 20, padding: 20, backgroundColor: Colors[theme].surface, borderRadius: 10 }}>
                        <Text style={{ color: Colors[theme].iconPrimary, fontSize: 16, alignSelf: 'center' }}>Modo escuro</Text>

                        <RadioButton
                            isHorizontal
                            theme={theme}
                            initialValue={appearanceMode}
                            options={[
                                { label: "Ligado", value: "dark" },
                                { label: "Desligado", value: "light" },
                                { label: "Automático", value: "system" },
                            ]}
                            onSelecting={(mode) => setAppearanceMode(mode as ThemeType)}
                        />
                    </View>

                    {/* CARD DO TAMANHO DE FONTE */}
                    <View style={{
                        height: 200,
                        gap: 30,
                        padding: 20,
                        backgroundColor: Colors[theme].surface,
                        borderRadius: 10
                    }}>
                        <Text style={{ color: Colors[theme].iconPrimary, fontSize: 16, alignSelf: 'center' }}>
                            Tamanho da fonte
                        </Text>

                        <View style={{ height: 50, justifyContent: 'center' }}>
                            <Text
                                style={{
                                    color: Colors[theme].textPrimary,
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
                            theme={theme}
                            initialValue={sampleTextSize}
                            options={[
                                { label: "Pequeno", value: "small" },
                                { label: "Médio", value: "medium" },
                                { label: "Grande", value: "big" }
                            ]}
                            onSelecting={(value) => setSampleTextSize(value as TextSizeType)}
                        />
                    </View>

                    <CustomButton theme={theme} text="Salvar alterações" onPress={handleConfirm} />

                    <TextButton theme={theme} text="Redefinir alterações" textColor={Colors[theme].textPrimary} />
                </ThemedView>
            }
        />
    );
}
