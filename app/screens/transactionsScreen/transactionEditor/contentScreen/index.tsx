import { LoadScreen } from "@/app/pages/LoadScreen";
import { Colors } from "@/constants/Colors";
import { ReactNode } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

export default function ContentScreen(
    { visible, title, uploading, children }
        :
        { visible: boolean, title: string, uploading: boolean, children: ReactNode }) {

    return (
        <Modal visible={visible} animationType={"slide"} transparent>
            <View style={styles.overlay}>
                <View style={styles.container}>

                    <Text style={{ fontWeight: 'bold', fontSize: 22 }}> {title}</Text>

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
    overlay: { flex: 1, backgroundColor: 'rgba(175, 172, 172, 0.64)' },
    container: {
        width: '100%', minHeight: '80%', marginTop: '41%', backgroundColor: Colors.light.background, gap: 50,
        justifyContent: 'center', alignItems: 'center'
    },
    content: { gap: 50, justifyContent: 'center', alignItems: 'center' }
});