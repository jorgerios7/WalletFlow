import { ThemeContext } from "@/components/ThemeProvider";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const MenuActionButton: React.FC<{ icon: any, text: string, size: number, onPress: () => void }> = ({ icon, text, size, onPress }) => {
    const { theme, fontSizeType } = useContext(ThemeContext);

    const dynamicStyle = {
        height: size, borderRadius: size / 2,
        backgroundColor: Colors[theme.appearance].accent,
        shadowColor: Colors[theme.appearance].shadow,
        borderColor: Colors[theme.appearance].border
    };

    const dynamicTextStyle = {
        color: Colors[theme.appearance].textContrast, lineHeight: Typography[fontSizeType].sm.lineHeight,
        fontSize: Typography[fontSizeType].sm.fontSize
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[styles.button, dynamicStyle]}
        >
            <MaterialIcons name={icon} size={22} color={Colors[theme.appearance].iconContrast} />
            <Text
                numberOfLines={1}
                style={[dynamicTextStyle]}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center', alignItems: 'center', shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2, shadowRadius: 6, elevation: 5, borderWidth: 1, flexDirection: 'row', paddingHorizontal: 10
    }
});

export default MenuActionButton;