
import { PreferencesContext } from "@/app/context/PreferencesProvider";
import {
    FONT_SIZE_TYPE,
    FONT_SIZE_VALUES,
    FontSizeLevel, FontSizeType,
    ScreenActivationTimeState,
    ScreensType
} from "@/app/types/preferences";
import DropdownSelect from "@/components/ui/dropdowns/dropdownSelect";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { useContext, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import FontSizeSelector from "./fontSizeSelector";

interface Props {
    onInitScreenChange: (screen: ScreensType) => void;
    onScreenStateChange: (screenActivationTimeState: ScreenActivationTimeState) => void;
    onFontTypeChange: (fontSizeTypeState: FontSizeType) => void;
};

export default function PreferencesMenu({ onInitScreenChange, onScreenStateChange, onFontTypeChange }: Props) {
    const { preferences } = useContext(PreferencesContext);
    const [screenActivationTime, setScreenActivationTime] = useState(preferences.screenActivationTime);
    const [fontSizeTypeState, setFontSizeTypeState] = useState<FontSizeType>(preferences.fontSizeType);

    const [fontSizeTypeStateValue, setFontSizeTypeStateValue] = useState<FontSizeLevel>(FONT_SIZE_VALUES[preferences.fontSizeType]);

    const dynamicContainerBackground = { backgroundColor: Colors[preferences.theme.appearance].surface };

    function handleFontSizeType(value: FontSizeLevel) {
        const label = FONT_SIZE_TYPE[value];

        setFontSizeTypeStateValue(value);
        setFontSizeTypeState(label); 
        onFontTypeChange(label);
    };

    return (
        <View style={styles.container}>
            <View style={[styles.containerContent, dynamicContainerBackground]}>
                <Text
                    style={{
                        color: Colors[preferences.theme.appearance].textPrimary,
                        fontSize: Typography[preferences.fontSizeType].lg.fontSize,
                        lineHeight: Typography[preferences.fontSizeType].lg.lineHeight,
                        alignSelf: 'flex-start'
                    }}>
                    Tamanho da fonte
                </Text>

                <View style={{ width: "100%", height: 150, padding: 50, justifyContent: 'center' }}>
                    <Text
                        style={{
                            color: Colors[preferences.theme.appearance].textPrimary,
                            fontStyle: 'normal',
                            textAlign: 'center',
                            fontSize:
                                fontSizeTypeState === "small"
                                    ? Typography["small"].md.fontSize :
                                    fontSizeTypeState === "medium"
                                        ? Typography["medium"].md.fontSize
                                        : Typography["big"].md.fontSize,
                        }}
                    >
                        {"O texto principal aparecerá desta forma.1234567890%()+-="}
                    </Text>
                </View>

                <FontSizeSelector
                    value={fontSizeTypeStateValue}
                    onChange={handleFontSizeType}
                />
            </View>

            <View style={[styles.containerContent, dynamicContainerBackground]}>
                <DropdownSelect
                    isVisible
                    onOpeningDropdown="openAtBottom"
                    placeholder={"Tela inicial"}
                    list={["analysis", "transactions", "group", "profile"]}
                    setSelection={preferences.initScreen}
                    onSelect={(value) => onInitScreenChange(value as ScreensType)}
                />
            </View>

            <View style={[styles.containerContent, dynamicContainerBackground]}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text
                        style={{
                            color: Colors[preferences.theme.appearance].textPrimary,
                            fontSize: Typography[preferences.fontSizeType].md.fontSize,
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
                        }}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, gap: 10 }, containerContent: { padding: 10, borderRadius: 10 }
});

