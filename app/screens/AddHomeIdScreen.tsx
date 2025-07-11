import DynamicLabelInput from "@/components/ui/DynamicLabelInput";
import TextButton from "@/components/ui/TextButton";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
    shouldRender: boolean;
    values: { Id_Home: string, HouseName: string };
    onChange: (field: keyof Props["values"], value: string) => void;
    onReturn?: () => void;
}

const AddHomeIdScreen: React.FC<Props> = ({
    shouldRender = true,
    values,
    onChange,
    onReturn
}) => {
    if (!shouldRender) return null;

    const [isQuestionScreen, setIsQuestionScreen] = useState(true);
    const [isCreateHome, setCreateHome] = useState(false);

    return (
        isQuestionScreen ?
            (
                <View>
                    <Text style={{ alignSelf: 'center', color: Colors.light.background, fontSize: 20, fontWeight: 'bold' }}>
                        Possui um ID_Home?
                    </Text>
                    <View style={{ marginVertical: 80, alignSelf: 'center', flexDirection: 'column' }}>

                        <TextButton
                            text={'Sim! possuo um ID_Home'}
                            adjustPaddingBottom={16}
                            onPress={() => {
                                setIsQuestionScreen(false)
                                setCreateHome(false);
                            }}
                        />

                        <TextButton
                            text={'Não! quero criar um ID_Home!'}
                            adjustPaddingBottom={16}
                            onPress={() => {
                                setIsQuestionScreen(false)
                                setCreateHome(true);
                            }}
                        />

                    </View>

                    <TextButton
                        text={'Voltar'}
                        adjustPaddingBottom={16}
                        onPress={() => {
                            setIsQuestionScreen(true);
                            onReturn?.();
                        }}
                    />

                </View>
            ) : (
                isCreateHome ?
                    (
                        <View>

                            <Text style={styles.title}> Criar ID_Home </Text>

                            <DynamicLabelInput
                                label="Nome da Casa"
                                value={values.HouseName}
                                onTextChange={(text) => onChange("HouseName", text)}
                            />

                            <TextButton
                                text={'Voltar'}
                                adjustPaddingBottom={16}
                                onPress={() => {
                                    setIsQuestionScreen(true);
                                }}
                            />
                        </View>
                    ) : (
                        <View>

                            <Text style={styles.title}> Adicionar ID_Home </Text>

                            <DynamicLabelInput
                                label="ID_Home"
                                value={values.Id_Home}
                                onTextChange={(text) => onChange("Id_Home", text)}
                            />

                            <TextButton
                                text={'Voltar'}
                                adjustPaddingBottom={16}
                                onPress={() => {
                                    setIsQuestionScreen(true);
                                }}
                            />
                        </View>
                    )
            )
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