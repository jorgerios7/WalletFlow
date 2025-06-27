import RouteAddress from "@/components/RouteAdress";
import BoxInputs from "@/components/ui/BoxInputs";
import HomeScreenContainer from "@/components/ui/HomeScreenContainer";
import LoginScreen from "@/components/ui/LoginScreen";
import SignupScreen from "@/components/ui/SignupScreen";
import WelcomeAfterSignup from "@/components/ui/WelcomeAfterSignup";
import ValidateEmptyFields from "@/components/ValidateEmptyFields";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Provider as PaperProvider, Snackbar } from "react-native-paper";

export default function UserAccessScreen() {
    const router = useRouter();

    const [loginInputValue, setLoginInputValue] = useState({
        Email: "", Password: "",
    });

    const loginFormLabels = {
        Email: "Email", Password: "Senha",
    };

    const [signupInputValue, setSignupInputValue] = useState({
        FirstName: "", Surname: "", Email: "", Password: "", PasswordRepeat: "",
    });

    const signupFormLabels = {
        FirstName: "Primeiro nome", Surname: "Sobrenome",
        Email: "Email", Password: "Senha", PasswordRepeat: "Repetir senha",
    };

    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [msg, setMsg] = useState("");
    const [isSignup, setFunctionSignup] = useState(false);
    const [isLoginCreatedSuccessfully, setLoginCreation] = useState(false);

    const handleLoginButtons = () => {
        const validationMsg = ValidateEmptyFields(signupInputValue, signupFormLabels);

        if (validationMsg) {
            setMsg(validationMsg);
            setSnackbarVisible(true);
            return;
        }

        console.log('Dados: ', signupInputValue);

        setFunctionSignup(true);
        setLoginCreation(true);
    };

    const handleEnterButton = () => {
        const validationMsg = ValidateEmptyFields(loginInputValue, loginFormLabels);

        if (validationMsg) {
            setMsg(validationMsg);
            setSnackbarVisible(true);
            return;
        }

        console.log('Dados: ', loginInputValue);

        router.push(RouteAddress.Home);
        setLoginInputValue({
            Email: "",
            Password: "",
        })
    }

    const handleReturnToLogin = () => {
        setFunctionSignup(false);
        setLoginCreation(false);
        setSignupInputValue({
            FirstName: "",
            Surname: "",
            Email: "",
            Password: "",
            PasswordRepeat: "",
        });
    }

    return (
        <PaperProvider>
            <HomeScreenContainer>
                <BoxInputs>
                    <LoginScreen
                        shouldRender={!isSignup}
                        values={loginInputValue}
                        onChange={(field, value) =>
                            setLoginInputValue((prev) => ({ ...prev, [field]: value }))
                        }
                        onPressingEnterButton={handleEnterButton}
                        onPressingRegisterButton={() => [setFunctionSignup(true), setLoginCreation(false)]}
                    />

                    <SignupScreen
                        shouldRender={isSignup && !isLoginCreatedSuccessfully}
                        values={signupInputValue}
                        onChange={(field, value) =>
                            setSignupInputValue((prev) => ({ ...prev, [field]: value }))
                        }
                        onPressingEnterButton={handleLoginButtons}
                        onPressingReturnButton={handleReturnToLogin}
                    />

                    <WelcomeAfterSignup
                        onPressingReturnToLoginButton={handleReturnToLogin}
                        shouldRender={isSignup && isLoginCreatedSuccessfully}
                    />
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