import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

const MenuActionButton: React.FC<{ icon: any, text: string, onPress: () => void }> = ({ icon, text, onPress }) => {
    const { preferences } = useContext(PreferencesContext);

    const dynamicStyle = {
        borderRadius: 999,
        backgroundColor: Colors[preferences.theme.appearance].accent,
        shadowColor: Colors[preferences.theme.appearance].shadow,
        borderColor: Colors[preferences.theme.appearance].border
    };

    const dynamicTextStyle = {
        color: Colors[preferences.theme.appearance].textContrast,
        lineHeight: Typography[preferences.fontSizeType].sm.lineHeight,
        fontSize: Typography[preferences.fontSizeType].sm.fontSize
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[styles.card, dynamicStyle]}
        >
            <MaterialIcons
                name={icon}
                size={28}
                color={Colors[preferences.theme.appearance].iconContrast}
            />

            <Text
                style={[{padding: 10, ...dynamicTextStyle}]}
            >
                {text}
            </Text>

        </TouchableOpacity>
    );
};

export default MenuActionButton; 