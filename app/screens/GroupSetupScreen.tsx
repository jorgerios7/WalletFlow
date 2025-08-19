import BoxInputs from "@/components/ui/BoxInputs";
import CustomButton from "@/components/ui/CustomButton";
import DynamicLabelInput from "@/components/ui/DynamicLabelInput";
import TextButton from "@/components/ui/TextButton";
import { Colors } from "@/constants/Colors";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { db } from "../config/firebaseConfig";

interface Props {
    shouldRender: boolean;
    values: { groupId: string, Name: string };
    whenIsReady: (values: Partial<Props["values"]>) => void;
    isCreateNewGroup: (action: boolean) => void
    onPressingReturnButton: () => void;
    errorMessage: (message: string) => void;
}

const GroupSetupScreen: React.FC<Props> = ({
    shouldRender = true,
    values,
    whenIsReady,
    isCreateNewGroup,
    onPressingReturnButton,
    errorMessage
}) => {
    if (!shouldRender) return null;

    const [isQuestionScreen, setIsQuestionScreen] = useState(true);
    const [isCreateGroup, setCreateGroup] = useState(false);
    const [data, setData] = useState({ id: '', name: '' })

    const handleFieldCheck = (field: string) => {
        if (!field) {

            errorMessage?.("Opa! Preencha o campo")
            return;
        }
    }

    const handleCheckingIdExistence = async () => {
        const groupId = data.id.trim();

        handleFieldCheck(groupId);

        try {
            const docRef = doc(db, "publicGroups", groupId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {

                whenIsReady({ groupId: groupId, Name: '' });
            } else {

                errorMessage?.("ID não encontrado. ")
            }
        } catch (error) {
            console.log('(HomeSetupScreen) error: ', error);
            errorMessage?.("Algo deu errado na busca");
        }
    };

    const handleCreateId = () => {
        const name = data.name.trim();

        handleFieldCheck(name);

        whenIsReady({ groupId: '', Name: data.name });
    };

    return (
        <BoxInputs>
            {
                isQuestionScreen ? (
                    <View>
                        <View style={styles.container}>
                            <Text style={styles.title}>
                                Configurar grupo
                            </Text>

                            <View>

                                <DynamicLabelInput
                                    label="Nome do grupo"
                                    //value={values.Name}
                                    onTextChange={(text) => setData({ id: '', name: text })}
                                />

                                <CustomButton
                                    text={'Continuar'}
                                    onPress={handleCreateId}
                                />
                            </View>

                            <View style={{ padding: 10, flexDirection: 'row', backgroundColor: 'transparent', justifyContent: 'center' }}>
                                <Text style={styles.text}>
                                    Se possui um ID_Home
                                </Text>
                                <TextButton
                                    text={'clique aqui'}
                                    adjustPadding={5}
                                    textColor={Colors.light.tint}
                                    onPress={() => {
                                        setIsQuestionScreen(false)
                                        setCreateGroup(false);
                                        isCreateNewGroup(false);
                                    }}
                                />
                            </View>
                            <TextButton
                                text={'Sair'}
                                adjustPadding={5}
                                adjustMargin={5}
                                onPress={() => {
                                    onPressingReturnButton?.();
                                    isCreateNewGroup(true);
                                    setData({ id: '', name: '' });
                                }}
                            />
                        </View>
                    </View>
                ) : (
                    !isCreateGroup && (
                        <View>
                            <Text style={styles.title}> Configurar grupo </Text>

                            <DynamicLabelInput
                                label="ID do grupo"
                                //value={values.Id_Home}
                                onTextChange={(text) => setData({ id: text, name: '' })}
                            />

                            <CustomButton
                                text={'Continuar'}
                                onPress={handleCheckingIdExistence}
                            />

                            <TextButton
                                text={'Voltar'}
                                adjustMargin={15}
                                adjustPadding={15}
                                onPress={() => {
                                    setIsQuestionScreen(true);
                                    isCreateNewGroup(true);
                                    setData({ id: '', name: '' })
                                }}
                            />
                        </View>
                    )
                )
            }
        </BoxInputs>
    );
}

const styles = StyleSheet.create({
    title: {
        color: Colors.light.highlightBackgroun_1,
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        padding: 20
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.light.highlightBackgroun_1,
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