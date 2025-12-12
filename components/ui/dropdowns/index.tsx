import { ThemeContext } from "@/components/ThemeProvider";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { Feather } from "@expo/vector-icons";
import { useContext } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import TransitionView from "../TransitionView";

export type OpenDirection = 'openAtTop' | 'openAtBottom';

interface Props {
    isVisible: boolean; items: string[] | number[]; deleteButtonVisible?: boolean; onShowing: OpenDirection;
    onSelect: (item: string | number) => void; onPressDelete?: (item: string | number) => void;
}

export default function Dropdown({ isVisible, items, deleteButtonVisible, onShowing, onSelect, onPressDelete }: Props) {
    if (!isVisible) return null;

    const { theme, fontSizeType } = useContext(ThemeContext);

    function ButtonDelete({ item }: { item: string | number }) {
        if (!deleteButtonVisible) return null;

        return (
            <Pressable
                style={{ alignSelf: "center", backgroundColor: "transparent", padding: 5 }}
                onPress={() => onPressDelete && onPressDelete(item)}
            >
                <Feather name={"minus-circle"} size={22} color={Colors[theme.appearance].iconPrimary} />
            </Pressable>
        );
    }

    function ItemView({ text }: { text: string | number }) {
        return (
            <View
                style={{
                    width: 280, flexDirection: "row", alignItems: "center", justifyContent: "space-between",
                    paddingVertical: 10, borderBottomWidth: 0.5, backgroundColor: "transparent",
                    borderBottomColor: Colors[theme.appearance].borderInverse
                }}
            >
                <Text style={{ flex: 1, color: Colors[theme.appearance].textPrimary, fontSize: Typography[fontSizeType].md.fontSize }}>{text}</Text>
                <ButtonDelete item={text} />
            </View>
        );
    }

    return (
        <TransitionView
            style={[styles.dropdown,
            {
                backgroundColor: Colors[theme.appearance].surfaceVariant, borderColor: Colors[theme.appearance].border,
                top: onShowing === 'openAtBottom'
                    ? '100%'
                    : undefined,
                bottom: onShowing === 'openAtTop'
                    ? '100%'
                    : undefined
            }]}
        >
            <ScrollView
                style={{ maxHeight: 300, paddingHorizontal: 10, }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                scrollEnabled={true}
            >
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <Pressable
                            key={index.toString()}
                            style={[isLast && { borderBottomWidth: 0, borderBottomColor: "transparent" }]}
                            onPress={() => onSelect(item)}
                        >
                            <ItemView text={item} />
                        </Pressable>
                    );
                })}
            </ScrollView>
        </TransitionView>
    );
}

const styles = StyleSheet.create({ dropdown: { position: "absolute", zIndex: 999, marginTop: 5, borderRadius: 10, borderWidth: 0.5 } });
