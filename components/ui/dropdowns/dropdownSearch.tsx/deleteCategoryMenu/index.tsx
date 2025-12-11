import { TransactionType } from "@/app/types/Finance";
import { DeleteCategory } from "@/app/utils/categoryManager";
import { ThemeContext } from "@/components/ThemeProvider";
import CustomButton from "@/components/ui/CustomButton";
import TextButton from "@/components/ui/TextButton";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { useContext, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

interface Props {
    isVisible: boolean; categoryToDelete: string; currentType: TransactionType;
    onSuccess: () => void; onDismiss: () => void;
}

export default function DeleteCategoryMenu({ isVisible,categoryToDelete, currentType, onSuccess, onDismiss }: Props) {
    if (!categoryToDelete) return;

    const {theme, fontSizeType} =  useContext(ThemeContext);

    const [success, setSeccess] = useState(false);

    function renderCurrentType() {
        if (currentType === 'expense') {
            return 'Despesas Financeiras'
        } else if (currentType === 'income') {
            return 'Receitas Financeiras'
        } else {
            return 'Lucros Financeiros'
        }
    }

    async function handleDeleteCategory() {
        let isReady = false;
        try {
            await DeleteCategory(currentType, categoryToDelete);
            isReady = true;
        } catch (error) {
            console.log('(DeleteCategoryMenu.tsx) error: ', error)
            isReady = false;
        } finally {
            if (isReady) onSuccess();
            setSeccess(true);
        }
    };

    const dynamicTextStyle = {
        fontSize: Typography[fontSizeType].md.fontSize,
        lineHeight: Typography[fontSizeType].md.lineHeight,
    };

    return (
        <Modal visible={isVisible} animationType="fade" transparent>
            <Pressable
                style={{ flex: 1, padding: 10, backgroundColor: Colors[theme.appearance].overlay, justifyContent: 'center', alignItems: 'center' }}
                onPress={onDismiss}
            >
                <View style={{
                    justifyContent: 'center', alignItems: 'center', gap: 10, padding: 20,
                    backgroundColor: Colors[theme.appearance].surface, borderRadius: 10
                }}>
                    {!success ? (
                        <>
                            <Text style={{ ...dynamicTextStyle, color: Colors[theme.appearance].textPrimary, marginBottom: 30, fontSize: 18, textAlign: 'center' }}>
                                {`Você tem certeza que deseja excluir `}
                                <Text style={{ fontWeight: "bold", color: Colors[theme.appearance].accent }}>{categoryToDelete}</Text>
                                {` da lista de categorias de ${renderCurrentType()}?`}
                            </Text>

                            <CustomButton
                                text="Confirmar"
                                onPress={() => {
                                    handleDeleteCategory();
                                }}
                            />
                            <TextButton
                                text="Cancelar"
                                onPress={() => {
                                    onDismiss();
                                    setSeccess(false);
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <Text style={{...dynamicTextStyle,  color: Colors[theme.appearance].textPrimary, marginBottom: 30, fontSize: 18, textAlign: 'center' }}>
                                {`A categoria `}
                                <Text style={{ fontWeight: "bold", color: Colors[theme.appearance].accent }}>{categoryToDelete}</Text>
                                {` foi exluída com sucesso!`}
                            </Text>

                            <CustomButton
                                text="Ok"
                                onPress={() => {
                                    onDismiss();
                                    setSeccess(false);
                                }}
                            />
                        </>
                    )}

                </View>
            </Pressable>
        </Modal>
    );
}