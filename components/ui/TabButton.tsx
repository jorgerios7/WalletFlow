import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { GestureResponderEvent, Pressable, StyleSheet, Text } from "react-native";

interface TabButtonProps {
    onPress?: (event: GestureResponderEvent) => void;
    iconName: keyof typeof MaterialIcons.glyphMap;
    label?: string;
    focused?: boolean;
}

const TabButton: React.FC<TabButtonProps> = ({
    onPress,
    iconName,
    label,
    
    focused
}) => {
    const isFocused = focused;
    const color = isFocused ? '#6200ee' : '#888';
    const tabBackgroundColor = isFocused ? '#e0d7f5' : Colors.light.background;

    return (
        <Pressable onPress={onPress} style={[styles.tabButton, { backgroundColor: tabBackgroundColor }]}>
            <MaterialIcons name={iconName} size={24} color={color} />
            <Text style={[styles.tabLabel, { color }]}>{label}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.light.background,
        borderRadius: 12,
    },
    tabLabel: {
        fontSize: 12,
        marginTop: 2,
        backgroundColor: Colors.light.background
    },
});

export default TabButton