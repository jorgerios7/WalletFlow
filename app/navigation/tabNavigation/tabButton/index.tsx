import { ThemeType } from "@/app/types/appearance";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { GestureResponderEvent, Pressable, StyleSheet, Text } from "react-native";

interface Props { onPress?: (event: GestureResponderEvent) => void; theme: ThemeType, iconName: keyof typeof MaterialIcons.glyphMap; label?: string };

const TabButton: React.FC<Props> = ({ onPress, theme, iconName, label }) => {
    const isFocused = useIsFocused();

    const dynamicColor = isFocused
        ? Colors[theme].background
        : Colors[theme].primary;

    const tabBackgroundColor = isFocused
        ? Colors[theme].primary
        : Colors[theme].background;

    return (
        <Pressable
            onPress={onPress}
            style={styles.tabButton}
        >
            <MaterialIcons
                style={{ backgroundColor: tabBackgroundColor, borderRadius: 5, padding: 1 }}
                name={iconName}
                size={24}
                color={dynamicColor}
            />
            <Text style={[styles.tabLabel, {color: Colors[theme].primary}]}>
                {label}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    tabButton: {
        flex: 1, alignItems: 'center', justifyContent: 'center',
        borderRadius: 5, marginHorizontal: 10, marginTop: 5
    },
    tabLabel: { fontSize: 12, marginTop: 2 },
});

export default TabButton