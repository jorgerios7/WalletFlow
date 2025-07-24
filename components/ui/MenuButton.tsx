import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";

const MenuButton: React.FC<{
    onPress: () => void,
    text: string,
    iconName?: keyof typeof MaterialIcons.glyphMap;
    isHighlightText: boolean;
    fontSize: number,
    iconSize?: number,
    borderBottomColor?: string
}> = ({ onPress, text, iconName, isHighlightText, fontSize, iconSize, borderBottomColor }) => {
    return (
        <Pressable
            onPress={onPress}
            style={{
                width: '100%',
                height: 70,
                padding: 10,
                flexDirection: 'row',
                justifyContent: iconName ? 'space-between' : 'center',
                alignItems: 'center',
                borderBottomColor: borderBottomColor ? borderBottomColor : Colors.light.background,
                borderBottomWidth: 0.5,
                backgroundColor: 'transparent'
            }}>
            <Text style={{
                color: isHighlightText ? Colors.light.highlightBackgroun_2 : 'white',
                alignSelf: 'center',
                fontSize: fontSize
            }}>
                {text}
            </Text>

            {iconName && (
                <MaterialIcons
                    name={iconName}
                    size={iconSize ? iconSize : 28}
                    color={Colors.light.background}
                />
            )}

        </Pressable>
    );
}

export default MenuButton;