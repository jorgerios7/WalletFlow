import { ThemeType } from "@/app/types/appearance";
import { TransactionType } from "@/app/types/Finance";
import { AddCategory } from "@/app/utils/categoryManager";
import CustomButton from "@/components/ui/CustomButton";
import TextButton from "@/components/ui/TextButton";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

interface Props {
    isVisible: boolean, categoryToAdd: string, theme: ThemeType,
    currentType: TransactionType, onSuccess: () => void, onDismiss: () => void
}

export type Action = 'add' | 'delete' | 'update';

export default function NewCategoryMenu({ isVisible, theme, categoryToAdd, currentType, onSuccess, onDismiss }: Props) {
    if (!categoryToAdd) return;

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

    async function handleFunction() {
        let isReady = false;
        try {
            await AddCategory(currentType, categoryToAdd);
            isReady = true;
        } catch (error) {
            isReady = false;
            console.log('(NewCategoryMenu.tsx) erro: ', error);
        } finally {
            if (isReady) {
                onSuccess();
                setSeccess(true);
            }
        }
    }

    return (
        <Modal visible={isVisible} animationType="fade" transparent>
            <Pressable
                style={{
                    flex: 1, backgroundColor: "#00000031",
                    justifyContent: 'center', alignItems: 'center',
                }}
                onPress={onDismiss}
            >
                <View style={{
                    minWidth: 250, minHeight: 250, justifyContent: 'center', alignItems: 'center', marginHorizontal: 20,
                    gap: 10, padding: 20, backgroundColor: Colors.light.background, borderRadius: 10
                }}>
                    {!success ? (
                        <>
                            <Text style={{ marginBottom: 40, fontSize: 18, textAlign: 'center' }}>
                                {`Você tem certeza que deseja adicionar `}
                                <Text style={{ fontWeight: "bold", color: Colors.light.textPrimary }}>{categoryToAdd}</Text>
                                {` a lista de categorias de ${renderCurrentType()}?`}
                            </Text>

                            <CustomButton
                            theme={theme}
                                text="Confirmar"
                                onPress={() => {
                                    handleFunction();
                                }}
                            />
                            <TextButton
                            theme={theme}
                                text="Cancelar"
                                onPress={onDismiss}
                            />
                        </>
                    ) : (
                        <>
                            <Text>
                                {`A categoria ${categoryToAdd} foi adicionada com sucesso!`}
                            </Text>

                            <CustomButton
                            theme={theme}
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
};