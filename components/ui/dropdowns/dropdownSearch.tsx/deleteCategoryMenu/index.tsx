import { TransactionType } from "@/app/types/Finance";
import { DeleteCategory } from "@/app/utils/categoryManager";
import CustomButton from "@/components/ui/CustomButton";
import TextButton from "@/components/ui/TextButton";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

interface Props {
    isVisible: boolean; categoryToDelete: string; currentType: TransactionType;
    onSuccess: () => void; onDismiss: () => void;
}

export default function DeleteCategoryMenu({ isVisible, categoryToDelete, currentType, onSuccess, onDismiss }: Props) {
    if (!categoryToDelete) return;

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
    }

    return (
        <Modal visible={isVisible} animationType="fade" transparent>
            <Pressable
                style={{
                    flex: 1, backgroundColor: "#00000031",
                    justifyContent: 'center', alignItems: 'center'
                }}
                onPress={onDismiss}
            >
                <View style={{
                    justifyContent: 'center', alignItems: 'center', marginHorizontal: 20,
                    gap: 10, padding: 20, backgroundColor: Colors.light.background, borderRadius: 10
                }}>
                    {!success ? (
                        <>
                            <Text style={{ marginBottom: 40, fontSize: 18, textAlign: 'center' }}>
                                {`Você tem certeza que deseja excluir `}
                                <Text style={{ fontWeight: "bold", color: Colors.light.textPrimary }}>{categoryToDelete}</Text>
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
                            <Text>
                                {`A categoria ${categoryToDelete} foi exluída com sucesso!`}
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