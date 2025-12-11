import { MemberData } from "@/app/types/Group";
import { ThemeContext } from "@/components/ThemeProvider";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function MemberViewItem(
    { currentUserId, member, onPressingItem }: { currentUserId: string, member: MemberData; onPressingItem: (member: MemberData) => void }
) {

    const {theme, fontSizeType} = useContext(ThemeContext);
    
    return (
        <View style={[styles.memberItem, { backgroundColor: Colors[theme.appearance].headerBackground, borderColor: Colors[theme.appearance].border, }]}>
            <View style={{ flexDirection: "row", gap: 5 }}>

                <Text
                    style={{
                        alignSelf: "center", color: Colors[theme.appearance].textContrast,
                        fontSize: Typography[fontSizeType].sm.fontSize,
                        lineHeight: Typography[fontSizeType].sm.lineHeight
                    }}
                >
                    {member.name}
                </Text>

                {currentUserId === member.id && (
                    <Text
                        style={{ 
                            alignSelf: 'center', color: Colors[theme.appearance].textContrast, 
                            fontSize: Typography[fontSizeType].sm.fontSize,
                            lineHeight: Typography[fontSizeType].sm.lineHeight
                        }}
                    >
                        (você)
                    </Text>
                )}

                {member.role === "owner" && (
                    <View style={{ alignSelf: 'center' }}>
                        <MaterialIcons name="people" size={20} color={Colors[theme.appearance].iconContrast} />
                    </View>
                )}
            </View>
            <Pressable
                style={{ alignSelf: 'center' }}
                onPress={() => onPressingItem({ id: member.id, name: member.name, role: member.role })}
            >
                <MaterialIcons name="more-vert" size={20} color={Colors[theme.appearance].iconContrast} />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    memberItem: {
        padding: 10, borderRadius: 10, borderWidth: 0.5, flexDirection: "row", justifyContent: "space-between"
    }
});