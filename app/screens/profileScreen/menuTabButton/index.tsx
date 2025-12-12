import { ThemeContext } from "@/components/ThemeProvider";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { MaterialIcons } from "@expo/vector-icons";
import { ReactNode, useContext, useEffect } from "react";
import { Animated, Pressable, Text } from "react-native";
import useAnimation from "./useAnimation";

const MenuTabButton: React.FC<{
    name: string; iconSize?: number, iconName: keyof typeof MaterialIcons.glyphMap, collapse?: boolean,
    children: ReactNode, openHeightSize: number, onExpanding: (expanded: boolean) => void
}> = ({ name, iconName, iconSize, collapse, children, openHeightSize, onExpanding }) => {

    const { theme, fontSizeType } = useContext(ThemeContext);

    const PressableAnimation = Animated.createAnimatedComponent(Pressable);

    const { toggleMenu, size, isExpanded } = useAnimation({ openHeightSize: openHeightSize });

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
            style={{
                height: size.menuHeightAnim, backgroundColor: Colors[theme.appearance].surfaceVariant, borderRadius: 10
            }}
        >
            <PressableAnimation
                onPress={() => {
                    onExpanding(isExpanded);
                    isExpanded
                        ? closeMenu()
                        : openMenu()
                }}
                style={{
                    width: '100%', height: 50, gap: 10, backgroundColor: Colors[theme.appearance].surface,
                    flexDirection: 'row', padding: 10, borderRadius: 10
                }}
            >
                <MaterialIcons
                    name={iconName}
                    size={iconSize ? iconSize : 28}
                    color={Colors[theme.appearance].iconPrimary}
                    style={{ alignSelf: "center" }}
                />

                <Text style={{
                    color: Colors[theme.appearance].textPrimary, alignSelf: 'center',
                    fontSize: Typography[fontSizeType].sm.fontSize,
                    lineHeight: Typography[fontSizeType].sm.lineHeight,
                    fontWeight: 'bold'
                }}
                >
                    {name}
                </Text>
            </PressableAnimation>

            {children}

        </Animated.View>
    );
}

export default MenuTabButton;