import { PreferencesContext } from "@/app/context/PreferencesProvider";
import CustomButton from "@/components/ui/CustomButton";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { useContext } from "react";
import { Text, View } from "react-native";

interface Props {
    message: string;
    onDismiss: () => void;
}

export default function MessageScreen({ message, onDismiss }: Props) {
    if (message === "") return null;

    const { preferences } = useContext(PreferencesContext);

    return (
        <View
            style={{
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 40,
                gap: 40
            }}
        >
            <Text
                style={{
                    textAlign: "justify",
                    color: Colors[preferences.theme.appearance].textPrimary,
                    fontSize: Typography[preferences.fontSizeType].md.fontSize,
                    lineHeight: Typography[preferences.fontSizeType].md.lineHeight
                }}>
                {message}
            </Text>

            <CustomButton
                text='Ok'
                onPress={onDismiss}
            />
        </View>
    );
}