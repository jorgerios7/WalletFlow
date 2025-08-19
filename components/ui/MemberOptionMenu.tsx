import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import CustomButton from "./CustomButton";
import RadioButton from "./RadioButton";
import TextButton from "./TextButton";

export function MemberOptionMenu({
    isStarted,
    onConfirm,
    onCancel,
    selectedItem,
    currentUid,
    role,
    condition
}: {
    isStarted: boolean;
    onConfirm: (action: { member: string, promote: boolean, demote: boolean, delete: boolean }) => void;
    onCancel: () => void;
    currentUid: string;
    role: string;
    selectedItem: { id: string, name: string, role: string };
    condition: string;
}) {

    useEffect(() => {
        if (isStarted) {
            handleText();
        } else {
            setVariables((prev) => ({
                member: { ...prev.member, id: "" },
                promote: { ...prev.promote, value: false },
                demote: { ...prev.demote, value: false },
                delete: { ...prev.delete, value: false },
            }))
        }
    }, [isStarted]);

    function handleText() {
        const promoteMemberText = "Promover a administrador";
        const demoteMemberText = currentUid === selectedItem.id
            ? "Despromover-me de administrador"
            : "Despromover de administrador";
        const deleteMemberText = currentUid === selectedItem.id
            ? "Sair do grupo"
            : "Remover membro do grupo";

        setVariables(prev => ({
            member: { ...prev.member, id: "" },
            promote: { ...prev.promote, text: promoteMemberText, value: false },
            demote: { ...prev.demote, text: demoteMemberText, value: false },
            delete: { ...prev.delete, text: deleteMemberText, value: false },
        }));
    }

    const [variables, setVariables] = useState(
        {
            member: { id: '' },
            promote: { label: 'promote', text: '', value: false },
            demote: { label: 'demote', text: '', value: false },
            delete: { label: 'delete', text: '', value: false },
        }
    );

    return (
        <Modal visible={isStarted} animationType="fade" transparent>
            <View style={styles.overlay}>
                <View style={styles.content}>
                    {role !== condition ? (
                        <Text style={{ alignSelf: 'center' }}>
                            Você ainda não tem permissões para administrar outros membros!
                        </Text>
                    ) : (
                        <>
                            <Text style={styles.title}>
                                {selectedItem.name}
                            </Text>
                            <RadioButton
                                options={[
                                    {
                                        label:
                                            selectedItem.role === condition 
                                            ? (variables.demote.text)
                                            : (variables.promote.text),
                                        value:
                                            selectedItem.role === condition 
                                            ? (variables.demote.label)
                                            : (variables.promote.label)
                                    },
                                    {
                                        label: variables.delete.text,
                                        value: variables.delete.label
                                    },
                                ]}
                                onSelecting={(option) => {
                                    setVariables((prev) => ({
                                        member: { ...prev.member, id: selectedItem.id },
                                        promote: { ...prev.promote, value: option === variables.promote.label },
                                        demote: { ...prev.demote, value: option === variables.demote.label },
                                        delete: { ...prev.delete, value: option === variables.delete.label },
                                    }));
                                }}
                            />
                            {(variables.delete.value || variables.promote.value || variables.demote.value) && (
                                <CustomButton
                                    text="Confirmar"
                                    onPress={() => {
                                        onConfirm({
                                            member: variables.member.id,
                                            promote: variables.promote.value,
                                            demote: variables.demote.value,
                                            delete: variables.delete.value,
                                        });

                                        onCancel();
                                    }}
                                />
                            )}
                        </>
                    )}
                    <TextButton
                        text={(variables.delete.value || variables.promote.value || variables.demote.value) 
                            ? ('Cancelar')
                            : ('Voltar')
                        }
                        onPress={() => onCancel()}
                    />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: "bold",
        alignSelf: "center",
    },
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
})