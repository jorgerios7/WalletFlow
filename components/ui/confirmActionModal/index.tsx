import { ThemeType } from "@/app/types/appearance";
import { Colors } from "@/constants/Colors";
import { Modal, StyleSheet, Text, View } from "react-native";
import CustomButton from "../CustomButton";
import TextButton from "../TextButton";

const ConfirmActionModal: React.FC<{ isVisible: boolean; theme: ThemeType, confirmationMessage: string; onConfirm: () => void; onCancel: () => void; }> = (
    { isVisible, theme, confirmationMessage, onConfirm, onCancel }
) => {

    return (
        <Modal visible={isVisible} animationType="fade" transparent>
            <View style={[styles.modalOverlay, { backgroundColor: Colors[theme].overlay }]}>
                <View style={[styles.modalContent, {backgroundColor: Colors[theme].background, }]}>
                    <Text style={{ color: Colors[theme].primary, fontSize: 16, textAlign: 'center', fontWeight: 'bold' }}>
                        {confirmationMessage}
                    </Text>
                    <CustomButton theme={theme} text={'Confirmar'} onPress={onConfirm} />
                    <TextButton theme={theme} text={'Cancelar'} onPress={onCancel} />
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