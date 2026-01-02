import { PreferencesContext } from '@/app/context/PreferencesProvider';
import CustomButton from '@/components/ui/CustomButton';
import TransitionView from '@/components/ui/TransitionView';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { Pressable, Text } from 'react-native';

type Screen = "signIn" | "signUp";

interface Props {
    isVisible: boolean;
    onSelect: (screen: Screen) => void;
}

const HomeScreen: React.FC<Props> = ({ isVisible, onSelect }) => {
    if (!isVisible) return null;

    const { preferences } = useContext(PreferencesContext);

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
                    fontSize: Typography[preferences.fontSizeType].xl.fontSize,
                    lineHeight: Typography[preferences.fontSizeType].xl.lineHeight,
                    color: Colors[preferences.theme.appearance].textPrimary,
                    fontWeight: "600", fontStyle: "italic", textAlign: 'justify', 
                    paddingVertical: 40
                }}
            >
                Organize hoje, planeje com propósito e evolua com tranquilidade
            </Text>

            <CustomButton
                text="Entrar"
                onPress={() => onSelect("signIn" as Screen)}
            />

            <Pressable
                style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    paddingVertical: 10
                }}
                onPress={() => onSelect("signUp" as Screen)}
            >
                <Text
                    style={{
                        color: Colors[preferences.theme.appearance].textPrimary,
                        fontSize: Typography[preferences.fontSizeType].md.fontSize
                    }}
                >
                    Ou crie uma conta
                </Text>

                <MaterialIcons
                    name='chevron-right'
                    size={20}
                    color={Colors[preferences.theme.appearance].iconPrimary}
                />
            </Pressable>
        </TransitionView>
    );
};

export default HomeScreen;
