import { Type } from "@/app/screens/addScreen";
import { AddCategory } from "@/app/utils/categoryManager";
import { Colors } from "@/constants/Colors";
import { Modal, Pressable, Text, View } from "react-native";
import CustomButton from "../../CustomButton";
import TextButton from "../../TextButton";

export default function NewCategoryMenu(
    { isVisible, newCategory, currentType, onSuccess, onDismiss }
        :
        { isVisible: boolean, newCategory: string, currentType: Type, onSuccess: () => void, onDismiss: () => void }) {
    if (!newCategory) return;

    function renderCurrentType() {
        if (currentType === 'expense') {
            return 'Despesas Financeiras'
        } else if (currentType === 'income') {
            return 'Receitas Financeiras'
        } else {
            return 'Lucros Financeiros'
        }
    }

    async function handleAddCategory() {
        try {
            const data = await AddCategory(currentType, newCategory);
            console.log('dado adicionado: ', data);
            onSuccess();
        } catch (error) {
            console.log('(NewCategoryMenu.tsx) erro ao adicionar categoria: ', error);
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
                    justifyContent: 'center', alignItems: 'center', marginHorizontal: 20,
                    gap: 10, padding: 20, backgroundColor: Colors.light.background, borderRadius: 10
                }}>
                    <Text style={{ marginBottom: 40, fontSize: 18, textAlign: 'center' }}>
                        {`Você tem certeza que deseja salvar `}
                        <Text style={{ fontWeight: "bold", color: Colors.light.highlightBackgroun_1 }}>{newCategory}</Text>
                        {` como uma nova categoria de ${renderCurrentType()}?`}
                    </Text>
                    <CustomButton
                        text="Confirmar"
                        onPress={() => {
                            handleAddCategory();
                        }}
                    />
                    <TextButton
                        text="Cancelar"
                        onPress={onDismiss}
                    />
                </View>
            </Pressable>
        </Modal>
    );
};