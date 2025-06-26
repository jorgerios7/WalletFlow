import RouteAddress from "@/components/RouteAdress";
import BoxInputs from "@/components/ui/BoxInputs";
import CustomButton from "@/components/ui/CustomButton";
import DynamicLabelInput from "@/components/ui/DynamicLabelInput";
import Header from "@/components/ui/Header";
import HomeScreenContainer from "@/components/ui/HomeScreenContainer";
import TextButton from "@/components/ui/TextButton";
import WordMark from "@/components/ui/WordMark";
import ValidateEmptyFields from "@/components/ValidateEmptyFields";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Provider as PaperProvider, Snackbar } from "react-native-paper";

export default function Login() {
    const router = useRouter();

    const [inputValue, setInputValue] = useState({
        Email: "",
        Password: "",
    });

    const formLabels = {
        Email: "Email",
        Password: "Senha",
    };

    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [msg, setMsg] = useState("");

    const handlePress = () => {
        const validationMsg = ValidateEmptyFields(inputValue, formLabels);

        if (validationMsg) {
            setMsg(validationMsg);
            setSnackbarVisible(true);
            return;
        }

        router.push(RouteAddress.Home);
    };

    return (
        <PaperProvider>
            <HomeScreenContainer>
                <Header>
                    <WordMark text1="Home" text2="Class" />
                    <TextButton address={RouteAddress.Signup} text="Cadastre-se" adjustPaddingBottom={15} />
                </Header>
                <BoxInputs>
                    <DynamicLabelInput
                        label="Email"
                        onTextChange={(text) => setInputValue((prev) => ({ ...prev, Email: text }))}
                    />
                    <DynamicLabelInput
                        label="Senha"
                        secureTextEntry
                        onTextChange={(text) => setInputValue((prev) => ({ ...prev, Password: text }))}
                    />
                    <CustomButton text="Entrar" onPress={handlePress} />
                </BoxInputs>
                <Snackbar
                    visible={snackbarVisible}
                    onDismiss={() => setSnackbarVisible(false)}
                    style={{ backgroundColor: Colors.light.tint }}
                    action={{
                        label: "Fechar",
                        onPress: () => setSnackbarVisible(false),
                    }}>
                    {msg}
                </Snackbar>
            </HomeScreenContainer>
        </PaperProvider>
    );
}
