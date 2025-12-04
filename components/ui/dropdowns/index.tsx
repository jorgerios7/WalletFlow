import { ThemeType } from "@/app/types/appearance";
import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import TransitionView from "../TransitionView";

export type OpenDirection = 'openAtTop' | 'openAtBottom';

interface Props {
    theme: ThemeType, isVisible: boolean; items: string[] | number[]; deleteButtonVisible?: boolean; onShowing: OpenDirection;
    onSelect: (item: string | number) => void; onPressDelete?: (item: string | number) => void;
}

export default function Dropdown({ theme, isVisible, items, deleteButtonVisible, onShowing, onSelect, onPressDelete }: Props) {
    if (!isVisible) return null;

    function ButtonDelete({ item }: { item: string | number }) {
        if (!deleteButtonVisible) return null;

        return (
            <Pressable
                style={{ alignSelf: "center", backgroundColor: "transparent", padding: 5 }}
                onPress={() => onPressDelete && onPressDelete(item)}
            >
                <Feather name={"minus-circle"} size={22} color={Colors[theme].iconPrimary} />
            </Pressable>
        );
    }

    function ItemView({ text }: { text: string | number }) {
        return (
            <View
                style={{
                    width: 280, flexDirection: "row", alignItems: "center", justifyContent: "space-between",
                    paddingVertical: 10, borderBottomWidth: 0.5, backgroundColor: "transparent",
                    borderBottomColor: Colors[theme].borderInverse
                }}
            >
                <Text style={{ flex: 1, color: Colors[theme].textPrimary }}>{text}</Text>
                <ButtonDelete item={text} />
            </View>
        );
    }

    return (
        <TransitionView
            style={[styles.dropdown,
            {
                backgroundColor: Colors[theme].surfaceVariant, borderColor: Colors[theme].border,
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

const styles = StyleSheet.create({ dropdown: { position: "absolute", zIndex: 999, marginTop: 2, borderRadius: 10, borderWidth: 0.5 } });
