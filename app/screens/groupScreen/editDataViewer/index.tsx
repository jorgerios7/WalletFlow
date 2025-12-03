import { ThemeType } from "@/app/types/appearance";
import CustomButton from "@/components/ui/CustomButton";
import DynamicLabelInput from "@/components/ui/DynamicLabelInput";
import TextButton from "@/components/ui/TextButton";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { Alert, Modal, StyleSheet, Text, View } from "react-native";

export function EditDataViewer(
    { isVisible, theme, currentName, onSelected, onDismiss }:
        { isVisible: boolean, theme: ThemeType, currentName: string, onSelected: (newName: string) => void, onDismiss: () => void }) {

    if (!isVisible) return null

    const [label, setLabel] = useState("Nome");
    const [name, setName] = useState(currentName);

    function handleNewName(name: string) {
        if (name !== currentName) setLabel("Novo nome");
        setName(name);
    }

    function handleValidateName() {
        switch (name) {
            case "":
                return `O campo ${label} não pode estar vazio!`
            case currentName:
                return `O campo Novo nome não pode ser igual ao nome atual!`
            default:
                return "validate";
        }
    }

    function handleAction() {
        const message = handleValidateName();
        if (message !== "validate") {
            Alert.alert('Atenção!', message);
        } else {
            onSelected(name);
        }
    }

    return (
        <Modal visible={isVisible} transparent>
            <View style={[styles.overlay, { backgroundColor: Colors[theme].overlay, }]}>
                <View style={styles.content}>
                    <Text style={styles.title}>Editar nome do Grupo</Text>
                    <DynamicLabelInput
                    theme={theme}
                        initialText={name}
                        label={label}
                        onTextChange={handleNewName}
                    />
                    <CustomButton text={"Confirmar"} theme={theme} onPress={handleAction} />
                    <TextButton text={"Cancelar"} theme={theme} onPress={onDismiss} />

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
    text: {
        fontSize: 16, textAlign: 'justify'
    },
    overlay: {
        flex: 1,
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