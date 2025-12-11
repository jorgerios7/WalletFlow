import { ThemeContext } from "@/components/ThemeProvider";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useContext } from "react";
import { GestureResponderEvent, Pressable, StyleSheet, Text } from "react-native";

interface Props { onPress?: (event: GestureResponderEvent) => void; iconName: keyof typeof MaterialIcons.glyphMap; label?: string };

const TabButton: React.FC<Props> = ({ onPress, iconName, label }) => {

    const {theme, fontSizeType} = useContext(ThemeContext);

    const isFocused = useIsFocused();

    const dynamicColor = isFocused
        ? Colors[theme.appearance].iconInverse
        : Colors[theme.appearance].iconPrimary;

    const tabBackgroundColor = isFocused
        ? Colors[theme.appearance].iconBackgroundPrimary
        : Colors[theme.appearance].iconBackgroundSecondary;

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
            <Text style={[styles.label,
            {
                color: Colors[theme.appearance].textPrimary,
                fontSize: Typography[fontSizeType].xs.fontSize,
                lineHeight: Typography[fontSizeType].xs.lineHeight
            }]}
            >
                {label}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: { alignItems: 'center', alignContent: 'center', gap: 5 }, label: { fontSize: 12 }
});

export default TabButton