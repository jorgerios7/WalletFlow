import { ThemeType } from "@/app/types/appearance";
import { MemberData } from "@/app/types/Group";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function MemberViewItem(
    { theme, currentUserId, member, onPressingItem }: { theme: ThemeType, currentUserId: string, member: MemberData; onPressingItem: (member: MemberData) => void }
) {
    return (
        <View style={[styles.memberItem, { backgroundColor: Colors[theme].headerBackground, borderColor: Colors[theme].border, }]}>
            <View style={{ flexDirection: "row", gap: 5 }}>
                
                <Text style={{ alignSelf: "center", color: Colors[theme].textContrast }}> {member.name}</Text>

                {currentUserId === member.id && (<Text style={{ color: Colors[theme].textContrast, alignSelf: 'center' }}>(você)</Text>)}

                {member.role === "owner" && (
                    <View style={{ alignSelf: 'center' }}>
                        <MaterialIcons name="people" size={20} color={Colors[theme].iconContrast} />
                    </View>
                )}
            </View>
            <Pressable
                style={{ alignSelf: 'center' }}
                onPress={() => onPressingItem({ id: member.id, name: member.name, role: member.role })}
            >
                <MaterialIcons name="more-vert" size={20} color={Colors[theme].iconContrast} />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    memberItem: {
        padding: 10, borderRadius: 10, borderWidth: 0.5, flexDirection: "row", justifyContent: "space-between"
    }
});