import { Colors } from "@/constants/Colors";
import { Modal, StyleSheet, Text, View } from "react-native";
import CustomButton from "../CustomButton";
import TextButton from "../TextButton";

const ConfirmActionModal: React.FC<{ isVisible: boolean; confirmationMessage: string; onConfirm: () => void; onCancel: () => void; }> = (
    { isVisible, confirmationMessage, onConfirm, onCancel }
) => {

    return (
        <Modal visible={isVisible} animationType="fade" transparent>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={{ color: 'black', fontSize: 16, textAlign: 'center', fontWeight: 'bold' }}>
                        {confirmationMessage}
                    </Text>
                    <CustomButton text={'Confirmar'} onPress={onConfirm} />
                    <TextButton text={'Cancelar'} onPress={onCancel} />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: { flex: 1, backgroundColor: Colors.light.overlay, justifyContent: 'center', alignItems: 'center', },
    modalContent: { width: '90%', borderRadius: 10, backgroundColor: Colors.light.background, padding: 20, gap: 20 }
});

export default ConfirmActionModal;