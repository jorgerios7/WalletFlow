import { ThemeType } from "@/app/types/appearance";
import { TransactionType } from "@/app/types/Finance";
import { LoadCategories } from "@/app/utils/categoryManager";
import DropdownSearch from "@/components/ui/dropdowns/dropdownSearch.tsx";
import DeleteCategoryMenu from "@/components/ui/dropdowns/dropdownSearch.tsx/deleteCategoryMenu";
import NewCategoryMenu from "@/components/ui/dropdowns/dropdownSearch.tsx/newCategoryMenu";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import StepScreen from "../../../stepScreen";

interface StepsProps { isVisible: boolean; theme: ThemeType, onBack?: () => void; onConfirm: () => void; onCancel: () => void }

export default function CategoryStep(
    { isVisible, theme, value, type, onConfirm, onBack, onSelect, onCancel }:
        StepsProps & { value: string; type: TransactionType; onSelect: (value: string) => void }
) {
    const [itemsVisible, setItemsVisible] = useState({ newCategoryMenu: false, deleteCategoryMenu: false });
    const [categories, setCategories] = useState<string[]>([]);
    const [text, setText] = useState(value);

    useEffect(() => {
        HandleLoadCategories();
    }, []);

    async function HandleLoadCategories() {
        try {
            const data = await LoadCategories(type);
            setCategories(data);
        } catch (error) {
            console.log('(Steps.tsx) Erro ao carregar categoria: ', error);
        }
    }

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <StepScreen
                theme={theme}
                isVisible={isVisible}
                onConfirm={() => {
                    if (text === '' || !text || text !== value) {
                        Alert.alert('Campo vazio', 'Selecione uma opção para continuar');
                    } else {
                        onConfirm();
                    }
                }}
                onBack={onBack}
                onCancel={onCancel}
            >
                <DropdownSearch
                    theme={theme} 
                    initialValue={value}
                    onOpeningDropdown="openAtBottom"
                    list={categories}
                    label={"Categoria"}
                    menuVisibility={(menu) => setItemsVisible(prev => ({ ...prev, [menu]: true }))}
                    onSelectInDropdown={(text1) => { onSelect(text1), setText(text1) }}
                    whenSelectItemToAdd={(text1) => { onSelect(text1); setText(text1) }}
                    whenSelectItemToDelete={(text1) => { onSelect(text1), setText(text1) }}
                    onTextInputChange={(text1) => setText(text1)}
                />
            </StepScreen>

            <NewCategoryMenu
                theme={theme}
                isVisible={itemsVisible.newCategoryMenu}
                categoryToAdd={text}
                currentType={type}
                onSuccess={() => { HandleLoadCategories() }}
                onDismiss={() => setItemsVisible(prev => ({ ...prev, newCategoryMenu: false }))}
            />

            <DeleteCategoryMenu
                theme={theme}
                isVisible={itemsVisible.deleteCategoryMenu}
                currentType={type}
                categoryToDelete={text}
                onSuccess={() => { HandleLoadCategories() }}
                onDismiss={() => setItemsVisible(prev => ({ ...prev, deleteCategoryMenu: false }))}
            />
        </View>
    );
};