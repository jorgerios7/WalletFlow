import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { LoadScreen } from "@/app/pages/LoadScreen";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { ReactNode, useContext } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

export default function ContentScreen({ visible, title, uploading, children }:{ visible: boolean, title: string, uploading: boolean, children: ReactNode }) {

    const { preferences } = useContext(PreferencesContext);

    return (
        <Modal visible={visible} animationType={"slide"} transparent>
            <View style={[styles.overlay, { backgroundColor: Colors[preferences.theme.appearance].overlay }]}>
                <View style={[styles.container, { backgroundColor: Colors[preferences.theme.appearance].surface }]}>

                    <Text style={{
                        color: Colors[preferences.theme.appearance].textPrimary, fontWeight: 'bold',
                        fontSize: Typography[preferences.fontSizeType].lg.fontSize,
                        lineHeight: Typography[preferences.fontSizeType].lg.lineHeight
                    }}
                    >
                        {title}
                    </Text>

                    {uploading ? (
                        <LoadScreen />
                    ) : (
                        <View style={styles.content}>{children}</View>
                    )}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: { flex: 1 },
    container: { width: '100%', minHeight: '80%', marginTop: '41%', gap: 50, justifyContent: 'center', alignItems: 'center' },
    content: { gap: 50, justifyContent: 'center', alignItems: 'center' }
});