import { MemberData } from "@/app/types/Group";
import { ThemeContext } from "@/components/ThemeProvider";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MemberViewItem from "./memberViewItem";

interface Props {
    currentUserId: string, members: MemberData[], creationData: { name: string, date: string },
    onPressAddButton: () => void, onSelect: (member: MemberData) => void
};

export default function MembersViewer({ currentUserId, members, creationData, onSelect, onPressAddButton }: Props) {

    const {theme, fontSizeType } = useContext(ThemeContext);

    return (
        <View style={[styles.container, { backgroundColor: Colors[theme.appearance].surface, }]}>
            <View>
                <View style={styles.header}>
                    <Text style={[styles.title,
                    { color: Colors[theme.appearance].textPrimary, fontSize: Typography[fontSizeType].md.fontSize }]}
                    >
                        Membros
                    </Text>
                    <Pressable onPress={onPressAddButton}>
                        <MaterialIcons name="add" size={24} color={Colors[theme.appearance].iconPrimary} />
                    </Pressable>
                </View>

                <View style={styles.viewer}>
                    {members.map((member) => (
                        <MemberViewItem
                            key={member.id}
                            currentUserId={currentUserId}
                            member={member}
                            onPressingItem={onSelect}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { height: "80%", flexDirection: "column", justifyContent: "space-between", gap: 10, padding: 10, borderRadius: 10 },
    header: { flexDirection: "row", justifyContent: "space-between", padding: 10 }, viewer: { gap: 10 },
    text: { fontSize: 12, fontStyle: 'italic' }, footer: { padding: 10 }, title: { fontSize: 16, alignSelf: "center" },
});
