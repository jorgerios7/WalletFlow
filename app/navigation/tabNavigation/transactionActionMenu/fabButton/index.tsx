import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./styles";

export const FabButton: React.FC<{ onPress: () => void, expanded: boolean }> = ({ onPress, expanded }) => {
     const insets = useSafeAreaInsets();
     
    const { preferences } = useContext(PreferencesContext);

    const dynamicStyle = {
        bottom: insets.bottom + -30,
        backgroundColor: Colors[preferences.theme.appearance].accent,
        shadowColor: Colors[preferences.theme.appearance].shadow,
        borderColor: Colors[preferences.theme.appearance].border
    };

    return (
        <Pressable onPress={onPress} style={[styles.card, dynamicStyle]}>
            <MaterialIcons
                name={expanded
                    ? 'close'
                    : 'add'
                } size={28}
                color={Colors[preferences.theme.appearance].iconContrast}
            />
        </Pressable>
    );
}

export default FabButton;