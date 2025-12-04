import { ThemeType } from "@/app/types/appearance";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";

const ButtonTab: React.FC<{
    onPress: () => void, text: string, iconName?: keyof typeof MaterialIcons.glyphMap;
    fontSize: number, iconSize?: number, borderBottomColor?: string, theme: ThemeType
}> = ({ onPress, text, iconName, fontSize, iconSize, borderBottomColor, theme }) => {
    return (
        <Pressable
            onPress={onPress}
            style={{
                width: '100%', height: 70, padding: 10, flexDirection: 'row', justifyContent: iconName ? 'space-between' : 'center',
                alignItems: 'center', borderBottomColor: borderBottomColor ? borderBottomColor : Colors[theme].borderInverse,
                borderBottomWidth: 0.5, backgroundColor: 'transparent'
            }}>
            <Text style={{ color: Colors[theme].textContrast, alignSelf: 'center', fontSize: fontSize }}>
                {text}
            </Text>

            {iconName && (
                <MaterialIcons name={iconName} size={iconSize ? iconSize : 28} color={Colors[theme].iconContrast} />
            )}
        </Pressable>
    );
}

export default ButtonTab;