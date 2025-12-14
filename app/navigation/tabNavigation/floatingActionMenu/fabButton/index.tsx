import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { Pressable, StyleSheet } from "react-native";

export const FabButton: React.FC<{ onPress: () => void, expanded: boolean, size: number }> = ({ onPress, expanded, size }) => {
    const { preferences } = useContext(PreferencesContext);

    const dynamicStyle = {
        width: size, height: size, borderRadius: size / 2,
        backgroundColor: Colors[preferences.theme.appearance].accent,
        shadowColor: Colors[preferences.theme.appearance].shadow,
        borderColor: Colors[preferences.theme.appearance].border
    };

    return (
        <Pressable onPress={onPress} style={[styles.button, dynamicStyle]}>
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

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center', alignItems: 'center', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.25,
        shadowRadius: 8, elevation: 6, borderWidth: 0.5
    }
});

export default FabButton;