import { auth, db } from "@/app/config/firebaseConfig";
import LoginScreen from "@/app/screens/LoginScreen";
import SignupScreen from "@/app/screens/SignupScreen";
import BoxInputs from "@/components/ui/BoxInputs";
import HomeScreenContainer from "@/components/ui/HomeScreenContainer";
import WelcomeAfterSignup from "@/components/ui/WelcomeAfterSignup";
import ValidateEmptyFields from "@/components/ValidateEmptyFields";
import { Colors } from "@/constants/Colors";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Provider as PaperProvider, Snackbar } from "react-native-paper";

interface Props {
    onPress: (isLoged: boolean) => void,
    getUId: (id: string) => void
}

const UserAccessScreen: React.FC<Props> = ({ onPress, getUId }) => {
    const [loginInputValue, setLoginInputValue] = useState({ Email: "", Password: "" });

    const loginFormLabels = { Email: "Email", Password: "Senha" };

    const [signupInputValue, setSignupInputValue] = useState({
        FirstName: "", Surname: "", Email: "", BirthDate: "", Password: "", PasswordRepeat: "",
    });

    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [msg, setMsg] = useState("");
    const [isSignup, setFunctionSignup] = useState(false);
    const [isLoginCreatedSuccessfully, setLoginCreation] = useState(false);

    const handleCreateLogin = () => {
        createUserWithEmailAndPassword(auth, signupInputValue.Email, signupInputValue.Password)
            .then((userCredential) => {
                const user = userCredential.user;
                handleCreateUserBankData(user.uid);
            })
            .catch((error) => {
                console.error('Erro ao criar usuário:', error);
                setMsg("Erro ao criar usuário");
                setSnackbarVisible(true);
            });
    };

    const handleCreateUserBankData = async (uid: string) => {
        try {
            await setDoc(doc(db, "users", uid), {
                identification: {
                    name: signupInputValue.FirstName,
                    surname: signupInputValue.Surname,
                    birthDate: signupInputValue.BirthDate,
                    email: signupInputValue.Email
                },
                createdAt: new Date().toISOString()
            });
            getUId(uid);
            setLoginCreation(true);
        } catch (error) {
            console.error("Erro:", error);
            setMsg("Erro ao salvar dados do usuário.");
            setSnackbarVisible(true);
        }
    };

    const handleEnterButton = () => {
        const validationMsg = ValidateEmptyFields(loginInputValue, loginFormLabels);

        if (validationMsg) {
            setMsg(validationMsg);
            setSnackbarVisible(true);
            return;
        }

        signInWithEmailAndPassword(auth, loginInputValue.Email, loginInputValue.Password)
            .then((userCredential) => {
                const user = userCredential.user;

                if (getUId) getUId(user.uid)
                if (onPress) onPress(true);

                setLoginInputValue({ Email: "", Password: "" });
            })
            .catch((error) => {
                console.error('Erro ao fazer login:', error);
                setMsg("Erro ao fazer login: " + error.message);
                setSnackbarVisible(true);
            });


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
            BirthDate: "",
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
                        whenIsReady={(data) => {
                            setSignupInputValue((prev) => ({ ...prev, ...data }));
                            handleCreateLogin();

                        }}
                        erroMessage={(message) => {
                            setMsg(message);
                            setSnackbarVisible(true);
                        }}
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

export default UserAccessScreen;