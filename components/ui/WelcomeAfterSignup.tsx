import { ThemeType } from "@/app/types/appearance";
import { Colors } from "@/constants/Colors";
import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "./CustomButton";

interface Props {
    theme: ThemeType;
    onPressingReturnToLoginButton?: () => void;
    shouldRender?: boolean;
}

const WelcomeAfterSignup: React.FC<Props> = ({ theme, onPressingReturnToLoginButton, shouldRender = true, }) => {
    if (!shouldRender) return null;
    
    return (
        <View>
            <Text style={[styles.onSucessText, { marginTop: 40 }]}>
                Conta criada com sucesso!
            </Text>
            <Text style={styles.onSucessText}>
                Bem-vindo(a) a uma nova experiência. Agora é só fazer login e aproveitar!
            </Text>
            <CustomButton theme={theme} text="Ir para o Login" onPress={onPressingReturnToLoginButton} />
        </View>
    );
}

export default WelcomeAfterSignup;

const styles = StyleSheet.create({
    onSucessText: {
        marginBottom: 40,
        textAlign: 'center',
        color: Colors.light.textPrimary,
        fontSize: 14,
        fontWeight: "bold"
    }
})