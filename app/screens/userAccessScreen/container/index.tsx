import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { ReactNode, useContext, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

type TabType = "signIn" | "signUp";

type Props = {
    onChange: (currentTab: TabType) => void;
    children: ReactNode;
}

type ButtonProps = {
    text: string;
    pressed: boolean;
    active_txt_color: string;
    inactive_txt_color: string,
    text_size: number;
    active_button_color: string;
    inactive_button_color: string;
    onPress: () => void;
}

function Tab({
    text,
    pressed,
    active_txt_color,
    inactive_txt_color,
    text_size,
    active_button_color,
    inactive_button_color,
    onPress
}: ButtonProps) {
    const dynamicBgStyle = {
        backgroundColor:
            pressed
                ? active_button_color
                : inactive_button_color
    }

    const dynamicTxtStyle = {
        color: pressed
            ? active_txt_color
            : inactive_txt_color
    }

    return (
        <Pressable
            style={[
                dynamicBgStyle,
                {
                    flexGrow: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 14,
                    borderRadius: 10

                }
            ]}
            onPress={onPress}
        >
            <Text
                style={[
                    dynamicTxtStyle,
                    {
                        fontSize: text_size,
                        fontWeight: "500"
                    }
                ]}
            >
                {text}
            </Text>
        </Pressable>
    );
}

export default function Container({ onChange, children }: Props) {
    const { preferences } = useContext(PreferencesContext);

    const theme = Colors[preferences.theme.appearance];
    const typography = Typography[preferences.fontSizeType];

    const [button, setButton] = useState<TabType>("signIn");

    useEffect(() => {
        onChange(button);

    }, [button]);

    return (
        <View style={{ flex: 1, gap: 20 }}>
            <View
                style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 2,
                    borderRadius: 10,
                    borderColor: theme.border,
                    backgroundColor: theme.surface
                }}
            >
                <Tab
                    text="Entrar"
                    active_txt_color={theme.textContrast}
                    inactive_txt_color={theme.textSecondary}
                    text_size={typography.md.fontSize}
                    active_button_color={theme.accent}
                    inactive_button_color={theme.surface}
                    pressed={button === "signIn"}
                    onPress={() => setButton("signIn")}
                />
                <Tab
                    text="Cadastrar"
                    active_txt_color={theme.textContrast}
                    inactive_txt_color={theme.textSecondary}
                    text_size={typography.md.fontSize}
                    active_button_color={theme.accent}
                    inactive_button_color={theme.surface}
                    pressed={button === "signUp"}
                    onPress={() => setButton("signUp")}
                />
            </View>

            {children}
        </View>
    );
}