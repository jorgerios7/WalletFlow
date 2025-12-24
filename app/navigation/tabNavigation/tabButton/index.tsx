import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useContext } from "react";
import { GestureResponderEvent, Pressable } from "react-native";
import { styles } from "../styles";


interface Props {
    onPress?: (event: GestureResponderEvent) => void;
    iconName: keyof typeof MaterialIcons.glyphMap;
};

const TabButton: React.FC<Props> = ({ onPress, iconName }) => {
    const { preferences } = useContext(PreferencesContext);

    const isFocused = useIsFocused();

    const dynamicBorderColor = isFocused
        ? Colors[preferences.theme.appearance].iconBackgroundPrimary
        : Colors[preferences.theme.appearance].background;

    return (
        <Pressable
            onPress={onPress}
            style={[styles.tabButton, {
                borderColor: dynamicBorderColor,
                backgroundColor: Colors[preferences.theme.appearance].background
            }]}
        >
            <MaterialIcons
                name={iconName}
                size={28}
                color={Colors[preferences.theme.appearance].iconPrimary}
            />
        </Pressable>
    );
};



export default TabButton