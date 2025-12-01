import { Feather } from "@expo/vector-icons";
import { ReactNode } from "react";
import { Modal, Pressable, Text, View } from "react-native";

interface Props {
    isVisible: boolean, title: string, children: ReactNode, onDismiss: () => void
}

export default function MenuModal({ isVisible, title, children, onDismiss }: Props) {

    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            children={
                <View>
                    <View style={{ width: '100%', height: 50, backgroundColor: 'transparent', flexDirection: 'row' }}>
                        <Pressable style={{ position: "absolute", top: 10, left: 10 }} onPress={onDismiss}>
                            <Feather name={'chevron-left'} size={28} />
                        </Pressable>
                        <View style={{ width: '100%', backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ backgroundColor: 'transparent', fontSize: 18, fontWeight: 'bold' }}>
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