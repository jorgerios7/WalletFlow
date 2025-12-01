import { PersonalDataChange } from "@/app/types/User";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import ButtonTab from "./ButtonTab";
import UseAnimation from "./useAnimation";

interface Props {
    screen: { width: number, height: number }, user: { name: string, email: string },
    collapse?: boolean, onSelect: (field: PersonalDataChange) => void
}

export default function ProfileMenu({ screen, user, collapse, onSelect }: Props) {

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
                width: size.menuWidthAnim, height: size.menuHeightAnim, top: position.topMenuAnim,
                left: position.leftMenuAnim, borderRadius: menuBorderRadiusAnim
            }]}
        >

            <AnimatedPressableButton
                onPress={closeMenu}
                style={{ opacity: opacityAnim, backgroundColor: 'transparent', alignSelf: 'flex-end', padding: 20, borderRadius: 20 }}
            >
                <MaterialIcons name={'close'} size={28} color={'white'} />
            </AnimatedPressableButton>

            <AnimatedPressableButton
                onPress={openMenu}
                style={[styles.buttonDefault, {
                    top: position.topButtonAnim, left: position.leftButtonAnim, width: size.buttonWidthAnim,
                    height: size.buttonHeightAnim,
                }]}
            >
                <Animated.View style={[styles.image, { transform: [{ scale: imageScaleAnim }] }]}>
                    <MaterialIcons name={'person'} size={100} color={'white'} />
                </Animated.View>
            </AnimatedPressableButton>

            <Animated.View style={[styles.containerText, {
                width: size.containerTxtWidthAnim, height: size.containerTxtHeightAnim, top: position.topContainerTextAnim,
                left: position.leftContainerTextAnim
            }]}>
                <View style={{ flexDirection: 'row' }}>
                    {!isExpanded && (<Text style={styles.title}>Olá, </Text>)}
                    <Text style={styles.title}>{user.name}</Text>
                </View>

                {isExpanded && (
                    <Animated.Text style={[styles.subtitle, { opacity: opacityAnim }]}>{user.email}</Animated.Text>)}
            </Animated.View>

            <View style={{ width: '100%', height: 200 }} />

            {isExpanded && (
                <View style={{ width: '100%', gap: 5 }}>
                    <ButtonTab
                        text="Editar Nome"
                        iconName="arrow-right"
                        iconSize={24}
                        fontSize={14}
                        onPress={() => onSelect('Name')}
                    />

                    <ButtonTab
                        text="Alterar Email"
                        iconName="arrow-right"
                        iconSize={24}
                        fontSize={14}
                        onPress={() => onSelect('Email')}
                    />

                    <ButtonTab
                        text="Mudar Senha"
                        iconName="arrow-right"
                        iconSize={24}
                        fontSize={14}
                        onPress={() => onSelect('Password')}
                    />

                    <ButtonTab
                        onPress={() => onSelect('Exit-App')}
                        text="Sair"
                        iconName="exit-to-app"
                        iconSize={24}
                        fontSize={14}
                    />

                    <ButtonTab
                        isHighlightText
                        onPress={() => onSelect('DeleteAccount')}
                        text="Excluir conta"
                        fontSize={14}
                        borderBottomColor="transparent"
                    />
                </View>
            )}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    menuContainerDefault: { zIndex: 999, position: 'absolute', backgroundColor: Colors.light.primary },
    buttonDefault: {
        position: 'absolute', backgroundColor: "transparent", borderColor: Colors.light.background, justifyContent: 'center', alignItems: 'center',
    },
    image: { borderRadius: 999, backgroundColor: 'transparent' },
    containerText: { position: 'absolute', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: "transparent" },
    title: { color: 'white', fontSize: 18 }, subtitle: { color: 'white', fontSize: 12 }
});