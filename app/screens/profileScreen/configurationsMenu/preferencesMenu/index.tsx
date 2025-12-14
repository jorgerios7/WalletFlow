

import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { ScreenActivationTimeState, ScreensType } from "@/app/types/preferences";
import DropdownSelect from "@/components/ui/dropdowns/dropdownSelect";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { useContext, useState } from "react";
import { Switch, Text, View } from "react-native";

interface Props {
    value: { initScreen: ScreensType, screenState: ScreenActivationTimeState }
    onInitScreenChange: (screen: ScreensType) => void;
    onScreenStateChange: (screenActivationTimeState: ScreenActivationTimeState) => void;
};

export default function PreferencesMenu({ value, onInitScreenChange, onScreenStateChange }: Props) {
    const { preferences } = useContext(PreferencesContext);
    const [screenActivationTime, setScreenActivationTime] = useState(preferences.screenActivationTime);

    return (
        <View style={{
            padding: 10, gap: 10, backgroundColor: "transparent"
        }}>
            <View style={{
                gap: 10, padding: 10, backgroundColor: Colors[preferences.theme.appearance].surface, borderRadius: 10
            }}>
                <DropdownSelect
                    isVisible
                    onOpeningDropdown="openAtBottom"
                    placeholder={"Tela inicial"}
                    list={["analysis", "transactions", "group", "profile"]}
                    setSelection={preferences.initScreen}
                    onSelect={(value) => onInitScreenChange(value as ScreensType)}
                />

                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text
                        style={{
                            color: Colors[preferences.theme.appearance].textPrimary, fontSize: Typography[preferences.fontSizeType].md.fontSize,
                            lineHeight: Typography[preferences.fontSizeType].md.lineHeight,
                        }}
                    >
                        Manter a tela ligada
                    </Text>
                    <Switch
                        trackColor={{
                            false: Colors[preferences.theme.appearance].iconPrimary,
                            true: Colors[preferences.theme.appearance].iconSecondary,
                        }}
                        thumbColor={
                            screenActivationTime
                                ? Colors[preferences.theme.appearance].accent
                                : Colors[preferences.theme.appearance].iconSecondary
                        }
                        value={screenActivationTime === "automatic" ? false : true}
                        onValueChange={(state) => {
                            const stateUpdated = state
                                ? "alwaysOn"
                                : "automatic";

                            setScreenActivationTime(stateUpdated);
                            onScreenStateChange(stateUpdated);

                            console.log("value: ", state);
                            console.log("value2: ", stateUpdated);
                            console.log("value3: ", screenActivationTime);
                        }}
                    />
                </View>
            </View>
        </View>
    );
}