import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { Pressable, Text } from "react-native";

const ButtonTab: React.FC<{
    onPress: () => void, text: string, iconName?: keyof typeof MaterialIcons.glyphMap;
    iconSize?: number, borderBottomColor?: string,
}> = ({ onPress, text, iconName, iconSize, borderBottomColor }) => {

    const { preferences } = useContext(PreferencesContext);

    return (
        <Pressable
            onPress={onPress}
            style={{
                width: '100%', height: 70, padding: 10, flexDirection: 'row', justifyContent: iconName ? 'space-between' : 'center',
                alignItems: 'center', borderBottomColor: borderBottomColor ? borderBottomColor : Colors[preferences.theme.appearance].borderInverse,
                borderBottomWidth: 0.5, backgroundColor: 'transparent'
            }}>
            <Text
                style={{
                    color: Colors[preferences.theme.appearance].textContrast, alignSelf: 'center',
                    fontSize: Typography[preferences.fontSizeType].sm.fontSize,
                    lineHeight: Typography[preferences.fontSizeType].sm.lineHeight
                }}
            >
                {text}
            </Text>

            {iconName && (
                <MaterialIcons name={iconName} size={iconSize ? iconSize : 22} color={Colors[preferences.theme.appearance].iconContrast} />
            )}
        </Pressable>
    );
}

export default ButtonTab;