import CustomButton from '@/components/ui/CustomButton';
import DynamicLabelInput from '@/components/ui/DynamicLabelInput';
import TextButton from '@/components/ui/TextButton';
import React from 'react';
import { View } from "react-native";

interface Props {
    values: { FirstName: string; Surname: string; Email: string; BirthDate: string; Password: string; PasswordRepeat: string };
    onChange: (field: keyof Props["values"], value: string) => void;
    onPressingEnterButton?: () => void;
    onPressingReturnButton?: () => void;
    shouldRender?: boolean;
}

const SignupScreen: React.FC<Props> = ({
    values,
    onChange,
    onPressingEnterButton,
    onPressingReturnButton,
    shouldRender = true,
}) => {
    if (!shouldRender) return null;

    return (
        <View>
            <DynamicLabelInput
                label="Primeiro nome"
                value={values.FirstName}
                onTextChange={(text) => onChange("FirstName", text)}
            />
            <DynamicLabelInput
                label="Sobrenome"
                value={values.Surname}
                onTextChange={(text) => onChange("Surname", text)}
            />
            <DynamicLabelInput
                label="E-mail"
                value={values.Email}
                onTextChange={(text) => onChange("Email", text)}
            />
            <DynamicLabelInput
                label="Data de Nascimento"
                value={values.BirthDate}
                onTextChange={(text) => onChange("BirthDate", text)}
            />
            <DynamicLabelInput
                label="Senha"
                value={values.Password}
                secureTextEntry
                onTextChange={(text) => onChange("Password", text)}
            />
            <DynamicLabelInput
                label="Repetir senha"
                value={values.PasswordRepeat}
                secureTextEntry
                onTextChange={(text) => onChange("PasswordRepeat", text)}
            />

            <CustomButton
                text="Criar conta"
                onPress={onPressingEnterButton}
            />
            <TextButton
                onPress={onPressingReturnButton}
                text="Voltar"
                adjustPaddingBottom={15}
            />
        </View>
    );
};

export default SignupScreen;
