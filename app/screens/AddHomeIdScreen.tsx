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
    values: { Id_Home: string, Name: string };
    whenIsReady: (values: Partial<Props["values"]>) => void;
    isCreateNewHome: (action: boolean) => void
    onPressingReturnButton: () => void;
    errorMessage: (message: string) => void;
}

const AddHomeIdScreen: React.FC<Props> = ({
    shouldRender = true,
    values,
    whenIsReady,
    isCreateNewHome,
    onPressingReturnButton,
    errorMessage
}) => {
    if (!shouldRender) return null;

    const [isQuestionScreen, setIsQuestionScreen] = useState(true);
    const [isCreateHome, setCreateHome] = useState(false);
    const [data, setData] = useState({ id: '', name: '' })

    const handleFieldCheck = (field: string) => {
        if (!field) {

            errorMessage?.("Opa! Preencha o campo")
            return;
        }
    }

    const handleCheckingIdExistence = async () => {
        const homeId = data.id.trim();

        handleFieldCheck(homeId);

        try {
            const docRef = doc(db, "publicHomes", homeId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {

                whenIsReady({ Id_Home: homeId, Name: '' });
            } else {
                homeId

                errorMessage?.("ID não encontrado. ")
            }
        } catch (error) {
            console.log('error: ', error);
            errorMessage?.("Algo deu errado na busca");
        }
    };

    const handleCreateId = () => {
        const name = data.name.trim();

        handleFieldCheck(name);

        whenIsReady({ Id_Home: '', Name: data.name });
    };

    return (
        <BoxInputs>
            {
                isQuestionScreen ? (
                    <View>
                        <Text style={{ alignSelf: 'center', color: Colors.light.background, fontSize: 20, fontWeight: 'bold' }}>
                            Já tem um ID da casa?
                        </Text>
                        <View style={{ marginVertical: 80, alignSelf: 'center', flexDirection: 'column' }}>
                            <TextButton
                                text={'Sim, já tenho'}
                                adjustPaddingBottom={16}
                                onPress={() => {
                                    setIsQuestionScreen(false)
                                    setCreateHome(false);
                                    isCreateNewHome(false);
                                }}
                            />

                            <TextButton
                                text={'Não, quero criar um'}
                                adjustPaddingBottom={16}
                                onPress={() => {
                                    setIsQuestionScreen(false)
                                    setCreateHome(true);
                                    isCreateNewHome(true);
                                }}
                            />
                        </View>

                        <TextButton
                            text={'Sair'}
                            adjustPaddingBottom={16}
                            onPress={() => {
                                onPressingReturnButton?.();
                                isCreateNewHome(true);
                                setData({ id: '', name: '' });
                            }}
                        />
                    </View>
                ) : (
                    isCreateHome ? (
                        <View>
                            <Text style={styles.title}> Criar nova casa </Text>

                            <DynamicLabelInput
                                label="Nome da casa"
                                value={values.Name}
                                onTextChange={(text) => setData({ id: '', name: text })}
                            />

                            <CustomButton
                                text={'Continuar'}
                                onPress={handleCreateId}
                            />

                            <TextButton
                                text={'Voltar'}
                                adjustPaddingBottom={16}
                                onPress={() => {
                                    setIsQuestionScreen(true);
                                    isCreateNewHome(true);
                                    setData({ id: '', name: '' })
                                }}
                            />
                        </View>
                    ) : (
                        <View>
                            <Text style={styles.title}> Adicionar ID_Home </Text>

                            <DynamicLabelInput
                                label="ID da casa"
                                value={values.Id_Home}
                                onTextChange={(text) => setData({ id: text, name: '' })}
                            />

                            <CustomButton
                                text={'Continuar'}
                                onPress={handleCheckingIdExistence}
                            />

                            <TextButton
                                text={'Voltar'}
                                adjustPaddingBottom={16}
                                onPress={() => {
                                    setIsQuestionScreen(true);
                                    isCreateNewHome(true);
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
        color: Colors.light.background,
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
        padding: 20
    }
});

export default AddHomeIdScreen;