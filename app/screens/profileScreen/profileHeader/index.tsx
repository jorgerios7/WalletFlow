import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { useContext, useState } from "react";
import { Text, View } from "react-native";
import { AnimatedBorderAvatar } from "./animatedBorderAvatar";
import ProfilePhotoPickerModal from "./profilePhotoPickerModal";
import { styles } from "./styles";

interface Props {
    user: { name: string, surname: string, email: string }
}

export default function ProfileHeader({ user }: Props) {
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
        <View
            style={[
                styles.container,
                {
                    backgroundColor: Colors[preferences.theme.appearance].surface,
                }
            ]}
        >
            <View
                style={styles.containerContent}
            >
                <Text
                    style={[styles.title, { ...textTitleStyle }]}
                >
                    Olá, {user.name} {user.surname}
                </Text>

                <Text
                    style={textSubtitleStyle}
                >
                    {user.email}
                </Text>

            </View>

            <AnimatedBorderAvatar
                onPressing={() => setPhotoPickerVisible(true)}
            />

            <ProfilePhotoPickerModal
                isVisible={photoPickerVisible}
                onDismiss={() => setPhotoPickerVisible(false)}
            />
            
        </View>
    );
}