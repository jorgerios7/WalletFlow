import { auth } from "@/app/config/firebaseConfig";
import { UpdateEmail, UpdateName, UpdatePassword } from "@/app/services/firebase/UserService";
import { ThemeType } from "@/app/types/appearance";
import { PersonalDataChange } from "@/app/types/User";
import CustomButton from "@/components/ui/CustomButton";
import DynamicLabelInput from "@/components/ui/DynamicLabelInput";
import TextButton from "@/components/ui/TextButton";
import { Colors } from "@/constants/Colors";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

interface Props { theme: ThemeType,field: PersonalDataChange, groupId: string, isVisible: boolean, onSuccess: () => void, onDismiss: (isBackToInitScreen: boolean) => void };

const EditPersonalDataModal: React.FC<Props> = ({ theme, field, groupId, isVisible, onSuccess, onDismiss }) => {
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
            <View style={[styles.overlay, { backgroundColor: Colors[theme].overlay, }]}>
                <View style={[styles.content, {backgroundColor: Colors[theme].background}]}>
                    <Text style={[styles.title, {color: Colors[theme].textPrimary, }]}>
                        {field === 'Name' && "Editar nome"}
                        {field === 'Email' && "Alterar email"}
                        {field === 'Password' && "Mudar senha"}
                        {field === "Exit-App" && "Sair"}
                        {field === "DeleteAccount" && "Excluir conta"}
                    </Text>

                    {field === 'Name' && (
                        <>
                            <DynamicLabelInput
                            theme={theme}
                                label="Seu novo nome"
                                onTextChange={(value) => setInput((prev) => ({ ...prev, 1: value }))}
                            />

                            <DynamicLabelInput
                            theme={theme}
                                label="Seu novo sobrenome"
                                onTextChange={(value) => setInput((prev) => ({ ...prev, 2: value }))}
                            />
                        </>
                    )}

                    {field === 'Email' && (
                        <>
                            <DynamicLabelInput
                            theme={theme}
                                label="Seu novo email"
                                onTextChange={(value) => setInput((prev) => ({ ...prev, 1: value }))}
                            />

                            <DynamicLabelInput
                            theme={theme}
                                label="Repita seu novo email"
                                onTextChange={(value) => setInput((prev) => ({ ...prev, 2: value }))}
                            />

                            <DynamicLabelInput
                            theme={theme}
                                label="Sua senha"
                                secureTextEntry
                                onTextChange={(value) => setInput((prev) => ({ ...prev, 3: value }))}
                            />
                        </>
                    )}

                    {field === 'Password' && (
                        <>
                            <DynamicLabelInput
                            theme={theme}
                                secureTextEntry
                                label="Sua senha atual"
                                onTextChange={(value) => setInput((prev) => ({ ...prev, 1: value }))}
                            />

                            <DynamicLabelInput
                            theme={theme}
                                secureTextEntry
                                label="Sua nova senha"
                                onTextChange={(value) => setInput((prev) => ({ ...prev, 2: value }))}
                            />

                            <DynamicLabelInput
                            theme={theme}
                                secureTextEntry
                                label="Repita sua nova senha"
                                onTextChange={(value) => setInput((prev) => ({ ...prev, 3: value }))}
                            />
                        </>
                    )}

                    {field === "Exit-App" && (
                        <Text style={[styles.text, {color: Colors[theme].textSecondary}]}>
                            Deseja realmente sair?
                        </Text>
                    )}

                    {field === "DeleteAccount" && (
                        <Text style={[styles.text, {color: Colors[theme].textSecondary}]}>
                            Deseja realmente excluir sua conta?
                        </Text>
                    )}

                    <CustomButton theme={theme} text="Confirmar" onPress={handleConfirm} />
                    <TextButton theme={theme} text="Cancelar" onPress={() => onDismiss(false)} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: { flex: 1, justifyContent: "center", alignItems: "center" },
    content: { width: "90%", padding: 20, borderRadius: 12, gap: 20, elevation: 4 },
    title: { fontSize: 16, textAlign: "center", fontWeight: "bold" },
    text: { alignSelf: "center", fontSize: 14 }
});

export default EditPersonalDataModal;
