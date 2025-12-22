import { auth } from "@/app/config/firebaseConfig";
import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { useUser } from "@/app/context/UserProvider";
import { PersonalDataChange } from "@/app/types/User";
import CustomButton from "@/components/ui/CustomButton";
import DynamicLabelInput from "@/components/ui/DynamicLabelInput";
import TextButton from "@/components/ui/TextButton";
import { Colors } from "@/constants/Colors";
import { signOut } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

interface Props { field: PersonalDataChange, isVisible: boolean, onDismiss: (isBackToInitScreen: boolean) => void };

const EditPersonalDataModal: React.FC<Props> = ({ field, isVisible, onDismiss }) => {
    if (!isVisible) return null;

    const { preferences } = useContext(PreferencesContext);

    const { user, updateEmail, updatePassword, updateUserName } = useUser();

    if (!user?.groupId) return null;

    const [input, setInput] = useState({ 1: "", 2: "", 3: "" });

    const handleConfirm = async () => {
        try {
            if (field === 'name') {
                await updateUserName({ groupId: user?.groupId, newName: input[1], newSurname: input[2] });
            } else if (field === 'email') {
                await updateEmail({ newEmail: input[1], repeatNewEmail: input[2], currentPassword: input[3] });
            } else if (field === 'password') {
                await updatePassword({ currentPassword: input[1], newPassword: input[2], repeatNewPassword: input[3] });
            } else if (field === "exit-app") {
                await signOut(auth);
                onDismiss(true);
            } else if (field === "deleteAccount") {
                console.log('(EditPersonalDataModel.tsx) deleteAccount is called!');
                onDismiss(true);
            }
        }
        catch (error: any) {
            console.error('(PersonaDataChange.tsx) Erro ao atualizar campo: ', error)
        }
    };

    return (
        <Modal visible={isVisible} animationType="fade" transparent>
            <View style={[styles.overlay, { backgroundColor: Colors[preferences.theme.appearance].overlay, }]}>
                <View style={[styles.content, { backgroundColor: Colors[preferences.theme.appearance].surface }]}>
                    <Text style={[styles.title, { color: Colors[preferences.theme.appearance].textPrimary, }]}>
                        {field === 'name' && "Editar nome"}
                        {field === 'email' && "Alterar email"}
                        {field === 'password' && "Mudar senha"}
                        {field === "exit-app" && "Sair"}
                        {field === "deleteAccount" && "Excluir conta"}
                    </Text>

                    {field === 'name' && (
                        <>
                            <DynamicLabelInput
                                label="Nome"
                                initialText={user.identification.name}
                                onTextChange={(value) => setInput((prev) => ({ ...prev, 1: value }))}
                            />

                            <DynamicLabelInput
                                label="Sobrenome"
                                initialText={user.identification.surname}
                                onTextChange={(value) => setInput((prev) => ({ ...prev, 2: value }))}
                            />
                        </>
                    )}

                    {field === 'email' && (
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
                                label="Sua senha atual"
                                secureTextEntry
                                onTextChange={(value) => setInput((prev) => ({ ...prev, 3: value }))}
                            />
                        </>
                    )}

                    {field === 'password' && (
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

                    {field === "exit-app" && (
                        <Text style={[styles.text, { color: Colors[preferences.theme.appearance].textSecondary }]}>
                            Deseja realmente sair?
                        </Text>
                    )}

                    {field === "deleteAccount" && (
                        <Text style={[styles.text, { color: Colors[preferences.theme.appearance].textSecondary }]}>
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
    overlay: { flex: 1, justifyContent: "center", alignItems: "center" },
    content: { width: "90%", padding: 20, borderRadius: 12, gap: 20, elevation: 4 },
    title: { fontSize: 16, textAlign: "center", fontWeight: "bold" },
    text: { alignSelf: "center", fontSize: 14 }
});

export default EditPersonalDataModal;
