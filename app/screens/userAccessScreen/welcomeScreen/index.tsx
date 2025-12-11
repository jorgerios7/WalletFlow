import { ThemeContext } from "@/components/ThemeProvider";
import CustomButton from "@/components/ui/CustomButton";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from "react-native";


interface Props {
    onPressingReturnToLoginButton?: () => void;
    shouldRender?: boolean;
};

const WelcomeScreen: React.FC<Props> = ({ onPressingReturnToLoginButton, shouldRender = true, }) => {
    if (!shouldRender) return null;

    const { theme, fontSizeType } = useContext(ThemeContext)

    const textStyle = {
        color: Colors[theme.appearance].textPrimary,
        fontSize: Typography[fontSizeType].md.fontSize,
        lineHeight: Typography[fontSizeType].md.lineHeight
    }

    return (
        <View style={{ backgroundColor: Colors[theme.appearance].background }}>
            <Text style={[styles.onSucessText, textStyle, { marginTop: 40 }]}>
                Conta criada com sucesso!
            </Text>
            <Text style={[styles.onSucessText, textStyle]}>
                Bem-vindo(a) a uma nova experiência. Agora é só fazer login e aproveitar!
            </Text>
            <CustomButton text="Ir para o Login" onPress={onPressingReturnToLoginButton} />
        </View>
    );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    onSucessText: { marginBottom: 40, textAlign: 'center', fontWeight: "bold" }
})