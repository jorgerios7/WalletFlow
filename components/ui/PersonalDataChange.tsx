import { auth } from "@/app/config/firebaseConfig";
import { UpdateEmail, UpdateName, UpdatePassword } from "@/app/services/firebase/UserService";
import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import CustomButton from "./CustomButton";
import DynamicLabelInput from "./DynamicLabelInput";
import TextButton from "./TextButton";

export enum Function {
    ChangeName = 1,
    ChangeEmail = 2,
    ChangePassword = 3,
}

interface PersonalDataChangeProps {
    groupId: string;
    isVisible: boolean;
    onCancel: () => void;
    editField: Function;
}

const PersonalDataChange: React.FC<PersonalDataChangeProps> = ({
    groupId,
    isVisible,
    onCancel,
    editField,
}) => {
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");
    const [input3, setInput3] = useState("");

    useEffect(() => {
        if (!isVisible) {
            setInput1("");
            setInput2("");
            setInput3("");
        }
    }, [isVisible]);


    const handleConfirm = async () => {
        const user = auth.currentUser;
        if (!user) return;

        let success = false;

        try {
            if (editField === Function.ChangeName) {
                await UpdateName(groupId, input1, input2);
            } else if (editField === Function.ChangeEmail) {
                await UpdateEmail(input3, input1, input2);
            } else if (editField === Function.ChangePassword) {
                await UpdatePassword(input1, input2, input3);
            }

           success = true;
        } 
        catch (error: any) {
            console.error('(PersonaDataChange.tsx) Erro ao atualizar campo: ', error)
        } finally {
            if (success) onCancel();
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
                                label="Seu novo email"
                                onTextChange={setInput1}
                            />

                            <DynamicLabelInput
                                label="Repita seu novo email"
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
                    <TextButton text="Cancelar" onPress={onCancel} />
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
