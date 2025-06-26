import RouteAddress from "@/components/RouteAdress";
import BoxInputs from "@/components/ui/BoxInputs";
import CustomButton from "@/components/ui/CustomButton";
import DynamicLabelInput from "@/components/ui/DynamicLabelInput";
import HomeScreenContainer from "@/components/ui/HomeScreenContainer";
import TextButton from "@/components/ui/TextButton";
import ValidateEmptyFields from "@/components/ValidateEmptyFields";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider, Snackbar } from "react-native-paper";

export default function Login() {
    const router = useRouter();

    const [loginInputValue, setLoginInputValue] = useState({
        Email: "",
        Password: "",
    });

    const loginFormLabels = {
        Email: "Email",
        Password: "Senha",
    };

    const [signupInputValue, setSignupInputValue] = useState({
        FirstName: "",
        Surname: "",
        Email: "",
        Password: "",
        PasswordRepeat: "",
    });

    const signupFormLabels = {
        FirstName: "Primeiro nome",
        Surname: "Sobrenome",
        Email: "Email",
        Password: "Senha",
        PasswordRepeat: "Repetir senha",
    };

    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [msg, setMsg] = useState("");
    const [isSignup, setFunction] = useState(false);

    const [isNotSucess, setSucess] = useState(true);

    const [goHome, setGoHome] = useState(false);

    const handlePress = () => {
        const validationMsg = ValidateEmptyFields(
            isSignup && isNotSucess ? signupInputValue : loginInputValue,
            isSignup && isNotSucess ? signupFormLabels : loginFormLabels);

        if (validationMsg) {
            setMsg(validationMsg);
            setSnackbarVisible(true);
            return;
        }

        if (!isSignup && goHome) {
            router.push(RouteAddress.Home);
        } else {
            setFunction(true);
            setSucess(false);
        }
    };

    const handleContinuous = () => {
        setFunction(false);
        setSucess(false);
    }

    return (
        <PaperProvider>
            <HomeScreenContainer>
                <BoxInputs>
                    {!isSignup && (
                        <View>
                            <DynamicLabelInput
                                label="Email"
                                onTextChange={(text) => setLoginInputValue((prev) => ({ ...prev, Email: text }))}
                            />
                            <DynamicLabelInput
                                label="Senha"
                                secureTextEntry
                                onTextChange={(text) => setLoginInputValue((prev) => ({ ...prev, Password: text }))}
                            />
                            <CustomButton text="Entrar" onPress={handlePress} />

                            <TextButton onPress={() => [setFunction(true), setSucess(true)]} text="Cadastre-se" adjustPaddingBottom={15} />

                        </View>)}

                    {isSignup && isNotSucess && (
                        <View>
                            <DynamicLabelInput
                                label="Primeiro nome"
                                onTextChange={(text) => setSignupInputValue((prev) => ({ ...prev, FirstName: text }))}
                            />
                            <DynamicLabelInput
                                label="Sobrenome"
                                onTextChange={(text) => setSignupInputValue((prev) => ({ ...prev, Surname: text }))}
                            />
                            <DynamicLabelInput
                                label="Email"
                                onTextChange={(text) => setSignupInputValue((prev) => ({ ...prev, Email: text }))}
                            />
                            <DynamicLabelInput
                                label="Senha"
                                secureTextEntry
                                onTextChange={(text) => setSignupInputValue((prev) => ({ ...prev, Password: text }))}
                            />
                            <DynamicLabelInput
                                label="Repetir senha"
                                secureTextEntry
                                onTextChange={(text) => setSignupInputValue((prev) => ({ ...prev, PasswordRepeat: text }))}
                            />
                            <CustomButton text="Criar conta" onPress={handlePress} />
                        </View>
                    )}

                    {isSignup && !isNotSucess && (
                        <View>
                            <Text style={[styles.onSucessText, { marginTop: 40 }]}>
                                Conta criada com sucesso!
                            </Text>
                            <Text style={styles.onSucessText}>
                                Bem-vindo(a) a uma nova experiência. Agora é só fazer login e aproveitar!
                            </Text>
                            <CustomButton text="Ir para o Login" onPress={handleContinuous} />
                        </View>
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
        marginBottom: 40,
        textAlign: 'center',
        color: Colors.light.background,
        fontSize: 14,
        fontWeight: "bold"
    }
})