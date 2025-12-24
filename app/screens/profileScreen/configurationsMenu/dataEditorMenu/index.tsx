import { PersonalDataChange } from "@/app/types/User";
import { StyleSheet, View } from "react-native";
import ButtonTab from "./ButtonTab";

export default function DataEditorMenu({ onSelect }: { onSelect: (field: PersonalDataChange) => void }) {
    return (
        <View
            style={styles.container}
        >
            <ButtonTab
                text="Editar Nome"
                iconName="arrow-right"
                iconSize={24}
                onPress={() => onSelect('name')}
                borderBottomColor="transparent"
            />

            <ButtonTab
                text="Alterar Email"
                iconName="arrow-right"
                iconSize={24}
                onPress={() => onSelect('email')}
                borderBottomColor="transparent"
            />

            <ButtonTab
                text="Mudar Senha"
                iconName="arrow-right"
                iconSize={24}
                onPress={() => onSelect('password')}
                borderBottomColor="transparent"
            />

            <ButtonTab
                onPress={() => onSelect('exit-app')}
                text="Sair"
                iconName="exit-to-app"
                borderBottomColor="transparent"
            />

            <ButtonTab
                onPress={() => onSelect('deleteAccount')}
                text="Excluir conta"
                borderBottomColor="transparent"
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        gap: 10
    }
});