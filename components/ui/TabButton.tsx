import { MaterialIcons } from "@expo/vector-icons";
import { GestureResponderEvent, Pressable, StyleSheet, Text } from "react-native";

interface TabButtonProps {
    onPress?: (event: GestureResponderEvent) => void;
    iconName: keyof typeof MaterialIcons.glyphMap;
    label?: string;
    accessibilityState?: { selected?: boolean };
}

const TabButton: React.FC<TabButtonProps> = ({
    onPress,
    iconName,
    label,
    accessibilityState,
}) => {
    const isFocused = accessibilityState?.selected ?? false;
    const color = isFocused ? '#6200ee' : '#888';
    const defaultSize = 24;

    return (
        <Pressable onPress={onPress} style={styles.tabButton}>
            <MaterialIcons name={iconName} size={defaultSize} color={color} />
            <Text style={[styles.tabLabel, { color }]}>{label}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabLabel: {
        fontSize: 12,
        marginTop: 2,
    },
});

export default TabButton