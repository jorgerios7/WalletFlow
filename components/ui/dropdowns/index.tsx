import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";
import TransitionView from "../TransitionView";

export type OpenDirection = 'openAtTop' | 'openAtBottom';

interface Props {
    isVisible: boolean; items: string[] | number[]; deleteButtonVisible?: boolean; onShowing: OpenDirection;
    onSelect: (item: string | number) => void; onPressDelete?: (item: string | number) => void;
}

export default function Dropdown({ isVisible, items, deleteButtonVisible, onShowing, onSelect, onPressDelete }: Props) {
    if (!isVisible) return null;

    const dynamicPosition = {
        top: onShowing === 'openAtTop' ? 100 : undefined,
        bottom: onShowing === 'openAtBottom' ? 100 : undefined,
    };

    function ButtonDelete({ item }: { item: string | number }) {
        if (!deleteButtonVisible) return null;

        return (
            <Pressable
                style={{ alignSelf: "center", backgroundColor: "transparent", padding: 5 }}
                onPress={() => onPressDelete && onPressDelete(item)}
            >
                <Feather
                    name={"minus-circle"}
                    size={22}
                    color={Colors.light.highlightBackgroun_1}
                />
            </Pressable>
        );
    }

    function ItemView({ text }: { text: string | number }) {
        return (
            <View
                style={{
                    minWidth: 300, flexDirection: "row", alignItems: "center", justifyContent: "space-between",
                    padding: 10, borderBottomWidth: 0.5, borderRadius: 10,
                    borderBottomColor: Colors.light.highlightBackgroun_1
                }}
            >
                <Text style={{ flex: 1 }}>{text}</Text>
                <ButtonDelete item={text} />
            </View>
        );
    }

    return (
        <TransitionView
            style={[
                styles.dropdown,
                {
                    top: onShowing === 'openAtBottom' ? '100%' : undefined,
                    bottom: onShowing === 'openAtTop' ? '100%' : undefined
                }
            ]}>
            <ScrollView
                style={{ maxHeight: 160 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                scrollEnabled={true}
            //onStartShouldSetResponderCapture={() => true}
            //onMoveShouldSetResponderCapture={() => true}
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

const styles = StyleSheet.create({
    dropdown: {
        position: "absolute", zIndex: 999, marginTop: 2, backgroundColor: Colors.light.background,
        borderRadius: 10, borderWidth: 0.5, borderColor: Colors.light.highlightBackgroun_1
    }
});
