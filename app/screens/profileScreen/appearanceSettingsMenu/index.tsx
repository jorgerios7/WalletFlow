import { DarkMode, TextSizeType } from "@/app/types/appearance";
import CustomButton from "@/components/ui/CustomButton";
import RadioButton from "@/components/ui/RadioButton";
import TextButton from "@/components/ui/TextButton";
import { useState } from "react";
import { Text, View } from "react-native";
import MenuModal from "../menuModal";

interface Props { isVisible: boolean, onDismiss: () => void }

export default function AppearanceSettingsMenu({ isVisible, onDismiss }: Props) {
    const [sampleTextSize, setSampleTextSize] = useState<TextSizeType>("small");

    return (
        <MenuModal
            isVisible={isVisible}
            title={'Aparência'}
            onDismiss={onDismiss}
            children={
                <View style={{ padding: 20, gap: 10 }}>
                    <View style={{ height: 130, gap: 20, padding: 20, borderBottomWidth: 0.5, borderBottomColor: 'black' }}>
                        <Text style={{ fontSize: 16, alignSelf: 'center' }}>Modo escuro</Text>
                        <RadioButton
                            isHorizontal
                            initialValue={"auto" as DarkMode}
                            options={[
                                { label: "Ligado", value: "on" as DarkMode },
                                { label: "Desligado", value: "off" as DarkMode },
                                { label: "Automático", value: "auto" as DarkMode }
                            ]}
                            onSelecting={(selected) => console.log("on select: ", selected)}
                        />
                    </View>

                    <View style={{ height: 200, gap: 30, padding: 20, borderBottomWidth: 0.5, borderBottomColor: 'black'  }}>
                        <Text style={{ fontSize: 16, alignSelf: 'center' }}>Tamanho da fonte</Text>

                        <View style={{ height: 50, justifyContent: 'center'}}>
                            <Text
                                style={{
                                    fontStyle: 'italic', textAlign: 'center',
                                    fontSize: sampleTextSize === "small"
                                        ? 16
                                        : sampleTextSize === "medium"
                                            ? 20
                                            : 24,
                                }}
                            >
                                {"Olá, tudo bem?"}
                            </Text>
                        </View>

                        <RadioButton
                            isHorizontal
                            
                            initialValue={"small" as TextSizeType}
                            options={[
                                { label: "Pequeno", value: "small" as TextSizeType },
                                { label: "Médio", value: "medium" as TextSizeType },
                                { label: "Grande", value: "big" as TextSizeType }
                            ]}
                            onSelecting={(value) => setSampleTextSize(value as TextSizeType)}
                        />
                    </View>
                    <CustomButton text="Salvar alterações"  />
                    <TextButton text="Redefinir alterações" textColor="black"/> 
                </View>
            }
        />
    )
}