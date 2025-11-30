import { auth } from "@/app/config/firebaseConfig";
import { UpdateEmail, UpdateName, UpdatePassword } from "@/app/services/firebase/UserService";
import { PersonalDataChange } from "@/app/types/User";
import CustomButton from "@/components/ui/CustomButton";
import DynamicLabelInput from "@/components/ui/DynamicLabelInput";
import TextButton from "@/components/ui/TextButton";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

interface Props { field: PersonalDataChange, groupId: string, isVisible: boolean, onSuccess: () => void, onDismiss: (isBackToInitScreen: boolean) => void };

const EditPersonalDataModal: React.FC<Props> = ({ field, groupId, isVisible, onSuccess, onDismiss }) => {
    if (!isVisible) return null;

    const [input, setInput] = useState({ 1: "", 2: "", 3: "" });

    const handleConfirm = async () => {

        let success = false;

        try {
            if (field === 'Name') {
                await UpdateName(groupId, input[1], input[2]);
            } else if (field === 'Email') {
                await UpdateEmail(input[3], input[1], input[2]);
            } else if (field === 'Password') {
                await UpdatePassword(input[1], input[2], input[3]);
            } else if (field === "Exit-App") {
                await signOut(auth);
                onDismiss(true);
            } else if (field === "DeleteAccount") {
                console.log('(EditPersonalDataModel.tsx) deleteAccount is called!');
                onDismiss(true);
            }

            success = true;
        }
        catch (error: any) {
            console.error('(PersonaDataChange.tsx) Erro ao atualizar campo: ', error)
        } finally {
            if (success) onSuccess();
        }
    };

    return (
        <Modal visible={isVisible} animationType="fade" transparent>
            <View style={styles.overlay}>
                <View style={styles.content}>
                    <Text style={styles.title}>
                        {field === 'Name' && "Editar nome"}
                        {field === 'Email' && "Alterar email"}
                        {field === 'Password' && "Mudar senha"}
                        {field === "Exit-App" && "Sair"}
                        {field === "DeleteAccount" && "Excluir conta"}
                    </Text>

                    {field === 'Name' && (
                        <>
                            <DynamicLabelInput
                                label="Seu novo nome"
                                onTextChange={(value) => setInput((prev) => ({ ...prev, 1: value }))}
                            />

                            <DynamicLabelInput
                                label="Seu novo sobrenome"
                                onTextChange={(value) => setInput((prev) => ({ ...prev, 2: value }))}
                            />
                        </>
                    )}

                    {field === 'Email' && (
                        <>
                            <DynamicLabelInput
                                label="Seu novo email"
                                onTextChange={(value) => setInput((prev) => ({ ...prev, 1: value }))}
                            />

                            <DynamicLabelInput
                                label="Repita seu novo email"
                                onTextChange={(value) => setInput((prev) => ({ ...prev, 2: value }))}
                            />

                            <DynamicLabelInput
                                label="Sua senha"
                                secureTextEntry
                                onTextChange={(value) => setInput((prev) => ({ ...prev, 3: value }))}
                            />
                        </>
                    )}

                    {field === 'Password' && (
                        <>
                            <DynamicLabelInput
                                secureTextEntry
                                label="Sua senha atual"
                                onTextChange={(value) => setInput((prev) => ({ ...prev, 1: value }))}
                            />

                            <DynamicLabelInput
                                secureTextEntry
                                label="Sua nova senha"
                                onTextChange={(value) => setInput((prev) => ({ ...prev, 2: value }))}
                            />

                            <DynamicLabelInput
                                secureTextEntry
                                label="Repita sua nova senha"
                                onTextChange={(value) => setInput((prev) => ({ ...prev, 3: value }))}
                            />
                        </>
                    )}

                    {field === "Exit-App" && (
                        <Text style={styles.text}>
                            Deseja realmente sair?
                        </Text>
                    )}

                    {field === "DeleteAccount" && (
                        <Text style={styles.text}>
                            Deseja realmente excluir sua conta?
                        </Text>
                    )}

                    <CustomButton text="Confirmar" onPress={handleConfirm} />
                    <TextButton text="Cancelar" onPress={() => onDismiss(false)} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: { flex: 1, backgroundColor: "#00000088", justifyContent: "center", alignItems: "center" },
    content: { width: "90%", backgroundColor: "white", padding: 20, borderRadius: 12, gap: 20, elevation: 4 },
    title: { color: "black", fontSize: 16, textAlign: "center", fontWeight: "bold" },
    text: { alignSelf: "center", fontSize: 14 }
});

export default EditPersonalDataModal;
