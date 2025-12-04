import { ThemeType } from "@/app/types/appearance";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { GestureResponderEvent, Pressable, StyleSheet, Text } from "react-native";

interface Props { onPress?: (event: GestureResponderEvent) => void; theme: ThemeType, iconName: keyof typeof MaterialIcons.glyphMap; label?: string };

const TabButton: React.FC<Props> = ({ onPress, theme, iconName, label }) => {
    const isFocused = useIsFocused();

    const dynamicColor = isFocused
        ? Colors[theme].iconInverse
        : Colors[theme].iconPrimary;

    const tabBackgroundColor = isFocused
        ? Colors[theme].iconBackgroundPrimary
        : Colors[theme].iconBackgroundSecondary;

    return (
        <Pressable
            onPress={onPress}
            style={styles.button}
        >
            <MaterialIcons
                style={{ backgroundColor: tabBackgroundColor, borderRadius: 20, padding: 5 }}
                name={iconName}
                size={24}
                color={dynamicColor}
            />
            <Text style={[styles.label, { color: Colors[theme].textPrimary }]}>
                {label}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: { alignItems: 'center', alignContent: 'center', gap: 5 }, label: { fontSize: 12 }
});

export default TabButton