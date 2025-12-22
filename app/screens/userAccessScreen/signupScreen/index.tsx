import { PreferencesContext } from '@/app/context/PreferencesProvider';
import { UserLogin } from '@/app/types/User';
import CustomButton from '@/components/ui/CustomButton';
import DynamicLabelInput from '@/components/ui/DynamicLabelInput';
import TextButton from '@/components/ui/TextButton';
import ValidateEmptyFields from '@/components/ValidateEmptyFields';
import { Colors } from '@/constants/Colors';
import React, { useContext, useState } from 'react';
import { View } from "react-native";

interface Props {
    values: UserLogin; onPressingReturnButton: () => void; shouldRender?: boolean;
    whenIsReady: (values: Partial<Props["values"]>) => void; erroMessage: (message: string) => void;
}

const SignupScreen: React.FC<Props> = ({ onPressingReturnButton, shouldRender = true, whenIsReady, erroMessage }) => {
    if (!shouldRender) return null;

    const { preferences } = useContext(PreferencesContext);

    const [inputValue, setInputValue] = useState({
        firstName: "", surname: "", email: "", birthDate: "", password: "", passwordRepeat: "",
    });

    const signupFormLabels = {
        firstName: "Primeiro nome", surname: "Sobrenome", email: "Email",
        birthDate: "Data de nascimento", password: "Senha", passwordRepeat: "Repetir senha",
    };

    const validateData = () => {
        const validationMsg = ValidateEmptyFields(inputValue, signupFormLabels);

        if (validationMsg) {
            erroMessage(validationMsg);
            return;
        }

        if (inputValue.password !== inputValue.passwordRepeat) {
            erroMessage("As senhas não coincidem.");
            return;
        }

        whenIsReady(inputValue);
    }

    return (
        <View style={{ gap: 10, width: '100%', backgroundColor: Colors[preferences.theme.appearance].background }}>
            <DynamicLabelInput
                label="Primeiro nome"
                colorLabel={Colors[preferences.theme.appearance].background}
                onTextChange={(text) => setInputValue(prev => ({ ...prev, firstName: text }))}
            />
            <DynamicLabelInput
                label="Sobrenome"
                colorLabel={Colors[preferences.theme.appearance].background}
                onTextChange={(text) => setInputValue(prev => ({ ...prev, surname: text }))}
            />
            <DynamicLabelInput
                label="E-mail"
                colorLabel={Colors[preferences.theme.appearance].background}
                onTextChange={(text) => setInputValue(prev => ({ ...prev, email: text }))}
            />
            <DynamicLabelInput
                dateEntry
                label="Data de Nascimento"
                colorLabel={Colors[preferences.theme.appearance].background}
                onTextChange={(text) => setInputValue(prev => ({ ...prev, birthDate: text }))}
            />
            <DynamicLabelInput
                label="Senha"
                secureTextEntry
                colorLabel={Colors[preferences.theme.appearance].background}
                onTextChange={(text) => setInputValue(prev => ({ ...prev, password: text }))}
            />
            <DynamicLabelInput
                label="Repetir senha"
                secureTextEntry
                colorLabel={Colors[preferences.theme.appearance].background}
                onTextChange={(text) => setInputValue(prev => ({ ...prev, passwordRepeat: text }))}
            />

            <CustomButton
                text="Enviar"
                onPress={validateData}
            />

            <TextButton
                onPress={onPressingReturnButton}
                text="Voltar"
            />

        </View>
    );
};

export default SignupScreen;
