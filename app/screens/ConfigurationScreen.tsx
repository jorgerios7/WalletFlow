import CustomButton from "@/components/ui/CustomButton";
import { Text, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
    isVisible?: boolean,
    onNavigate: (locate: string) => void
}

export function ConfigurationScreen({
    onNavigate
}: Props) {
    const insets = useSafeAreaInsets();
    const { width, height } = useWindowDimensions();

    return (
        <View style={{
            width: width,
            height: height,
            padding: 20,
            marginTop: insets.top,
            marginBottom: insets.bottom,
            backgroundColor: 'blue',
            alignItems: 'center'
        }}>
            <Text style={{ alignSelf: 'center' }}>
                Configurações
            </Text>

            <CustomButton text="Sair" onPress={() => onNavigate('Tabs')} />
        </View>
    );
}