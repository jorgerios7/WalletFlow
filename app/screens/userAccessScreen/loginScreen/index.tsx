import { PreferencesContext } from '@/app/context/PreferencesProvider';
import CustomButton from '@/components/ui/CustomButton';
import DynamicLabelInput from '@/components/ui/DynamicLabelInput';
import TextButton from '@/components/ui/TextButton';
import { Colors } from '@/constants/Colors';
import React, { useContext } from 'react';
import { View } from "react-native";

interface Props {
    values: { Email: string; Password: string };
    onChange: (field: keyof Props["values"], value: string) => void;
    onPressingEnterButton?: () => void; onPressingRegisterButton?: () => void;
    shouldRender?: boolean;
}

const LoginScreen: React.FC<Props> = ({
   values, onChange, onPressingEnterButton, onPressingRegisterButton, shouldRender = true,
}) => {
    if (!shouldRender) return null;

    const { preferences } = useContext(PreferencesContext);

    return (
        <View style={{ gap: 10, width: '100%', backgroundColor: Colors[preferences.theme.appearance].background }}>
            <DynamicLabelInput
                label="Email"
                colorLabel={Colors[preferences.theme.appearance].background}
                onTextChange={(text) => onChange("Email", text)}
            />
            <DynamicLabelInput
                label="Senha"
                secureTextEntry
                colorLabel={Colors[preferences.theme.appearance].background}
                onTextChange={(text) => onChange("Password", text)}
            />
            <CustomButton
                text="Entrar"
                onPress={onPressingEnterButton}
            />
            <TextButton
                onPress={onPressingRegisterButton}
                text="Criar conta"
                adjustPadding={15}
            />
        </View>
    );
};

export default LoginScreen;
