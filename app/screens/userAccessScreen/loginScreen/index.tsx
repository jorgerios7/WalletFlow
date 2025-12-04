import { ThemeType } from '@/app/types/appearance';
import CustomButton from '@/components/ui/CustomButton';
import DynamicLabelInput from '@/components/ui/DynamicLabelInput';
import TextButton from '@/components/ui/TextButton';
import { Colors } from '@/constants/Colors';
import React from 'react';
import { View } from "react-native";

interface Props {
    theme: ThemeType; values: { Email: string; Password: string };
    onChange: (field: keyof Props["values"], value: string) => void;
    onPressingEnterButton?: () => void; onPressingRegisterButton?: () => void;
    shouldRender?: boolean;
}

const LoginScreen: React.FC<Props> = ({
    theme, values, onChange, onPressingEnterButton, onPressingRegisterButton, shouldRender = true,
}) => {
    if (!shouldRender) return null;

    return (
        <View style={{ gap: 10, width: '90%', backgroundColor: Colors[theme].background }}>
            <DynamicLabelInput
                theme={theme}
                label="Email"
                colorLabel={Colors[theme].background}
                onTextChange={(text) => onChange("Email", text)}
            />
            <DynamicLabelInput
                theme={theme}
                label="Senha"
                secureTextEntry
                colorLabel={Colors[theme].background}
                onTextChange={(text) => onChange("Password", text)}
            />
            <CustomButton
                theme={theme}
                text="Entrar"
                onPress={onPressingEnterButton}
            />
            <TextButton
                theme={theme}
                onPress={onPressingRegisterButton}
                text="Cadastre-se"
                textColor={Colors[theme].textPrimary}
                adjustPadding={15}
            />
        </View>
    );
};

export default LoginScreen;
