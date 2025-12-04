import { LoadScreen } from "@/app/pages/LoadScreen";
import { ThemeType } from "@/app/types/appearance";
import { Colors } from "@/constants/Colors";
import { ReactNode } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

export default function ContentScreen(
    { theme, visible, title, uploading, children }
        :
        { theme: ThemeType, visible: boolean, title: string, uploading: boolean, children: ReactNode }) {

    return (
        <Modal visible={visible} animationType={"slide"} transparent>
            <View style={[styles.overlay, { backgroundColor: Colors[theme].overlay }]}>
                <View style={[styles.container, { backgroundColor: Colors[theme].surface }]}>

                    <Text style={{ color: Colors[theme].textPrimary, fontWeight: 'bold', fontSize: 22 }}> {title}</Text>

                    {uploading ? (
                        <LoadScreen theme={theme} />
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