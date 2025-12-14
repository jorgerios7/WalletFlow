import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { Feather } from "@expo/vector-icons";
import { ReactNode, useContext } from "react";
import { Modal, Pressable, Text, View } from "react-native";

interface Props {
    isVisible: boolean, title: string, children: ReactNode, onDismiss: () => void
};

export default function MenuModal({ isVisible, title, children, onDismiss }: Props) {
    const { preferences } = useContext(PreferencesContext);

    if (!preferences.theme && !preferences.fontSizeType) return null;

    return (
        <Modal visible={isVisible} animationType="slide">
            <View style={{ flex: 1, backgroundColor: Colors[preferences.theme.appearance].background }}>
                <View style={{ width: '100%', height: 50, backgroundColor: Colors[preferences.theme.appearance].background, flexDirection: 'row' }}>
                    <Pressable style={{ position: "absolute", top: 10, left: 10 }} onPress={onDismiss}>
                        <Feather name={'chevron-left'} size={28} color={Colors[preferences.theme.appearance].iconPrimary} />
                    </Pressable>
                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <Text
                            style={{
                                color: Colors[preferences.theme.appearance].textPrimary,
                                fontSize: Typography[preferences.fontSizeType].xl.fontSize,
                                lineHeight: Typography[preferences.fontSizeType].xl.lineHeight, fontWeight: 'bold'
                            }}
                        >
                            {title}
                        </Text>
                    </View>
                </View>

                {children}
            </View>
        </Modal>
    );
}
