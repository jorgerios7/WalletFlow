import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Dropdown, { OpenDirection } from "..";
import LabelAnimated from "../../LabelAnimated";

interface Props {
    list: string[]; label: string; initialValue?: string; onSelectInDropdown: (item: string) => void;
    whenSelectItemToAdd: (item: string) => void; whenSelectItemToDelete: (item: string) => void;
    onTextInputChange: (text: string) => void, menuVisibility: (menu: Menu) => void; onOpeningDropdown: OpenDirection;
}

type Menu = 'newCategoryMenu' | 'deleteCategoryMenu';

export default function DropdownSearch({
    list, label, initialValue, onSelectInDropdown, whenSelectItemToAdd,
    whenSelectItemToDelete, onTextInputChange, menuVisibility, onOpeningDropdown
}: Props) {
    const [text, setText] = useState(initialValue ? initialValue : "");
    const [results, setResults] = useState<string[]>([]);
    const [itemsVisible, setItemsVisible] = useState({ buttonAdd: false, newCategoryMenu: false, deleteCategoryMenu: false });
    const [isFocused, setIsFocused] = useState(false);

    function ButtonAdd({ isVisible }: { isVisible: boolean }) {
        if (!isVisible) return null;

        return (
            <Pressable
                style={{ position: 'absolute', top: 12, right: 10, alignSelf: 'center', backgroundColor: 'transparent' }}
                onPress={() => {
                    whenSelectItemToAdd(text);
                    menuVisibility('newCategoryMenu');
                }}
            >
                <Feather
                    name={'plus-circle'}
                    size={22}
                    color={Colors.light.primary}
                />
            </Pressable>
        );
    }

    const handleSearch = (value: string) => {
        setItemsVisible(prev => ({ ...prev, buttonAdd: false }));
        setText(value);
        onTextInputChange(value);

        if (value.trim() === "") {
            setResults([]);
        } else {
            const filtered = list.filter((item) =>
                item.toLowerCase().includes(value.toLowerCase())
            );
            setResults(filtered);
            setItemsVisible(prev => ({ ...prev, buttonAdd: filtered.length === 0 }));
        }
    };

    return (
        <View style={styles.container}>
            <LabelAnimated
                labelColor={Colors.light.shadow}
                labelText={label}
                focused={isFocused}
                textInput={text}
            />

            <TextInput
                style={[styles.input, isFocused && styles.inputFocused]}
                value={text}
                maxLength={40}
                onChangeText={handleSearch}
                onFocus={() => { setIsFocused(true) }}
                onBlur={() => { setIsFocused(false) }}
            />

            <ButtonAdd isVisible={itemsVisible.buttonAdd} />

            <Dropdown
                deleteButtonVisible
                isVisible={results.length > 0}
                onShowing={onOpeningDropdown}
                items={results}
                onSelect={(item) => {
                    setText(item as string);
                    onSelectInDropdown(item as string);
                    setResults([]);
                }}
                onPressDelete={(item) => {
                    menuVisibility('deleteCategoryMenu');
                    whenSelectItemToDelete(item as string);
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { position: "relative" },
    inputFocused: { outlineColor: "transparent" },
    input: {
        color: Colors.light.primary, borderWidth: 0.5, borderColor: Colors.light.border,
        backgroundColor: "transparent", fontWeight: "bold", borderRadius: 10, padding: 14
    }

});
