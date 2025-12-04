import { ThemeType } from "@/app/types/appearance";
import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { Pressable, View } from "react-native";

interface Props {
    theme: ThemeType; isVisible?: boolean; setSelection?: string; options: { value: string }[];
    children: React.ReactNode; onSelect: (value: string) => void;
}

const RadioGroup: React.FC<Props> = ({ theme, isVisible, setSelection, options, children, onSelect }) => {
    if (!isVisible) return null;

    const safeChildren = React.Children.toArray(children);
    const childrenCount = safeChildren.length;
    const optionsCount = options.length;

    if (childrenCount !== optionsCount) {
        console.error(`O número de filhos (${childrenCount}) não corresponde ao número de opções (${optionsCount}).`);
        return null;
    }

    const [selectedButton, setSelectedButton] = useState(setSelection ? setSelection : "");

    function Button({
        selectedButton, option, onSelectButton
    }: {
        selectedButton: string, option: { value: string }, onSelectButton: (value: string) => void;
    }) {

        return (
            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                <Pressable
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={() => onSelectButton(option.value)}
                >
                    <View style={{
                        height: 20, width: 20, borderRadius: 10, borderWidth: 2,
                        borderColor: Colors.light.iconPrimary, alignItems: "center", justifyContent: "center",
                    }}>
                        {selectedButton === option.value && (
                            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.light.iconPrimary }} />
                        )}
                    </View>
                </Pressable>
            </View>
        );
    }

    return (

        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
            {options.map((option, index) => {
                return (
                    <View key={index} style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 }}>
                        <Button
                            option={option}
                            selectedButton={selectedButton}
                            onSelectButton={(value) => {
                                setSelectedButton(value)
                                onSelect(value);
                            }}
                        />
                        {safeChildren[index] ?? null}
                    </View>
                );
            })}
        </View>
    );
}

export default RadioGroup;