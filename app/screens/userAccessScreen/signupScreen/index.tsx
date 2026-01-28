import { auth, db } from '@/app/config/firebaseConfig';
import { PreferencesContext } from '@/app/context/PreferencesProvider';
import { LoadScreen } from '@/app/pages/LoadScreen';
import { FormLabelsDefault, UserLogin, UserLoginDefault } from '@/app/types/User';
import CustomButton from '@/components/ui/CustomButton';
import DynamicLabelInput from '@/components/ui/DynamicLabelInput';
import { HandleErroMessage } from '@/components/ui/HandleErroMessage';
import ValidateEmptyFields from '@/components/ValidateEmptyFields';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { Switch, Text, View } from "react-native";

interface Props {
    isVisible: boolean;
}

const SignUpScreen: React.FC<Props> = ({ isVisible }) => {
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

    {/*if (message !== "") {
        return (
            <MessageScreen
                message={message as string}
                onDismiss={() => setMessage("")}
            />
        );
    }*/}

    if (loading) {
        return (
            <LoadScreen />
        );
    }

    return (
        <View
            style={{
                gap: 14,
                width: '100%'
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    gap: 14
                }}
            >
                <DynamicLabelInput
                    label="Primeiro nome"
                    initialText={data.name}
                    colorLabel={Colors[preferences.theme.appearance].background}
                    onTextChange={(text) => setData(prev => ({ ...prev, name: text }))}
                />
                <DynamicLabelInput
                    label="Sobrenome"
                    initialText={data.surname}
                    colorLabel={Colors[preferences.theme.appearance].background}
                    onTextChange={(text) => setData(prev => ({ ...prev, surname: text }))}
                />
            </View>

            <DynamicLabelInput
                label="E-mail"
                initialText={data.email}
                colorLabel={Colors[preferences.theme.appearance].background}
                onTextChange={(text) => setData(prev => ({ ...prev, email: text }))}
            />
            <DynamicLabelInput
                dateEntry
                label="Data de Nascimento"
                initialText={data.birthDate}
                colorLabel={Colors[preferences.theme.appearance].background}
                onTextChange={(text) => setData(prev => ({ ...prev, birthDate: text }))}
            />

            <View
                style={{
                    flexDirection: "row",
                    gap: 10
                }}
            >
                <DynamicLabelInput
                    label="Senha"
                    secureTextEntry
                    initialText={data.password}
                    colorLabel={Colors[preferences.theme.appearance].background}
                    onTextChange={(text) => setData(prev => ({ ...prev, password: text }))}
                />
                <DynamicLabelInput
                    label="Confirmar senha"
                    secureTextEntry
                    initialText={data.passwordRepeat}
                    colorLabel={Colors[preferences.theme.appearance].background}
                    onTextChange={(text) => setData(prev => ({ ...prev, passwordRepeat: text }))}
                />
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: "center",
                    gap: 8,
                    margin: 20
                }}
            >
                <Switch />
                <Text
                    style={{
                        fontSize: Typography[preferences.fontSizeType].md.fontSize,
                        color: Colors[preferences.theme.appearance].textPrimary
                    }}
                >
                    Eu estou de acordo com as Políticas de Privacidade
                </Text>
            </View>

            <CustomButton
                text="Cadastrar"
                onPress={validateFields}
            />

        </View>
    );
};

export default SignUpScreen;
