import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
    isVisible: boolean;
    results: string[];
    onSelect: (item: string) => void;
    onPressDelete: (item: string) => void;
}

export default function Dropdown({ isVisible, results, onSelect, onPressDelete }: Props) {
    if (!isVisible) return;

    function ButtonDelete({ item }: { item: string }) {
        return (
            <Pressable
                style={{
                    alignSelf: "center",
                    backgroundColor: "transparent",
                    padding: 5,
                }}
                onPress={() => onPressDelete(item)}
            >
                <Feather
                    name={"minus-circle"}
                    size={22}
                    color={Colors.light.highlightBackgroun_1}
                />
            </Pressable>
        );
    }

    return (
        <View style={styles.dropdown}>
            <FlatList
                data={results}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    const isLast = index === results.length - 1;
                    return (
                        <TouchableOpacity
                            style={[
                                styles.item,
                                isLast && { borderBottomWidth: 0, borderBottomColor: "transparent" },
                            ]}
                            onPress={() => onSelect(item)}
                        >
                            <View
                                style={{ flexDirection: "row", alignContent: "space-between", alignItems: "center" }}
                            >
                                <Text style={{ width: 250 }}>{item}</Text>

                                <ButtonDelete item={item} />

                            </View>
                        </TouchableOpacity>
                    );
                }}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    dropdown: {
        backgroundColor: Colors.light.shadow,
        borderRadius: 10,
        maxHeight: 160,
    },
    item: {
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.light.highlightBackgroun_1,
        borderRadius: 10
    },
});
