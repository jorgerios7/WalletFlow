import { PreferencesContext } from '@/app/context/PreferencesProvider';
import { LoadScreen } from '@/app/pages/LoadScreen';
import { LoginFormLabelsDefault, LoginInputProps, LoginInputValueDefault } from '@/app/types/User';
import CustomButton from '@/components/ui/CustomButton';
import DynamicLabelInput from '@/components/ui/DynamicLabelInput';
import TextButton from '@/components/ui/TextButton';
import TransitionView from '@/components/ui/TransitionView';
import ValidateEmptyFields from '@/components/ValidateEmptyFields';
import { Colors } from '@/constants/Colors';
import React, { useContext, useState } from 'react';
import { Text } from 'react-native';
import MessageScreen from '../customBottomSheet/messageScreen';

interface Props {
    isVisible: boolean;
    loading: boolean;
    onConfirm: (values: LoginInputProps) => void;
    onDismiss: () => void;
}

const SignInScreen: React.FC<Props> = ({ isVisible, loading, onConfirm, onDismiss, }) => {
    if (!isVisible) return null;

    const { preferences } = useContext(PreferencesContext);

    const [data, setData] = useState(LoginInputValueDefault);
    const [message, setMessage] = useState<String>("");

    function handleValidateField() {
        const validated = ValidateEmptyFields(data, LoginFormLabelsDefault);

        if (validated) {
            setMessage(validated);
            return;
        }

        onConfirm(data);
    }

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
                backgroundColor: Colors[preferences.theme.appearance].background
            }}
        >
            <Text
                style={{
                    fontSize: 40,
                    color: Colors[preferences.theme.appearance].textPrimary
                }}
            >
                Login
            </Text>

            <DynamicLabelInput
                label="Email"
                initialText={data.email}
                colorLabel={Colors[preferences.theme.appearance].background}
                onTextChange={(value) => setData((prev) => ({ ...prev, email: value }))}

            />
            <DynamicLabelInput
                label="Senha"
                secureTextEntry
                initialText={data.password}
                colorLabel={Colors[preferences.theme.appearance].background}
                onTextChange={(value) => setData((prev) => ({ ...prev, password: value }))}
            />
            <CustomButton
                text="Entrar"
                onPress={handleValidateField}
            />
            <TextButton
                onPress={onDismiss}
                text="Voltar"
            />
        </TransitionView>
    );
};

export default SignInScreen;
