import { ThemeType } from "@/app/types/appearance";
import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { ReactNode } from "react";
import { Modal, Pressable, Text, View } from "react-native";

interface Props {
    isVisible: boolean, theme: ThemeType, title: string, children: ReactNode, onDismiss: () => void
}

export default function MenuModal({ isVisible, theme, title, children, onDismiss }: Props) {
    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            children={
                <View style={{backgroundColor: Colors[theme].background}}>
                    <View style={{ width: '100%', height: 50, backgroundColor: Colors[theme].background, flexDirection: 'row' }}>
                        <Pressable style={{ position: "absolute", top: 10, left: 10 }} onPress={onDismiss}>
                            <Feather name={'chevron-left'} size={28} color={Colors[theme].primary} />
                        </Pressable>
                        <View style={{ width: '100%', backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: Colors[theme].textSecondary, fontSize: 18, fontWeight: 'bold' }}>
                                {title}
                            </Text>
                        </View>
                    </View>
                    {children}
                </View>
            }
        />
    )
}