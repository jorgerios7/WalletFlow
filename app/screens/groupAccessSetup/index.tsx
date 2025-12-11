import { db } from "@/app/config/firebaseConfig";
import { Action } from "@/app/types/Group";
import { ThemeContext } from "@/components/ThemeProvider";
import CustomButton from "@/components/ui/CustomButton";
import DynamicLabelInput from "@/components/ui/DynamicLabelInput";
import TextButton from "@/components/ui/TextButton";
import { Colors } from "@/constants/Colors";
import { doc, getDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Snackbar } from "react-native-paper";

interface Props {
    isVisible: boolean, onReady: (x: { action: Action, values: { id: string, name: string } }) => void, onPressingReturnButton: () => void
};

const GroupAccessSetup: React.FC<Props> = ({ isVisible, onReady, onPressingReturnButton }) => {
    if (!isVisible) return null;

    const { theme } = useContext(ThemeContext);

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
            setError({ visible: true, message: "Algo deu errado!" });
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
        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: Colors[theme.appearance].background, flex: 1, height: "100%", justifyContent: "center", alignItems: "center" }}>

                <Text style={[styles.title, { color: Colors[theme.appearance].textPrimary, }]}>Configurar grupo</Text>

                {
                    isCreateGroup ? (
                        <View style={{ width: "90%", gap: 10 }}>


                            <View style={styles.container}>
                                <View style={{ gap: 10 }}>
                                    <DynamicLabelInput label="Nome do grupo" colorLabel={Colors[theme.appearance].background} onTextChange={(text) => setGroupData({ id: "", name: text })} />
                                    <CustomButton text={'Continuar'} onPress={handleAction} />
                                </View>

                                <View style={{ padding: 10, flexDirection: 'row', backgroundColor: 'transparent', justifyContent: 'center' }}>
                                    <Text style={[styles.text, { color: Colors[theme.appearance].textPrimary, }]}>Se possui um ID </Text>

                                    <Pressable onPress={() => setIsCreateGroup(false)}>
                                        <Text style={{ color: Colors[theme.appearance].accent, fontWeight: 'bold', fontSize: 16 }}>clique aqui</Text>
                                    </Pressable>
                                </View>

                                <TextButton
                                    text={'Sair'}
                                    adjustPadding={10}
                                    onPress={() => onPressingReturnButton?.()}
                                />
                            </View>
                        </View>
                    ) : (
                        <View style={{ width: "90%", gap: 10 }}>
                            <DynamicLabelInput
                                label="ID do grupo"
                                colorLabel={Colors[theme.appearance].background}
                                onTextChange={(text) => setGroupData({ id: text, name: '' })}
                            />

                            <CustomButton
                                text={'Continuar'}
                                onPress={handleAction}
                            />

                            <TextButton
                                text={'Voltar'}
                                adjustPadding={10}
                                onPress={() => setIsCreateGroup(true)}
                            />
                        </View>
                    )
                }
            </View>

            <Snackbar
                visible={error.visible}
                onDismiss={() => setError({ visible: false, message: "" })}
                style={{ backgroundColor: Colors[theme.appearance].accent }}
                action={{ label: "Fechar", onPress: () => setError({ visible: false, message: "" }) }}
            >
                {error.message}
            </Snackbar>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        padding: 20
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
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

export default GroupAccessSetup;