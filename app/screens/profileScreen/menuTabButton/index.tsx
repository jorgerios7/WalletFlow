import { ThemeType } from "@/app/types/appearance";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";

const MenuTabButton: React.FC<{
    onPress: () => void; name: string; iconSize?: number
    iconName: keyof typeof MaterialIcons.glyphMap; theme: ThemeType

}> = ({ onPress, name, iconName, iconSize, theme }) => {
    return (
        <Pressable
            onPress={onPress}
            style={{
                width: '100%', height: 50, gap: 20, backgroundColor: Colors[theme].surfaceVariant,
                flexDirection: 'row', padding: 10, borderBottomColor: Colors[theme].border,
                borderBottomWidth: 0.5
            }}>

            <MaterialIcons
                name={iconName}
                size={iconSize ? iconSize : 28}
                color={Colors[theme].secondary}
            />

            <Text style={{
                color: Colors[theme].textSecondary, alignSelf: 'center',
                fontSize: 14, fontWeight: 'bold'
            }}
            >
                {name}
            </Text>
        </Pressable>
    );
}

export default MenuTabButton;