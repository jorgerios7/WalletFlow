import { auth, db } from "@/app/config/firebaseConfig";
import {
    EmailAuthProvider,
    reauthenticateWithCredential,
    sendEmailVerification,
    updateEmail,
    updatePassword,
    updateProfile
} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, View } from "react-native";

import CustomButton from "./CustomButton";
import DynamicLabelInput from "./DynamicLabelInput";
import TextButton from "./TextButton";

export enum Function {
    ChangeName = 1,
    ChangeEmail = 2,
    ChangePassword = 3,
}

interface PersonalDataChangeProps {
    isVisible: boolean;
    onCancel: () => void;
    editField: Function;
}

const PersonalDataChange: React.FC<PersonalDataChangeProps> = ({
    isVisible,
    onCancel,
    editField,
}) => {
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");
    const [input3, setInput3] = useState("");

    const clearInputs = () => {
        setInput1("");
        setInput2("");
        setInput3("");
    };

    const handleConfirm = async () => {
        const user = auth.currentUser;
        if (!user) return;

        try {
           
            const credential = EmailAuthProvider.credential(
                user.email || input1,
                input3 
            );

            if (editField === Function.ChangeEmail || editField === Function.ChangePassword) {
                await reauthenticateWithCredential(user, credential);
            }

            if (editField === Function.ChangeName) {
                if (input1.trim().length < 2 || input2.trim().length < 2) {
                    Alert.alert("Erro", "Nome e sobrenome devem ter ao menos 2 letras.");
                    return;
                }

                await updateProfile(user, { displayName: input1.trim() });

                await updateDoc(doc(db, "users", user.uid), {
                    "identification.name": input1.trim(),
                    "identification.surname": input2.trim(),
                });

                Alert.alert("Sucesso", "Nome atualizado.");
            }

            if (editField === Function.ChangeEmail) {
                if (!input2.includes("@")) {
                    Alert.alert("Erro", "Informe um email válido.");
                    return;
                }

                await updateEmail(user, input2.trim());

                await updateDoc(doc(db, "users", user.uid), {
                    "identification.email": input2.trim(),
                });

                await sendEmailVerification(user); // ✅ Envia verificação
                Alert.alert("Sucesso", "Email atualizado. Verifique sua caixa de entrada.");
            }

            if (editField === Function.ChangePassword) {
                if (input2.length < 6) {
                    Alert.alert("Erro", "A nova senha deve ter pelo menos 6 caracteres.");
                    return;
                }

                if (input2 !== input3) {
                    Alert.alert("Erro", "As senhas não coincidem.");
                    return;
                }

                await updatePassword(user, input2);
                Alert.alert("Sucesso", "Senha atualizada.");
            }

            clearInputs();
            onCancel();
        } catch (error: any) {
            console.log("Erro:", error.code);
            if (error.code === "auth/wrong-password") {
                Alert.alert("Erro", "Senha atual incorreta.");
            } else if (error.code === "auth/requires-recent-login") {
                Alert.alert("Reautenticação necessária", "Por favor, faça login novamente para continuar.");
            } else if (error.code === "auth/email-already-in-use") {
                Alert.alert("Erro", "Este email já está em uso.");
            } else {
                Alert.alert("Erro", error.message || "Falha ao atualizar os dados.");
            }
        }
    };

    return (
        <Modal visible={isVisible} animationType="fade" transparent>
            <View style={styles.overlay}>
                <View style={styles.content}>
                    <Text style={styles.title}>
                        {editField === Function.ChangeName && "Editar nome"}
                        {editField === Function.ChangeEmail && "Alterar email"}
                        {editField === Function.ChangePassword && "Mudar senha"}
                    </Text>

                    {editField === Function.ChangeName && (
                        <>
                            <DynamicLabelInput
                                label="Seu novo nome"
                                onTextChange={setInput1}
                            />

                            <DynamicLabelInput
                                label="Seu novo sobrenome"
                                onTextChange={setInput2}
                            />

                        </>

                    )}

                    {editField === Function.ChangeEmail && (
                        <>
                            <DynamicLabelInput
                                label="Seu email atual"
                                onTextChange={setInput1}
                            />

                            <DynamicLabelInput
                                label="Seu novo email"
                                onTextChange={setInput2}
                            />

                            <DynamicLabelInput
                                label="Sua senha"
                                secureTextEntry
                                onTextChange={setInput3}
                            />

                        </>
                    )}

                    {editField === Function.ChangePassword && (
                        <>
                            <DynamicLabelInput
                                secureTextEntry
                                label="Sua senha atual"
                                onTextChange={setInput1}
                            />

                            <DynamicLabelInput
                                secureTextEntry
                                label="Sua nova senha"
                                onTextChange={setInput2}
                            />
                            <DynamicLabelInput
                                secureTextEntry
                                label="Repita sua nova senha"
                                onTextChange={setInput3}
                            />
                        </>
                    )}

                    <CustomButton text="Confirmar" onPress={handleConfirm} />
                    <TextButton text="Cancelar" onPress={() => {
                        clearInputs();
                        onCancel();
                    }} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "#00000088",
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        width: "90%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 12,
        gap: 20,
        elevation: 4,
    },
    title: {
        color: "black",
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
    },
});

export default PersonalDataChange;
