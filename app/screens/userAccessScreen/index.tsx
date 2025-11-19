import { auth, db } from "@/app/config/firebaseConfig";
import BoxInputs from "@/components/ui/BoxInputs";
import WelcomeAfterSignup from "@/components/ui/WelcomeAfterSignup";
import ValidateEmptyFields from "@/components/ValidateEmptyFields";
import { Colors } from "@/constants/Colors";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Provider as PaperProvider, Snackbar } from "react-native-paper";
import LoginScreen from "./loginScreen";
import SignupScreen from "./signupScreen";

interface Props {
    isVisible: boolean, onPress: (isLoged: boolean) => void, onUserId: (id: string) => void
}

const UserAccessScreen: React.FC<Props> = ({ isVisible, onPress, onUserId }) => {
    if (!isVisible) return null;

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
            onUserId(uid);
            setLoginCreation(true);
        } catch (error) {
            console.error("(UserAccessScreen) Erro:", error);
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

                if (onUserId) onUserId(user.uid)
                if (onPress) onPress(true);

                setLoginInputValue({ Email: "", Password: "" });
            })
            .catch((error) => {
                console.error('(UserAccessScreen) Erro ao fazer login:', error);
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
        </PaperProvider>
    );
}

export default UserAccessScreen;