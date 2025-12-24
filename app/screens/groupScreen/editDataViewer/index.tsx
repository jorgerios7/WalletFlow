import { PreferencesContext } from "@/app/context/PreferencesProvider";
import CustomButton from "@/components/ui/CustomButton";
import DynamicLabelInput from "@/components/ui/DynamicLabelInput";
import TextButton from "@/components/ui/TextButton";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { useContext, useState } from "react";
import { Alert, Modal, Text, View } from "react-native";
import { styles } from "./styles";

export function EditDataViewer(
    { isVisible, currentName, onSelected, onDismiss }:
        { isVisible: boolean, currentName: string, onSelected: (newName: string) => void, onDismiss: () => void }) {

    if (!isVisible) return null;

    const { preferences } = useContext(PreferencesContext);

    const [label, setLabel] = useState("Nome");
    const [name, setName] = useState(currentName);

    function handleNewName(name: string) {
        if (name !== currentName) setLabel("Novo nome");
        setName(name);
    };

    function handleValidateName() {
        switch (name) {
            case "":
                return `O campo ${label} não pode estar vazio!`
            case currentName:
                return `O campo Novo nome não pode ser igual ao nome atual!`
            default:
                return "validate";
        }
    };

    function handleAction() {
        const message = handleValidateName();
        if (message !== "validate") {
            Alert.alert('Atenção!', message);
        } else {
            onSelected(name);
        }
    };

    return (
        <Modal visible={isVisible} transparent>
            <View
                style={[
                    styles.overlay,
                    { backgroundColor: Colors[preferences.theme.appearance].overlay }]}>
                <View
                    style={[styles.content, {
                        backgroundColor: Colors[preferences.theme.appearance].surface
                    }]}
                >
                    <Text style={[styles.title, {
                        color: Colors[preferences.theme.appearance].textPrimary,
                        fontSize: Typography[preferences.fontSizeType].md.fontSize,
                        lineHeight: Typography[preferences.fontSizeType].md.lineHeight
                    }]}
                    >
                        Editar nome do grupo
                    </Text>
                    <DynamicLabelInput
                        initialText={name}
                        label={label}
                        onTextChange={handleNewName}
                    />
                    <CustomButton text={"Confirmar"} onPress={handleAction} />
                    <TextButton text={"Cancelar"} onPress={onDismiss} />
                </View>
            </View>
        </Modal>
    );
}