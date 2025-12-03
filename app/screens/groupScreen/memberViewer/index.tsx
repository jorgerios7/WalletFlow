import { ThemeType } from "@/app/types/appearance";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface MemberProps { id: string, name: string, role: string }

function MemberItem(
    { theme, currentUserId, member, onPressingItem }: { theme: ThemeType, currentUserId: string, member: MemberProps; onPressingItem: (member: MemberProps) => void }
) {
    return (
        <View style={[styles.memberItem, { backgroundColor: Colors[theme].surfaceVariant, borderColor: Colors[theme].border, }]}>
            <View style={{ flexDirection: "row", gap: 5 }}>
                <Text style={{ alignSelf: "center", color: Colors[theme].textPrimary }}>
                    {member.name}
                </Text>

                {currentUserId === member.id && (<Text style={{ color: Colors[theme].textPrimary, alignSelf: 'center' }}>(você)</Text>)}

                {member.role === "owner" && (
                    <View style={{ alignSelf: 'center' }}>
                        <MaterialIcons name="people" size={20} color={Colors[theme].primary} />
                    </View>
                )}
            </View>
            <Pressable
                style={{ alignSelf: 'center' }}
                onPress={() => onPressingItem({ id: member.id, name: member.name, role: member.role })}
            >
                <MaterialIcons name="more-vert" size={20} color={Colors[theme].primary} />
            </Pressable>
        </View>
    );
};

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
}

export default function MembersViewer({ theme, currentUserId, members, creationData, onSelect, onPressAddButton }:
    {
        currentUserId: string, members: MemberProps[], creationData: { name: string, date: string },
        theme: ThemeType, onPressAddButton: () => void, onSelect: (member: MemberProps) => void
    }
) {
    return (
        <View style={[styles.container, { backgroundColor: Colors[theme].surface, }]}>
            <View>
                <View style={styles.header}>
                    <Text style={[styles.title, {color: Colors[theme].textPrimary}]}>Membros</Text>
                    <Pressable onPress={onPressAddButton}>
                        <MaterialIcons name="add" size={24} color={Colors[theme].primary} />
                    </Pressable>
                </View>

                <View style={styles.viewer}>
                    {members.map((member) => (
                        <MemberItem
                            theme={theme}
                            key={member.id}
                            currentUserId={currentUserId}
                            member={member}
                            onPressingItem={onSelect}
                        />
                    ))}
                </View>
            </View>
            <View style={styles.footer}>
                <Text style={[styles.text, {color: Colors[theme].textSecondary}]}>Criado por {creationData.name} em {renderDate(creationData.date)}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { height: "80%", flexDirection: "column", justifyContent: "space-between", gap: 10, padding: 10, borderRadius: 10 },
    header: { flexDirection: "row", justifyContent: "space-between", padding: 10 }, viewer: { gap: 10 },
    text: { fontSize: 12, fontStyle: 'italic' }, footer: { padding: 10 }, title: { fontSize: 16, alignSelf: "center" },
    memberItem: {
        padding: 10, borderRadius: 10, borderWidth: 0.5, flexDirection: "row", justifyContent: "space-between"
    }
});
