import { auth, db } from '@/app/config/firebaseConfig';
import { PreferencesContext } from '@/app/context/PreferencesProvider';
import { LoadScreen } from '@/app/pages/LoadScreen';
import { FormLabelsDefault, UserLogin, UserLoginDefault } from '@/app/types/User';
import CustomButton from '@/components/ui/CustomButton';
import DynamicLabelInput from '@/components/ui/DynamicLabelInput';
import { HandleErroMessage } from '@/components/ui/HandleErroMessage';
import TextButton from '@/components/ui/TextButton';
import TransitionView from '@/components/ui/TransitionView';
import ValidateEmptyFields from '@/components/ValidateEmptyFields';
import { Colors } from '@/constants/Colors';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { Text } from "react-native";
import MessageScreen from '../customBottomSheet/messageScreen';

interface Props {
    isVisible: boolean;
    onDismiss: () => void;
}

const SignUpScreen: React.FC<Props> = ({ isVisible, onDismiss, }) => {
    if (!isVisible) return null;

    const { preferences } = useContext(PreferencesContext);

    const [data, setData] = useState(UserLoginDefault);

    const [message, setMessage] = useState<String>("");

    const [loading, setLoading] = useState<boolean>(false);

    const validateFields = () => {
        setLoading(true);

        const validated = ValidateEmptyFields(data, FormLabelsDefault);

        if (validated) {
            setMessage(validated);
            setLoading(false);
            return;
        }

        if (data.password !== data.passwordRepeat) {
            setMessage("As senhas não coincidem.");
            setLoading(false);
            return;
        }

        handleSignUp(data);
    }

    const handleSignUp = (data: UserLogin) => {
            createUserWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    createUserProfile(user.uid, data);
                })
                .catch((error: any) => {
                    const translatedMessage = HandleErroMessage(error.code)
                    setMessage(translatedMessage);
    
                    setLoading(false);
                });
        };
    
        const createUserProfile = async (uid: string, data: UserLogin) => {
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
    
                setLoading(false);
            }
        };

    if (message !== "") {
        return (
            <MessageScreen
                message={message as string}
                onDismiss={() => setMessage("")}
            />
        );
    }

    if (loading) {
        return (
        <LoadScreen />
    );
}

    return (
        <TransitionView
            style={{
                gap: 10,
                width: '100%',
                backgroundColor: Colors[preferences.theme.appearance].surface
            }}
        >

            <Text
                style={{
                    fontSize: 40,
                    color: Colors[preferences.theme.appearance].textPrimary
                }}
            >
                Inscrever-se
            </Text>

            <DynamicLabelInput
                label="Primeiro nome"
                initialText={data.name}
                colorLabel={Colors[preferences.theme.appearance].surface}
                onTextChange={(text) => setData(prev => ({ ...prev, name: text }))}
            />
            <DynamicLabelInput
                label="Sobrenome"
                initialText={data.surname}
                colorLabel={Colors[preferences.theme.appearance].surface}
                onTextChange={(text) => setData(prev => ({ ...prev, surname: text }))}
            />
            <DynamicLabelInput
                label="E-mail"
                initialText={data.email}
                colorLabel={Colors[preferences.theme.appearance].surface}
                onTextChange={(text) => setData(prev => ({ ...prev, email: text }))}
            />
            <DynamicLabelInput
                dateEntry
                label="Data de Nascimento"
                initialText={data.birthDate}
                colorLabel={Colors[preferences.theme.appearance].surface}
                onTextChange={(text) => setData(prev => ({ ...prev, birthDate: text }))}
            />
            <DynamicLabelInput
                label="Senha"
                secureTextEntry
                initialText={data.password}
                colorLabel={Colors[preferences.theme.appearance].surface}
                onTextChange={(text) => setData(prev => ({ ...prev, password: text }))}
            />
            <DynamicLabelInput
                label="Repetir senha"
                secureTextEntry
                initialText={data.passwordRepeat}
                colorLabel={Colors[preferences.theme.appearance].surface}
                onTextChange={(text) => setData(prev => ({ ...prev, passwordRepeat: text }))}
            />

            <CustomButton
                text="Inscrever-se"
                onPress={validateFields}
            />

            <TextButton
                onPress={onDismiss}
                text="Voltar"
            />

        </TransitionView>
    );
};

export default SignUpScreen;
