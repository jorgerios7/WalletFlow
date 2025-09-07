import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { GestureResponderEvent, Pressable, StyleSheet, Text } from "react-native";

interface TabButtonProps {
    onPress?: (event: GestureResponderEvent) => void;
    iconName: keyof typeof MaterialIcons.glyphMap;
    label?: string;
}

const TabButton: React.FC<TabButtonProps> = ({
    onPress,
    iconName,
    label,
}) => {
    const isFocused = useIsFocused();
    const dynamicColor = isFocused ? Colors.light.background : Colors.light.highlightBackgroun_1;
    const dynamicBackgroundTextColor = isFocused ? Colors.light.highlightBackgroun_1 : Colors.light.background;
    const tabBackgroundColor = isFocused ? Colors.light.highlightBackgroun_1 : Colors.light.background;
    
    return (
        <Pressable onPress={onPress} style={[styles.tabButton, { backgroundColor: tabBackgroundColor }]}>
            <MaterialIcons name={iconName} size={24} color={dynamicColor} />
            <Text style={[styles.tabLabel, { color: dynamicColor, backgroundColor: dynamicBackgroundTextColor }]}>{label}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginHorizontal: 10
    },
    tabLabel: {
        fontSize: 12,
        marginTop: 2,
    },
});

export default TabButton