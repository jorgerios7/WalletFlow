import { LoadScreen } from "@/app/pages/LoadScreen";
import { ThemeContext } from "@/components/ThemeProvider";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { ReactNode, useContext } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

export default function ContentScreen({ visible, title, uploading, children }:{ visible: boolean, title: string, uploading: boolean, children: ReactNode }) {

    const { theme, fontSizeType } = useContext(ThemeContext);

    return (
        <Modal visible={visible} animationType={"slide"} transparent>
            <View style={[styles.overlay, { backgroundColor: Colors[theme.appearance].overlay }]}>
                <View style={[styles.container, { backgroundColor: Colors[theme.appearance].surface }]}>

                    <Text style={{
                        color: Colors[theme.appearance].textPrimary, fontWeight: 'bold',
                        fontSize: Typography[fontSizeType].lg.fontSize,
                        lineHeight: Typography[fontSizeType].lg.lineHeight
                    }}
                    >
                        {title}
                    </Text>

                    {uploading ? (
                        <LoadScreen theme={theme.appearance} />
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