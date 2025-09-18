import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Animated, Pressable, StyleSheet, TextInput, View } from "react-native";
import Dropdown from "./dropdown";

interface Props {
    list: string[]; label: string; initialValue?: string; onSelectInDropdown: (item: string) => void;
    whenSelectItemToAdd: (item: string) => void; whenSelectItemToDelete: (item: string) => void;
    onTextInputChange:(text: string) => void , menuVisibility: (menu: Menu) => void
}

type Menu = 'newCategoryMenu' | 'deleteCategoryMenu';

export default function SearchDropdown({
    list, label, initialValue, onSelectInDropdown, whenSelectItemToAdd, 
    whenSelectItemToDelete, onTextInputChange, menuVisibility
}: Props) {
    const [text, setText] = useState(initialValue ? initialValue : "");
    const [results, setResults] = useState<string[]>([]);
    const [itemsVisible, setItemsVisible] = useState({ buttonAdd: false, newCategoryMenu: false, deleteCategoryMenu: false });
    const labelPosition = useState(new Animated.Value(17))[0];
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        const LABEL_TEXT_ABOVE = -9.6;
        const LABEL_TEXT_BELOW = 14

        Animated.timing(labelPosition, {
            toValue: text || isFocused ? LABEL_TEXT_ABOVE : LABEL_TEXT_BELOW,
            duration: 50,
            useNativeDriver: false,
        }).start();
    }, [text, isFocused]);

    

    function LabelAnimated({ labelText, labelColor }: { labelText: string, labelColor?: string }) {
        return (
            <Animated.Text
                style={[
                    styles.label,
                    {
                        top: labelPosition,
                        backgroundColor: labelColor ? labelColor : Colors.light.background
                    },
                ]}
            >
                {labelText}
            </Animated.Text>
        );
    }

    function ButtonAdd({ isVisible }: { isVisible: boolean }) {
        if (!isVisible) return;

        return (
            <Pressable
                style={{ position: 'absolute', right: 5, alignSelf: 'center', backgroundColor: 'transparent' }}
                onPress={() => {
                    whenSelectItemToAdd(text);
                    menuVisibility('newCategoryMenu');
                }}
            >
                <Feather
                    name={'plus-circle'}
                    size={22}
                    color={Colors.light.highlightBackgroun_1}
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
            <View style={{ flexDirection: 'row', alignContent: 'space-between', marginEnd: 5 }}>

                <LabelAnimated labelText={label} labelColor={Colors.light.shadow} />

                <TextInput
                    style={styles.input}
                    value={text}
                    onChangeText={handleSearch}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />

                <ButtonAdd isVisible={itemsVisible.buttonAdd} />

            </View>

            <Dropdown
                isVisible={results.length > 0}
                results={results}
                onSelect={(item) => {
                    setText(item);
                    onSelectInDropdown(item);
                    setResults([]);
                }}
                onPressDelete={(item) => {
                    menuVisibility('deleteCategoryMenu');
                    whenSelectItemToDelete(item);
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        minWidth: 300,
        margin: 5,
        backgroundColor: Colors.light.shadow,
        borderWidth: 0.5,
        borderColor: Colors.light.highlightBackgroun_1,
        borderRadius: 10,
    },
    label: {
        position: 'absolute',
        left: 18,
        paddingHorizontal: 10,
        color: Colors.light.highlightBackgroun_1,
        zIndex: 2,
        fontSize: 12,
        fontWeight: 'bold',
        padding: 2,
    },
    input: {
        minWidth: 295,
        fontWeight: 'bold',
        backgroundColor: Colors.light.shadow,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.light.highlightBackgroun_1,
        borderRadius: 8,
        padding: 14
    }
});
