import { auth, db } from "@/app/config/firebaseConfig";
import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { LoginInputProps, UserLogin } from "@/app/types/User";
import ConfirmActionModal from "@/components/ui/confirmActionModal";
import { HandleErroMessage } from "@/components/ui/HandleErroMessage";
import { Colors } from "@/constants/Colors";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomBottomSheet from "./customBottomSheet";
import HomeScreen from "./homeScreen";
import SignInScreen from "./signInScreen";
import SignUpScreen from "./signUpScreen";

const UserAccessScreen: React.FC = () => {
    const insets = useSafeAreaInsets();

    const { preferences } = useContext(PreferencesContext);

    const [currentScreen, setCurrentScreen] = useState<"home" | "signIn" | "signUp">("home");

    const [message, setMessage] = useState<String>("");

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleAccountCreation = (data: UserLogin) => {
        setIsLoading(true);

        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                handleCreateUserBankData(user.uid, data);
            })
            .catch((error: any) => {
                const translatedMessage = HandleErroMessage(error.code)
                setMessage(translatedMessage);

                setIsLoading(false);
            });
    };

    const handleCreateUserBankData = async (uid: string, data: UserLogin) => {
        try {
            await setDoc(doc(db, "users", uid), {
                identification: {
                    name: data.name,
                    surname: data.surname,
                    birthDate: data.birthDate,
                    email: data.email
                },
                createdAt: new Date().toISOString()
            });
        } catch (error: any) {
            const translatedMessage = HandleErroMessage(error.code)
            setMessage(translatedMessage);
        } finally {

            setIsLoading(false);
        }
    };

    const handleSignIn = (data: LoginInputProps) => {
        setIsLoading(true);

        signInWithEmailAndPassword(auth, data.email, data.password)
            .then()
            .catch((error) => {
                const translatedMessage = HandleErroMessage(error.code)
                setMessage(translatedMessage);
            });

        setIsLoading(false);
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: Colors[preferences.theme.appearance].accent,
                marginTop: insets.top,
            }}
        >
            <CustomBottomSheet>
                <HomeScreen
                    isVisible={currentScreen === "home"}
                    onSelect={setCurrentScreen}
                />

                <SignInScreen
                    isVisible={currentScreen === "signIn"}
                    loading={isLoading}
                    onConfirm={handleSignIn}
                    onDismiss={() => setCurrentScreen("home")}
                />

                <SignUpScreen
                    isVisible={currentScreen === "signUp"}
                    loading={isLoading}
                    onConfirm={handleAccountCreation}
                    onDismiss={() => setCurrentScreen("home")}
                />

                <ConfirmActionModal
                    isVisible={message !== ""}
                    confirmationMessage={message as string}
                    onConfirm={() => setMessage("")}
                />
            </CustomBottomSheet>
        </View>
    );
}

export default UserAccessScreen;