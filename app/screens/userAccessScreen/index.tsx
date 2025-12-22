import { auth, db } from "@/app/config/firebaseConfig";
import { PreferencesContext } from "@/app/context/PreferencesProvider";
import ValidateEmptyFields from "@/components/ValidateEmptyFields";
import { Colors } from "@/constants/Colors";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { View } from "react-native";
import { Snackbar } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LoginScreen from "./loginScreen";
import SignupScreen from "./signupScreen";
import WelcomeScreen from "./welcomeScreen";

const UserAccessScreen: React.FC = () => {

    const insets = useSafeAreaInsets();

    const { preferences } = useContext(PreferencesContext);

    const [loginInputValue, setLoginInputValue] = useState({ Email: "", Password: "" });

    const loginFormLabels = { Email: "Email", Password: "Senha" };

    const [signupInputValue, setSignupInputValue] = useState({
        firstName: "", surname: "", email: "", birthDate: "", password: "", passwordRepeat: "",
    });

    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [msg, setMsg] = useState("");
    const [isSignup, setFunctionSignup] = useState(false);
    const [isLoginCreatedSuccessfully, setLoginCreation] = useState(false);

    const handleCreateLogin = () => {
        createUserWithEmailAndPassword(auth, signupInputValue.email, signupInputValue.password)
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
                    name: signupInputValue.firstName,
                    surname: signupInputValue.surname,
                    birthDate: signupInputValue.birthDate,
                    email: signupInputValue.email
                },
                createdAt: new Date().toISOString()
            });

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
            .then(() => setLoginInputValue({ Email: "", Password: "" }))
            .catch((error) => {
                console.error('(UserAccessScreen) Erro ao fazer login:', error);
                setMsg("Erro ao fazer login: " + error.message);
                setSnackbarVisible(true);
            });


        setLoginInputValue({ Email: "", Password: "" })
    }

    const handleReturnToLogin = () => {
        setFunctionSignup(false);
        setLoginCreation(false);
        setSignupInputValue({ firstName: "", surname: "", email: "", birthDate: "", password: "", passwordRepeat: "" });
    }

    return (
        <View style={{
            flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors[preferences.theme.appearance].background,
            marginTop: insets.top, marginBottom: insets.bottom, padding: 10
        }}>
            <LoginScreen
                shouldRender={!isSignup}
                values={loginInputValue}
                onChange={(field, value) => setLoginInputValue((prev) => ({ ...prev, [field]: value }))}
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

            <WelcomeScreen
                onPressingReturnToLoginButton={handleReturnToLogin}
                shouldRender={isSignup && isLoginCreatedSuccessfully}
            />

            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                style={{ backgroundColor: Colors[preferences.theme.appearance].accent }}
                action={{ label: "Fechar", onPress: () => setSnackbarVisible(false) }}
            >
                {msg}
            </Snackbar>
        </View>
    );
}

export default UserAccessScreen;