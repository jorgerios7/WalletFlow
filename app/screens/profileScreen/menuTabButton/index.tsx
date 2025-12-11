import { ThemeContext } from "@/components/ThemeProvider";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { Pressable, Text } from "react-native";

const MenuTabButton: React.FC<{
    onPress: () => void; name: string; iconSize?: number
    iconName: keyof typeof MaterialIcons.glyphMap

}> = ({ onPress, name, iconName, iconSize }) => {

const {theme, fontSizeType} = useContext(ThemeContext);

    return (
        <Pressable
            onPress={onPress}
            style={{
                width: '100%', height: 50, gap: 20, backgroundColor: Colors[theme.appearance].surface,
                flexDirection: 'row', padding: 10, borderRadius: 10
            }}
        >
            <MaterialIcons
                name={iconName}
                size={iconSize ? iconSize : 28}
                color={Colors[theme.appearance].iconPrimary}
            />

            <Text style={{
                color: Colors[theme.appearance].textPrimary, alignSelf: 'center',
                fontSize: Typography[fontSizeType].sm.fontSize,
                lineHeight: Typography[fontSizeType].sm.lineHeight,
                fontWeight: 'bold'
            }}
            >
                {name}
            </Text>
        </Pressable>
    );
}

export default MenuTabButton;