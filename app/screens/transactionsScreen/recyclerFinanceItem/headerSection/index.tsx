import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { useContext } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

interface Props {
    date: string,
    value: number
}

export function HeaderSection({ date, value }: Props) {
    const { preferences } = useContext(PreferencesContext);
    return (
        <View
            style={[
                styles.headerContainer,
                { backgroundColor: Colors[preferences.theme.appearance].headerBackground }
            ]}
        >
            <Text
                style={[
                    styles.textHeader,
                    {
                        color: Colors[preferences.theme.appearance].textContrast,
                        fontSize: Typography[preferences.fontSizeType].xs.fontSize,
                        lineHeight: Typography[preferences.fontSizeType].xs.lineHeight
                    }
                ]}
            >
                {date}
            </Text>

            <Text
                style={[
                    styles.textHeader,
                    {
                        color: Colors[preferences.theme.appearance].textContrast,
                        fontSize: Typography[preferences.fontSizeType].xs.fontSize,
                        lineHeight: Typography[preferences.fontSizeType].xs.lineHeight
                    }
                ]}
            >
                Total: R$ {value.toFixed(2)}
            </Text>

        </View>
    );
}