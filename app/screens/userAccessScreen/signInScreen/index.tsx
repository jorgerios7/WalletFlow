import { auth } from '@/app/config/firebaseConfig';
import { PreferencesContext } from '@/app/context/PreferencesProvider';
import { LoadScreen } from '@/app/pages/LoadScreen';
import { LoginFormLabelsDefault } from '@/app/types/User';
import CustomButton from '@/components/ui/CustomButton';
import DynamicLabelInput from '@/components/ui/DynamicLabelInput';
import { HandleErroMessage } from '@/components/ui/HandleErroMessage';
import ValidateEmptyFields from '@/components/ValidateEmptyFields';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { Pressable, Switch, Text, View } from 'react-native';
import InfoCard from '../infoCard';


interface Props {
    isVisible: boolean;
}

const SignInScreen: React.FC<Props> = ({ isVisible }) => {
    if (!isVisible) return null;

    const {
        preferences,
        setUserEmailReminder,
    } = useContext(PreferencesContext);

    const [remember, setRemember] = useState(preferences.userEmailReminder !== "");

    const [data, setData] = useState({
        email: remember
            ? preferences.userEmailReminder
            : "",
        password: ""
    });
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState(false);


    const theme = Colors[preferences.theme.appearance];
    const typography = Typography[preferences.fontSizeType];

    const handleSignIn = async () => {
        const validated = ValidateEmptyFields(data, LoginFormLabelsDefault);
        if (validated) {
            setMessage(validated);
            return;
        }

        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, data.email, data.password);

            { remember && setUserEmailReminder(data.email) }
        } catch (error: any) {
            setMessage(HandleErroMessage(error.code));
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadScreen />;

    {/*if (message) {
        return (
            <MessageScreen
                message={message}
                onDismiss={() => setMessage('')}
            />
        );
    }*/}

    return (
        <View style={{ width: "100%", gap: 20 }}>
            <View style={{ gap: 14 }}>
                <DynamicLabelInput
                    label="Email"
                    initialText={data.email}
                    colorLabel={theme.background}
                    onTextChange={(email) =>
                        setData(prev => ({ ...prev, email }))
                    }
                />

                <DynamicLabelInput
                    label="Senha"
                    secureTextEntry
                    initialText={data.password}
                    colorLabel={theme.background}
                    onTextChange={(password) =>
                        setData(prev => ({ ...prev, password }))
                    }
                />

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: "center"
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 8
                        }}
                    >
                        <Switch
                            value={remember}
                            onValueChange={setRemember}
                            thumbColor={theme.accent}
                        />
                        <Text
                            style={{
                                color: theme.textPrimary,
                                fontSize: typography.md.fontSize,
                                fontWeight: "500"
                            }}
                        >
                            Lembrar-me
                        </Text>
                    </View>

                    <Pressable>
                        <Text
                            style={{
                                color: theme.textPrimary,
                                fontSize: typography.md.fontSize,
                                fontWeight: "500"
                            }}
                        >
                            Esqueceu a senha?
                        </Text>
                    </Pressable>
                </View>

                <CustomButton text="Entrar" onPress={handleSignIn} />
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    gap: 10,
                    justifyContent: 'center'
                }}
            >
                <InfoCard icon="shield" label="Seguro" />
                <InfoCard icon="flash-auto" label="Rápido" />
                <InfoCard icon="insights" label="Insights" />
            </View>
        </View>
    );
};

export default SignInScreen;