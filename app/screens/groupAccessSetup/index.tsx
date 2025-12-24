import { db } from "@/app/config/firebaseConfig";
import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { Action } from "@/app/types/Group";
import CustomButton from "@/components/ui/CustomButton";
import DynamicLabelInput from "@/components/ui/DynamicLabelInput";
import TextButton from "@/components/ui/TextButton";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { doc, getDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { Text, View } from "react-native";
import { Snackbar } from "react-native-paper";
import IdAccessLink from "./IdAccessLink";
import { styles } from "./styles";

interface Props {
    onReady: (x: { action: Action, values: { id: string, name: string } }) => void,
    onDismiss: () => void
};

const GroupAccessSetup: React.FC<Props> = ({ onReady, onDismiss }) => {
    const { preferences } = useContext(PreferencesContext);

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
        <View style={{ flex: 1, padding: 10, backgroundColor: Colors[preferences.theme.appearance].background, }}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text
                    style={[styles.title, {
                        color: Colors[preferences.theme.appearance].textPrimary,
                        fontSize: Typography[preferences.fontSizeType].lg.fontSize
                    }]}
                >
                    Configurar grupo
                </Text>
                {isCreateGroup ? (
                    <View style={styles.content}>
                        <DynamicLabelInput
                            label="Nome do novo grupo"
                            colorLabel={Colors[preferences.theme.appearance].background}
                            onTextChange={(text) => setGroupData({ id: "", name: text })}
                        />

                        <CustomButton
                            text={'Continuar'}
                            onPress={handleAction}
                        />

                        <IdAccessLink
                            onPress={() => setIsCreateGroup(false)}
                        />

                        <TextButton
                            text={'Sair'}
                            adjustPadding={10}
                            onPress={onDismiss}
                        />
                    </View>
                ) : (
                    <View style={styles.content}>
                        <DynamicLabelInput
                            label="ID do grupo"
                            colorLabel={Colors[preferences.theme.appearance].background}
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
                )}
            </View>

            <Snackbar
                visible={error.visible}
                onDismiss={() => setError({ visible: false, message: "" })}
                style={{ backgroundColor: Colors[preferences.theme.appearance].accent }}
                action={{ label: "Fechar", onPress: () => setError({ visible: false, message: "" }) }}
            >
                {error.message}
            </Snackbar>
        </View>
    );
}

export default GroupAccessSetup;