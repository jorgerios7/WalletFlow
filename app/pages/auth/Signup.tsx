import RouteAddress from "@/components/RouteAdress";
import BoxInputs from "@/components/ui/BoxInputs";
import CustomButton from "@/components/ui/CustomButton";
import DynamicLabelInput from "@/components/ui/DynamicLabelInput";
import Header from "@/components/ui/Header";
import HomeScreenContainer from "@/components/ui/HomeScreenContainer";
import TextButton from "@/components/ui/TextButton";
import TransitionView from "@/components/ui/TransitionView";
import WordMark from "@/components/ui/WordMark";
import ValidateEmptyFields from "@/components/ValidateEmptyFields";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Provider as PaperProvider, Snackbar } from "react-native-paper";

export default function Signup() {
    const router = useRouter();

    const [inputValue, setInputValue] = useState({
        FirstName: "",
        Surname: "",
        Email: "",
        Password: "",
        PasswordRepeat: "",
    });

    const formLabels = {
        FirstName: "Primeiro nome",
        Surname: "Sobrenome",
        Email: "Email",
        Password: "Senha",
        PasswordRepeat: "Repetir senha",
    };

    const [msg, setMsg] = useState("");
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handlePress = () => {
        const validationMsg = ValidateEmptyFields(inputValue, formLabels);

        if (validationMsg) {
            setMsg(validationMsg);
            setSnackbarVisible(true);
            return;
        }

        if (inputValue.Password !== inputValue.PasswordRepeat) {
            setMsg("Os campos Senha e Repetir senha não coincidem.");
            setSnackbarVisible(true);
            return;
        }

        console.log("inputValue: ", inputValue);

        setIsSuccess(true);
    };

    const handleContinuous = () => {
        router.push(RouteAddress.Login)
    }

    return (
        <PaperProvider>
            <HomeScreenContainer>
                <Header>
                    <WordMark text1="Home" text2="Class" />
                    {!isSuccess && (
                        <TextButton address={RouteAddress.Login} text="Cancelar" adjustPaddingBottom={15} />
                    )}
                </Header>
                <BoxInputs>
                    {!isSuccess && (
                        <>
                            <TransitionView>
                                <DynamicLabelInput
                                    label="Primeiro nome"
                                    onTextChange={(text) => setInputValue((prev) => ({ ...prev, FirstName: text }))}
                                />
                                <DynamicLabelInput
                                    label="Sobrenome"
                                    onTextChange={(text) => setInputValue((prev) => ({ ...prev, Surname: text }))}
                                />
                                <DynamicLabelInput
                                    label="Email"
                                    onTextChange={(text) => setInputValue((prev) => ({ ...prev, Email: text }))}
                                />
                                <DynamicLabelInput
                                    label="Senha"
                                    secureTextEntry
                                    onTextChange={(text) => setInputValue((prev) => ({ ...prev, Password: text }))}
                                />
                                <DynamicLabelInput
                                    label="Repetir senha"
                                    secureTextEntry
                                    onTextChange={(text) => setInputValue((prev) => ({ ...prev, PasswordRepeat: text }))}
                                />
                                <CustomButton text="Criar conta" onPress={handlePress} />
                            </TransitionView>
                        </>
                    )}
                    {isSuccess && (
                        <>
                            <TransitionView>
                                <Text style={styles.onSucessText}>
                                    Conta criada com sucesso!
                                </Text>
                                <Text style={styles.onSucessText}>
                                    Bem-vindo(a) a uma nova experiência. Agora é só fazer login e aproveitar!
                                </Text>
                                <CustomButton text="Ir para o Login" onPress={handleContinuous} />
                            </TransitionView>
                        </>
                    )}
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

const styles = StyleSheet.create({
    onSucessText: {
        marginTop: 40,
        marginBottom: 40,
        textAlign: 'center',
        color: Colors.light.tint,
        fontSize: 14,
        fontWeight: "bold"
    }
})
