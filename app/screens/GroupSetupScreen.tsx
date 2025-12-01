import BoxInputs from "@/components/ui/BoxInputs";
import CustomButton from "@/components/ui/CustomButton";
import DynamicLabelInput from "@/components/ui/DynamicLabelInput";
import TextButton from "@/components/ui/TextButton";
import { Colors } from "@/constants/Colors";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Snackbar } from "react-native-paper";
import { db } from "../config/firebaseConfig";
import { Action } from "../types/Group";

interface Props {
    isVisible: boolean, onReady: (x: { action: Action, values: { id: string, name: string } }) => void,
    onPressingReturnButton: () => void
}

const GroupSetupScreen: React.FC<Props> = ({ isVisible, onReady, onPressingReturnButton }) => {
    if (!isVisible) return null;

    const [isCreateGroup, setIsCreateGroup] = useState(true);
    const [groupData, setGroupData] = useState({ id: '', name: '' })
    const [error, setError] = useState({ visible: false, message: "" })

    const handleFieldCheck = (field: string) => {
        if (!field || field === "") {
            setError({ visible: true, message: "Opa! Preencha o campo" });
            return false;
        }
        return true;
    };

    const handleCheckingIdExistence = async (id: string) => {
        try {
            const docRef = doc(db, "publicGroups", id);
            const docSnap = await getDoc(docRef);

            switch (docSnap.exists()) {
                case true:
                    return true;
                case false: {
                    setError({ visible: true, message: "ID não encontrado ou não existe!" })
                    return false
                }
            }
        } catch (error) {
            console.log('(GroupSetupScreen) error: ', error);
            setError({visible: true, message: "Algo deu errado!"});
        }
    };

    const handleAction = async () => {
        switch (isCreateGroup) {
            case true: {
                const name = groupData.name.trim();
                if (!handleFieldCheck(name)) return;

                return onReady({ action: "newGroup", values: { id: "", name } });
            }

            case false: {
                const id = groupData.id.trim();
                if (!handleFieldCheck(id)) return;

                const isValid = await handleCheckingIdExistence(id);
                if (isValid) {
                    return onReady({ action: "addMember", values: { id, name: "" } });
                }
            }
        }
    };


    return (
        <View style={{flex: 1}}>
            <BoxInputs>
                {
                    isCreateGroup ? (
                        <View>
                            <Text style={styles.title}>Configurar grupo</Text>

                            <View style={styles.container}>
                                <View style={{ gap: 10 }}>
                                    <DynamicLabelInput label="Nome do grupo" onTextChange={(text) => setGroupData({ id: '', name: text })} />

                                    <CustomButton text={'Continuar'} onPress={handleAction} />
                                </View>

                                <TextButton
                                    text={'Sair'}
                                    adjustPadding={10}
                                    adjustMargin={5}
                                    onPress={() => onPressingReturnButton?.()}
                                />

                                <View style={{ padding: 10, flexDirection: 'row', backgroundColor: 'transparent', justifyContent: 'center' }}>
                                    <Text style={styles.text}>Se possui um ID </Text>

                                    <Pressable onPress={() => setIsCreateGroup(false)}>
                                        <Text style={{ color: Colors.light.accent, fontWeight: 'bold', fontSize: 16 }}>clique aqui</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    ) : (
                        <View style={{ gap: 10 }}>
                            <DynamicLabelInput
                                label="ID do grupo"
                                onTextChange={(text) => setGroupData({ id: text, name: '' })}
                            />

                            <CustomButton
                                text={'Continuar'}
                                onPress={handleAction}
                            />

                            <TextButton
                                text={'Voltar'}
                                adjustMargin={0}
                                adjustPadding={10}
                                onPress={() => setIsCreateGroup(true)}
                            />
                        </View>
                    )
                }
            </BoxInputs>

            <Snackbar
                visible={error.visible}
                onDismiss={() => setError({ visible: false, message: "" })}
                style={{ backgroundColor: Colors.light.accent }}
                action={{ label: "Fechar", onPress: () => setError({ visible: false, message: "" }) }}
            >
                {error.message}
            </Snackbar>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        color: Colors.light.textPrimary,
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        padding: 20
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.light.textPrimary,
        alignSelf: 'center',
        backgroundColor: 'transparent'
    },
    container: {
        width: '100%',
        gap: 10,
        alignSelf: 'center',
        flexDirection: 'column',
        backgroundColor: 'transparent'
    }
});

export default GroupSetupScreen;