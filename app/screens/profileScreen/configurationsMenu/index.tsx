import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { PersonalDataChange } from "@/app/types/User";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { useContext, useState } from "react";
import { Text, View } from "react-native";
import EditPersonalDataModal from "../editPersonalDataModal";
import DataEditorMenu from "./dataEditorMenu";
import PreferencesMenu from "./preferencesMenu";

export default function ConfigurationsMenu() {
    const { preferences, setFontSizeType, setInitScreen, setScreenActivationTime } = useContext(PreferencesContext);

    const textStyle = {
        color: Colors[preferences.theme.appearance].textPrimary, fontSize: Typography[preferences.fontSizeType].sm.fontSize,
        lineHeight: Typography[preferences.fontSizeType].sm.lineHeight
    };

    const [editPersonalData, setEditPersonalData] = useState({ isVisible: false, field: "none" as PersonalDataChange });

    return (
        <View style={{ gap: 10 }}>
            <DataEditorMenu
                onSelect={(field) => setEditPersonalData({ isVisible: true, field: field })}
            />

            <Text style={textStyle}>Preferências</Text>

            <PreferencesMenu
                onInitScreenChange={setInitScreen}
                onScreenStateChange={setScreenActivationTime}
                onFontTypeChange={setFontSizeType}
            />

            <EditPersonalDataModal
                isVisible={editPersonalData.isVisible}
                field={editPersonalData.field}
                onDismiss={(isBackToInitScreen) =>
                    setEditPersonalData({ isVisible: false, field: "none" })
                }
            />
        </View>
    );
}