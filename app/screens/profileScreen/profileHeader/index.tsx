import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { useContext } from "react";
import { Text, View } from "react-native";
import { AnimatedBorderAvatar } from "./animatedBorderAvatar";

export default function ProfileHeader({ user }: { user: { name: string, surname: string, email: string } }) {
    const { preferences } = useContext(PreferencesContext);

    const textTitleStyle = {
        color: Colors[preferences.theme.appearance].textPrimary,
        fontSize: Typography[preferences.fontSizeType].xl.fontSize,
    };

    const textSubtitleStyle = {
        color: Colors[preferences.theme.appearance].textSecondary,
        fontSize: Typography[preferences.fontSizeType].xs.fontSize,
    };

    return (
        <View style={{ width: "100%", flexDirection: "row", gap: 10 }}>
            <AnimatedBorderAvatar iconColor={Colors[preferences.theme.appearance].iconPrimary} />
            <View style={{ justifyContent: "center" }}>
                <Text style={textTitleStyle}>Olá, {user.name} {user.surname}</Text>
                <Text style={textSubtitleStyle}>{user.email}</Text>
            </View>
        </View>
    );
}