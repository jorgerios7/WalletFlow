
import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useContext } from "react";
import { GestureResponderEvent, Pressable, StyleSheet } from "react-native";

interface Props { onPress?: (event: GestureResponderEvent) => void; iconName: keyof typeof MaterialIcons.glyphMap; label?: string };

const TabButton: React.FC<Props> = ({ onPress, iconName, label }) => {

    const { preferences } = useContext(PreferencesContext);

    const isFocused = useIsFocused();

    const dynamicColor = isFocused
        ? Colors[preferences.theme.appearance].iconInverse
        : Colors[preferences.theme.appearance].iconPrimary;

    const tabBackgroundColor = isFocused
        ? Colors[preferences.theme.appearance].iconBackgroundPrimary
        : Colors[preferences.theme.appearance].iconBackgroundSecondary;

    return (
        <Pressable
            onPress={onPress}
            style={styles.button}
        >
            <MaterialIcons
                style={{ backgroundColor: tabBackgroundColor, borderRadius: 20, padding: 5 }}
                name={iconName}
                size={24}
                color={dynamicColor}
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: { alignItems: 'center', alignContent: 'center', gap: 5 }, label: { fontSize: 12 }
});

export default TabButton