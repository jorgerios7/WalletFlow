import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { useContext, useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";

interface IdAccessLinkProps {
    onPress: () => void;
}

export default function IdAccessLink({ onPress }: IdAccessLinkProps) {
    const { preferences } = useContext(PreferencesContext);

    const themeColors = Colors[preferences.theme.appearance];
    const fontSize = Typography[preferences.fontSizeType].md.fontSize;

    const baseTextStyle = useMemo(
        () => [
            styles.text,
            {
                color: themeColors.textPrimary,
                fontSize,
            },
        ],
        [themeColors.textPrimary, fontSize]
    );

    return (
        <View style={styles.container}>
            <Text style={baseTextStyle}>
                Caso já possua um ID,
            </Text>

            <Pressable
                onPress={onPress}
                accessibilityRole="button"
            >
                <Text
                    style={[
                        baseTextStyle, {
                            color: themeColors.highlight,
                            fontWeight: "500",

                        }]}
                >
                    toque aqui
                </Text>
            </Pressable>

            <Text style={baseTextStyle}>
                para prosseguir.
            </Text>
        </View>
    );
}
