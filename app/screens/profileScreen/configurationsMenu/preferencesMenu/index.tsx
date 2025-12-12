import { ScreensType } from "@/app/types/appearance";
import { ThemeContext } from "@/components/ThemeProvider";
import DropdownSelect from "@/components/ui/dropdowns/dropdownSelect";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { useContext, useState } from "react";
import { Switch, Text, View } from "react-native";

interface Props {
    value: { initScreen: ScreensType, screenOn: boolean }
    onInitScreenChange: (screen: ScreensType) => void;
    onScreenStateChange: (screenWillStayOn: boolean) => void;
}

export default function PreferencesMenu({ value, onInitScreenChange, onScreenStateChange }: Props) {
    const { theme, fontSizeType } = useContext(ThemeContext);
    const [screenOn, setScreenOn] = useState(value.screenOn);

    return (
        <View style={{
            padding: 10, gap: 10, backgroundColor: "transparent"
        }}>
            <View style={{
                gap: 10, padding: 20, backgroundColor: Colors[theme.appearance].surface, borderRadius: 10
            }}>
                <DropdownSelect
                    isVisible
                    onOpeningDropdown="openAtBottom"
                    placeholder={"Tela inicial"}
                    list={["analysis", "transactions", "group", "profile"]}
                    setSelection={value.initScreen}
                    onSelect={(value) => onInitScreenChange(value as ScreensType)}
                />


                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text
                        style={{
                            color: Colors[theme.appearance].textPrimary, fontSize: Typography[fontSizeType].md.fontSize,
                            lineHeight: Typography[fontSizeType].md.lineHeight,
                        }}
                    >
                        Manter a tela ligada
                    </Text>
                    <Switch
                        trackColor={{
                            false: Colors[theme.appearance].iconPrimary,
                            true: Colors[theme.appearance].iconSecondary,
                        }}
                        thumbColor={
                            screenOn
                                ? Colors[theme.appearance].accent
                                : Colors[theme.appearance].iconSecondary
                        }
                        value={screenOn}
                        onValueChange={(s) => {
                            setScreenOn(s);
                            onScreenStateChange(s);
                        }}
                    />
                </View>
            </View>
        </View>
    );
}