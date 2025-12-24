import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { useContext } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

type NavigationDirection = "next" | "previous";

interface NavigationButtonProps {
    direction: NavigationDirection;
    onPress: () => void;
}

const NAVIGATION_CONFIG: Record<
    NavigationDirection,
    { icon: "chevron-left" | "chevron-right" }
> = {
    previous: { icon: "chevron-left" },
    next: { icon: "chevron-right" },
};

export default function NavigationButton({ direction, onPress }: NavigationButtonProps) {
    const { preferences } = useContext(PreferencesContext);

    const { icon } = NAVIGATION_CONFIG[direction];

    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: Colors[preferences.theme.appearance].surface }]}
            onPress={onPress}
            accessibilityRole="button"
        >
            <Feather
                size={20}
                color={Colors[preferences.theme.appearance].iconPrimary}
                name={icon}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    }
});
