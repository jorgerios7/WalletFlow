import CustomButton from '@/components/ui/CustomButton';
import React from 'react';
import { View } from "react-native";
import DynamicLabelInput from "../../components/ui/DynamicLabelInput";
import TextButton from "../../components/ui/TextButton";

interface Props {
    values: { Email: string; Password: string };
    onChange: (field: keyof Props["values"], value: string) => void;
    onPressingEnterButton?: () => void;
    onPressingRegisterButton?: () => void;
    shouldRender?: boolean;
}

const LoginScreen: React.FC<Props> = ({
    values,
    onChange,
    onPressingEnterButton,
    onPressingRegisterButton,
    shouldRender = true,
}) => {
    if (!shouldRender) return null;

    return (
        <View>
            <DynamicLabelInput
                label="Email"
                value={values.Email}
                onTextChange={(text) => onChange("Email", text)}
            />
            <DynamicLabelInput
                label="Senha"
                value={values.Password}
                secureTextEntry
                onTextChange={(text) => onChange("Password", text)}
            />
            <CustomButton
                text="Entrar"
                onPress={onPressingEnterButton}
            />
            <TextButton
                onPress={onPressingRegisterButton}
                text="Cadastre-se"
                adjustPaddingBottom={15}
            />
        </View>
    );
};

export default LoginScreen;
