import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { PersonalDataChange } from "@/app/types/User";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext, useEffect } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import ButtonTab from "./ButtonTab";
import UseAnimation from "./useAnimation";

interface Props {
    screen: { width: number, height: number }, user: { name: string, email: string },
    collapse?: boolean, onSelect: (field: PersonalDataChange) => void
}

export default function ProfileMenu({ screen, user, collapse, onSelect }: Props) {
    const { preferences } = useContext(PreferencesContext);

    const AnimatedPressableButton = Animated.createAnimatedComponent(Pressable);

    const { isExpanded, toggleMenu, position, size, menuBorderRadiusAnim, opacityAnim, imageScaleAnim } = UseAnimation(screen);

    useEffect(() => {
        if (collapse) closeMenu();
    }, [collapse]);

    const openMenu = () => {
        if (isExpanded) return;
        toggleMenu(true);
    };

    const closeMenu = () => {
        if (!isExpanded) return;
        toggleMenu(false);
    };

    return (
        <Animated.View
            style={[styles.menuContainerDefault, {
                backgroundColor: Colors[preferences.theme.appearance].accent,
                width: size.menuWidthAnim, height: size.menuHeightAnim, top: position.topMenuAnim,
                left: position.leftMenuAnim, borderRadius: menuBorderRadiusAnim
            }]}
        >
            <AnimatedPressableButton
                onPress={closeMenu}
                style={{ opacity: opacityAnim, backgroundColor: 'transparent', alignSelf: 'flex-end', padding: 20, borderRadius: 20 }}
            >
                <MaterialIcons name={'close'} size={28} color={Colors[preferences.theme.appearance].iconContrast} />
            </AnimatedPressableButton>

            <AnimatedPressableButton
                onPress={openMenu}
                style={[styles.buttonDefault, {
                    borderColor: Colors[preferences.theme.appearance].borderInverse, top: position.topButtonAnim, left: position.leftButtonAnim,
                    width: size.buttonWidthAnim, height: size.buttonHeightAnim,
                }]}
            >
                <Animated.View style={[styles.image, { transform: [{ scale: imageScaleAnim }] }]}>
                    <MaterialIcons name={'person'} size={100} color={Colors[preferences.theme.appearance].iconContrast} />
                </Animated.View>
            </AnimatedPressableButton>

            <Animated.View style={[styles.containerText, {
                width: size.containerTxtWidthAnim, height: size.containerTxtHeightAnim, top: position.topContainerTextAnim,
                left: position.leftContainerTextAnim
            }]}>
                <View style={{ flexDirection: 'row', gap: 5, backgroundColor: "transparent" }}>
                    {!isExpanded && (
                        <Text
                            style={[styles.title, {
                                color: Colors[preferences.theme.appearance].textContrast,
                                fontSize: Typography[preferences.fontSizeType].lg.fontSize,
                                lineHeight: Typography[preferences.fontSizeType].lg.lineHeight
                            }]}
                        >
                            Olá,
                        </Text>
                    )}
                    <Text
                        style={[styles.title, {
                            color: Colors[preferences.theme.appearance].textContrast,
                            fontSize: Typography[preferences.fontSizeType].lg.fontSize,
                            lineHeight: Typography[preferences.fontSizeType].lg.lineHeight
                        }]}
                    >
                        {user.name}
                    </Text>
                </View>

                {isExpanded && (
                    <Animated.Text
                        style={[styles.subtitle, {
                            opacity: opacityAnim, color: Colors[preferences.theme.appearance].textContrast,
                            fontSize: Typography[preferences.fontSizeType].xs.fontSize,
                            lineHeight: Typography[preferences.fontSizeType].xs.lineHeight
                        }]}
                    >
                        {user.email}
                    </Animated.Text>
                )}
            </Animated.View>

            <View style={{ width: '100%', height: 200, backgroundColor: "transparent" }} />

            {isExpanded && (
                <View style={{ width: '100%', gap: 5 }}>
                    <ButtonTab
                        text="Editar Nome"
                        iconName="arrow-right"
                        iconSize={24}
                        onPress={() => onSelect('Name')}
                    />

                    <ButtonTab
                        text="Alterar Email"
                        iconName="arrow-right"
                        iconSize={24}
                        onPress={() => onSelect('Email')}
                    />

                    <ButtonTab
                        text="Mudar Senha"
                        iconName="arrow-right"
                        iconSize={24}
                        onPress={() => onSelect('Password')}
                    />

                    <ButtonTab
                        onPress={() => onSelect('Exit-App')}
                        text="Sair"
                        iconName="exit-to-app"
                    />

                    <ButtonTab
                        onPress={() => onSelect('DeleteAccount')}
                        text="Excluir conta"
                        borderBottomColor="transparent"
                    />
                </View>
            )}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    menuContainerDefault: { zIndex: 999, position: 'absolute' }, image: { borderRadius: 999, backgroundColor: 'transparent' },
    buttonDefault: { position: 'absolute', backgroundColor: "transparent", justifyContent: 'center', alignItems: 'center' },
    containerText: { position: 'absolute', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: "transparent" },
    title: { fontSize: 18 }, subtitle: { fontSize: 12 }
});