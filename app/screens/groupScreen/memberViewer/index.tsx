import { ThemeType } from "@/app/types/appearance";
import { MemberData } from "@/app/types/Group";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MemberViewItem from "../memberViewItem";

interface Props {
    currentUserId: string, members: MemberData[], creationData: { name: string, date: string },
    theme: ThemeType, onPressAddButton: () => void, onSelect: (member: MemberData) => void
};

export default function MembersViewer({ theme, currentUserId, members, creationData, onSelect, onPressAddButton }: Props) {

    function renderDate(createdAt: string) {
        const dateFull = createdAt.split("T")[0];
        const part = dateFull.split("-");
        const day = part[2];
        const monthNumber = parseInt(part[1], 10);
        const year = part[0];

        const monthNames = [
            "janeiro", "fevereiro", "março", "abril", "maio", "junho",
            "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
        ];

        const monthName = monthNames[monthNumber - 1];

        return `${day} de ${monthName} de ${year}`;
    };

    return (
        <View style={[styles.container, { backgroundColor: Colors[theme].surface, }]}>
            <View>
                <View style={styles.header}>
                    <Text style={[styles.title, { color: Colors[theme].textPrimary }]}>Membros</Text>
                    <Pressable onPress={onPressAddButton}>
                        <MaterialIcons name="add" size={24} color={Colors[theme].iconPrimary} />
                    </Pressable>
                </View>

                <View style={styles.viewer}>
                    {members.map((member) => (
                        <MemberViewItem theme={theme} key={member.id} currentUserId={currentUserId} member={member} onPressingItem={onSelect} />
                    ))}
                </View>
            </View>
            <View style={styles.footer}>
                <Text style={[styles.text, { color: Colors[theme].textSecondary }]}>Criado por {creationData.name} em {renderDate(creationData.date)}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { height: "80%", flexDirection: "column", justifyContent: "space-between", gap: 10, padding: 10, borderRadius: 10 },
    header: { flexDirection: "row", justifyContent: "space-between", padding: 10 }, viewer: { gap: 10 },
    text: { fontSize: 12, fontStyle: 'italic' }, footer: { padding: 10 }, title: { fontSize: 16, alignSelf: "center" },
});
