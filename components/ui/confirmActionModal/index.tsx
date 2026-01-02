import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { useContext } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import TextButton from "../TextButton";

interface Props {
    isVisible: boolean;
    confirmationMessage: string;
    onConfirm: () => void;
    onCancel?: () => void;
}

const ConfirmActionModal: React.FC<Props> = ({ isVisible, confirmationMessage, onConfirm, onCancel }) => {
    const { preferences } = useContext(PreferencesContext);

    const dynamicTextStyle = {
        fontSize: Typography[preferences.fontSizeType].md.fontSize,
        lineHeight: Typography[preferences.fontSizeType].md.lineHeight,
    }

    return (
        <Modal
            visible={isVisible}
            animationType="fade"
            transparent
        >
            <View
                style={[
                    styles.modalOverlay,
                    { backgroundColor: Colors[preferences.theme.appearance].overlay }
                ]}
            >
                <View
                    style={[
                        styles.modalContent,
                        { backgroundColor: Colors[preferences.theme.appearance].surfaceVariant }
                    ]}
                >
                    <Text
                        style={{
                            color: Colors[preferences.theme.appearance].textPrimary,
                            textAlign: 'center',
                            fontWeight: 'bold',
                            ...dynamicTextStyle
                        }}
                    >
                        {confirmationMessage}
                    </Text>
                    <TextButton
                        text={'Ok'}
                        onPress={onConfirm}
                    />
                    {onCancel && (
                        <TextButton
                            text={'Cancelar'}
                            onPress={onCancel}
                        />
                    )}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', },
    modalContent: { width: '90%', borderRadius: 10, padding: 20, gap: 20 }
});

export default ConfirmActionModal;