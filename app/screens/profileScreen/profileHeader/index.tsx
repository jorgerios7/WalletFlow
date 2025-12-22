import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { useContext, useState } from "react";
import { Text, View } from "react-native";
import ProfilePhotoPickerModal from "../profileMenu/profilePhotoPickerModal";
import { AnimatedBorderAvatar } from "./animatedBorderAvatar";

export default function ProfileHeader({ user }: { user: { name: string, surname: string, email: string } }) {
    const { preferences } = useContext(PreferencesContext);

    const [photoPickerVisible, setPhotoPickerVisible] = useState(false);

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
            <AnimatedBorderAvatar onPressing={() => setPhotoPickerVisible(true)} />
            <View style={{ justifyContent: "center" }}>
                <Text style={textTitleStyle}>Olá, {user.name} {user.surname}</Text>
                <Text style={textSubtitleStyle}>{user.email}</Text>
            </View>

            <ProfilePhotoPickerModal isVisible={photoPickerVisible} onDismiss={() => setPhotoPickerVisible(false)} />
        </View>
    );
}