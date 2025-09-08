import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
    isVisible: boolean;
    results: string[];
    onSelect: (item: string) => void;
    onResults: (result: []) => void;
    setText: (text: string) => void;
}

export default function Dropdown({ isVisible, results, onSelect, onResults, setText }: Props) {
    if (!isVisible) return;

    return (
        <View style={styles.dropdown}>
            <FlatList
                data={results}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => {
                            onResults([]);
                            setText(item);
                            onSelect(item);
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <Text style={{ width: 260 }}>{item}</Text>
                            <Pressable style={{ alignSelf: 'center', backgroundColor: 'transparent', }}>
                                <MaterialIcons
                                    name={'more-vert'}
                                    size={22}
                                    color={Colors.light.highlightBackgroun_1}
                                />
                            </Pressable>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    dropdown: {
        backgroundColor: Colors.light.shadow,
        borderRadius: 10,
        maxHeight: 150,
    },
    item: {
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.light.highlightBackgroun_1,
        borderRadius: 10
    },
});
