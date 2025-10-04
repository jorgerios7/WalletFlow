import { Modal, StyleSheet, Text, View } from "react-native";
import CustomButton from "./CustomButton";
import TextButton from "./TextButton";

const ConfirmationScreen: React.FC<{
    isVisible: boolean;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;

}> = ({ isVisible, message, onConfirm, onCancel }) => {

    return (
        <Modal visible={isVisible} animationType="fade">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={{ color: 'black', fontSize: 16, textAlign: 'center', fontWeight: 'bold' }}>
                        {message}
                    </Text>
                    <CustomButton text={'Confirmar'} onPress={onConfirm} />
                    <TextButton text={'Cancelar'} onPress={onCancel} />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '100%',
        backgroundColor: 'white',
        padding: 20,
        gap: 20
    },
});

export default ConfirmationScreen;