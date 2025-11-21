import { Delete } from "@/app/types/Group";
import CustomButton from "@/components/ui/CustomButton";
import RadioButton from "@/components/ui/RadioButton";
import TextButton from "@/components/ui/TextButton";
import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

export function MemberOptionMenu({ isStarted, selectedItem, currentUid, role, onConfirm, onCancel }: {
    isStarted: boolean; currentUid: string; role: string; selectedItem: { id: string, name: string, role: string };
    onConfirm: (action: { member: string, promote: boolean, demote: boolean, delete: { who: Delete, value: boolean } }) => void;
    onCancel: () => void;
}) {

    const CONDITION = "owner";

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

                    <Text style={styles.title}>{selectedItem.name}</Text>
                    
                    <View style={{ paddingVertical: 40 }}>
                        {role !== CONDITION ? (
                            <>
                                {currentUid === selectedItem.id ? (
                                    <>
                                        <RadioButton
                                            initialValue={''}
                                            options={[
                                                {
                                                    label: variables.delete.text,
                                                    value: variables.delete.label
                                                },
                                            ]}
                                            onSelecting={(option) => {
                                                setVariables((prev) => ({
                                                    ...prev,
                                                    member: { ...prev.member, id: selectedItem.id },
                                                    promote: { ...prev.promote, value: option === variables.promote.label },
                                                    demote: { ...prev.demote, value: option === variables.demote.label },
                                                    delete: { ...prev.delete, value: option === variables.delete.label },
                                                }));
                                            }}
                                        />
                                    </>
                                ) : (
                                    <Text style={styles.text}>
                                        Você ainda não possui permissão para administrar outros membros!
                                    </Text>
                                )}
                            </>
                        ) : (
                            <>
                                <RadioButton
                                    initialValue={''}
                                    options={[
                                        {
                                            label:
                                                selectedItem.role === CONDITION
                                                    ? (variables.demote.text)
                                                    : (variables.promote.text),
                                            value:
                                                selectedItem.role === CONDITION
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

                            </>
                        )}
                    </View>
                    {(variables.delete.value || variables.promote.value || variables.demote.value) && (
                        <CustomButton
                            text="Confirmar"
                            onPress={() => {
                                onConfirm({
                                    member: variables.member.id,
                                    promote: variables.promote.value,
                                    demote: variables.demote.value,
                                    delete: {
                                        who: currentUid === selectedItem.id
                                            ? "deleteMyself"
                                            : "deleteMember",
                                        value: variables.delete.value
                                    }
                                });

                                onCancel();
                            }}
                        />
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
        </Modal >
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: "bold",
        alignSelf: "center",
    },
    text: {
        fontSize: 16, textAlign: 'justify'
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
        gap: 10,
        elevation: 4,
    },
})