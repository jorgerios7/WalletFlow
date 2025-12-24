import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { LoadScreen } from "@/app/pages/LoadScreen";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { ReactNode, useContext } from "react";
import { Modal, Text, View } from "react-native";
import { styles } from "./styles";

interface Props {
    visible: boolean,
    title: string,
    uploading: boolean,
    children: ReactNode
}

export default function ContentScreen({ visible, title, uploading, children }: Props) {
    const { preferences } = useContext(PreferencesContext);

    if (!visible) return null;

    return (
        <Modal
            visible={visible}
            animationType={"slide"}
            transparent
        >
            <View
                style={[
                    styles.overlay,
                    { backgroundColor: Colors[preferences.theme.appearance].overlay }
                ]}
            >
                <View
                    style={[
                        styles.container,
                        { backgroundColor: Colors[preferences.theme.appearance].surface }
                    ]}
                >

                    <Text
                        style={{
                            fontWeight: '400',
                            color: Colors[preferences.theme.appearance].textPrimary,
                            fontSize: Typography[preferences.fontSizeType].lg.fontSize,
                            lineHeight: Typography[preferences.fontSizeType].lg.lineHeight
                        }}
                    >
                        {title}
                    </Text>

                    {uploading ? (
                        <LoadScreen />
                    ) : (
                        <View
                            style={styles.content}
                        >
                            {children}
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    );
}