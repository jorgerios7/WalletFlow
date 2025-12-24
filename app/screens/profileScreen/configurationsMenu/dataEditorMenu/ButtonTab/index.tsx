import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { Pressable, Text } from "react-native";
import { styles } from "./styles";

interface Props {
    onPress: () => void,
    text: string,
    iconName?: keyof typeof MaterialIcons.glyphMap;
    iconSize?: number,
    borderBottomColor?: string
}

const ButtonTab: React.FC<Props> = ({ onPress, text, iconName, iconSize, borderBottomColor }) => {
    const { preferences } = useContext(PreferencesContext);

    return (
        <Pressable
            style={[
                styles.container,
                {
                    backgroundColor: Colors[preferences.theme.appearance].surface,
                    borderBottomColor:
                        borderBottomColor
                            ? borderBottomColor
                            : Colors[preferences.theme.appearance].borderInverse,
                    justifyContent:
                        iconName
                            ? 'space-between'
                            : 'center',
                }
            ]}
            onPress={onPress}
        >

            <Text
                style={[
                    styles.text,
                    {
                        color: Colors[preferences.theme.appearance].textPrimary,
                        fontSize: Typography[preferences.fontSizeType].sm.fontSize,
                        lineHeight: Typography[preferences.fontSizeType].sm.lineHeight
                    }
                ]}
            >
                {text}
            </Text>

            {iconName && (
                <MaterialIcons
                    name={iconName}
                    size={iconSize ? iconSize : 22}
                    color={Colors[preferences.theme.appearance].iconPrimary}
                />
            )}
        </Pressable>
    );
}

export default ButtonTab;