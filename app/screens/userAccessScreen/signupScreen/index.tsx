import { ThemeType } from '@/app/types/appearance';
import CustomButton from '@/components/ui/CustomButton';
import DynamicLabelInput from '@/components/ui/DynamicLabelInput';
import TextButton from '@/components/ui/TextButton';
import ValidateEmptyFields from '@/components/ValidateEmptyFields';
import React, { useState } from 'react';
import { View } from "react-native";
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface Values {
    FirstName: string;
    Surname: string;
    Email: string;
    BirthDate: string;
    Password: string;
    PasswordRepeat: string
}

interface Props {
    theme: ThemeType;
    values: Values;
    onPressingReturnButton: () => void;
    shouldRender?: boolean;
    whenIsReady: (values: Partial<Props["values"]>) => void;
    erroMessage: (message: string) => void;
}

const SignupScreen: React.FC<Props> = ({
    theme, onPressingReturnButton, shouldRender = true, whenIsReady, erroMessage
}) => {
    if (!shouldRender) return null;

    const [inputValue, setInputValue] = useState({
        FirstName: "", Surname: "", Email: "", BirthDate: "", Password: "", PasswordRepeat: "",
    });

    const signupFormLabels = {
        FirstName: "Primeiro nome", Surname: "Sobrenome", Email: "Email",
        BirthDate: "Data de nascimento", Password: "Senha", PasswordRepeat: "Repetir senha",
    };

    const validateData = () => {
        const validationMsg = ValidateEmptyFields(inputValue, signupFormLabels);

        if (validationMsg) {
            erroMessage(validationMsg);
            return;
        }

        if (inputValue.Password !== inputValue.PasswordRepeat) {
            erroMessage("As senhas não coincidem.");
            return;
        }

        whenIsReady(inputValue);
    }

    return (
        <View style={{ gap: 10, width: '90%', backgroundColor: Colors[theme].background }}>
            <DynamicLabelInput
                theme={theme}
                label="Primeiro nome"
                onTextChange={(text) => setInputValue(prev => ({ ...prev, FirstName: text }))}
            />
            <DynamicLabelInput
                theme={theme}
                label="Sobrenome"
                onTextChange={(text) => setInputValue(prev => ({ ...prev, Surname: text }))}
            />
            <DynamicLabelInput
                theme={theme}
                label="E-mail"
                onTextChange={(text) => setInputValue(prev => ({ ...prev, Email: text }))}
            />
            <DynamicLabelInput
                theme={theme}
                dateEntry
                label="Data de Nascimento"
                onTextChange={(text) => setInputValue(prev => ({ ...prev, BirthDate: text }))}
            />
            <DynamicLabelInput
                theme={theme}
                label="Senha"
                secureTextEntry
                onTextChange={(text) => setInputValue(prev => ({ ...prev, Password: text }))}
            />
            <DynamicLabelInput
                theme={theme}
                label="Repetir senha"
                secureTextEntry
                onTextChange={(text) => setInputValue(prev => ({ ...prev, PasswordRepeat: text }))}
            />

            <CustomButton
                theme={theme}
                text="Criar conta"
                onPress={validateData}
            />

            <TextButton
                theme={theme}
                onPress={onPressingReturnButton}
                text="Voltar"
                adjustPadding={15}
            />

        </View>
    );
};

export default SignupScreen;
