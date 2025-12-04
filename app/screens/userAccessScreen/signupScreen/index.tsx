import { ThemeType } from '@/app/types/appearance';
import { UserLogin } from '@/app/types/User';
import CustomButton from '@/components/ui/CustomButton';
import DynamicLabelInput from '@/components/ui/DynamicLabelInput';
import TextButton from '@/components/ui/TextButton';
import ValidateEmptyFields from '@/components/ValidateEmptyFields';
import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import { View } from "react-native";

interface Props {
    theme: ThemeType; values: UserLogin; onPressingReturnButton: () => void; shouldRender?: boolean;
    whenIsReady: (values: Partial<Props["values"]>) => void; erroMessage: (message: string) => void;
}

const SignupScreen: React.FC<Props> = ({ theme, onPressingReturnButton, shouldRender = true, whenIsReady, erroMessage }) => {
    if (!shouldRender) return null;

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
        <View style={{ gap: 10, width: '90%', backgroundColor: Colors[theme].background }}>
            <DynamicLabelInput
                theme={theme}
                label="Primeiro nome"
                colorLabel={Colors[theme].background}
                onTextChange={(text) => setInputValue(prev => ({ ...prev, FirstName: text }))}
            />
            <DynamicLabelInput
                theme={theme}
                label="Sobrenome"
                colorLabel={Colors[theme].background}
                onTextChange={(text) => setInputValue(prev => ({ ...prev, Surname: text }))}
            />
            <DynamicLabelInput
                theme={theme}
                label="E-mail"
                colorLabel={Colors[theme].background}
                onTextChange={(text) => setInputValue(prev => ({ ...prev, Email: text }))}
            />
            <DynamicLabelInput
                theme={theme}
                dateEntry
                label="Data de Nascimento"
                colorLabel={Colors[theme].background}
                onTextChange={(text) => setInputValue(prev => ({ ...prev, BirthDate: text }))}
            />
            <DynamicLabelInput
                theme={theme}
                label="Senha"
                secureTextEntry
                colorLabel={Colors[theme].background}
                onTextChange={(text) => setInputValue(prev => ({ ...prev, Password: text }))}
            />
            <DynamicLabelInput
                theme={theme}
                label="Repetir senha"
                secureTextEntry
                colorLabel={Colors[theme].background}
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
                
                textColor={Colors[theme].textPrimary}
            />

        </View>
    );
};

export default SignupScreen;
