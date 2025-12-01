import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface MemberProps { id: string, name: string, role: string }

function MemberItem(
    { currentUserId, member, onPressingItem }: { currentUserId: string, member: MemberProps; onPressingItem: (member: MemberProps) => void }
) {
    return (
        <View style={styles.memberItem}>
            <View style={{ flexDirection: "row", gap: 5 }}>
                <Text style={{ alignSelf: "center", color: Colors.light.background }}>
                    {member.name}
                </Text>

                {currentUserId === member.id && (
                    <Text style={{ color: 'white', alignSelf: 'center' }}>(você)</Text>
                )}

                {member.role === "owner" && (
                    <View style={{ alignSelf: 'center' }}>
                        <MaterialIcons name="people" size={20} color={Colors.light.background} />
                    </View>
                )}
            </View>
            <Pressable
                style={{ alignSelf: 'center' }}
                onPress={() => onPressingItem({ id: member.id, name: member.name, role: member.role })}
            >
                <MaterialIcons name="more-vert" size={20} color={Colors.light.background} />
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

export default function MembersViewer({ currentUserId, members, creationData, onSelect, onPressAddButton }:
    {
        currentUserId: string, members: MemberProps[], creationData: { name: string, date: string },
        onPressAddButton: () => void, onSelect: (member: MemberProps) => void
    }
) {
    return (
        <View style={styles.container}>
            <View>
                <View style={styles.header}>
                    <Text style={styles.title}>Membros</Text>
                    <Pressable onPress={onPressAddButton}>
                        <MaterialIcons name="add" size={24} color={Colors.light.primary} />
                    </Pressable>
                </View>
                
                <View style={styles.viewer}>
                    {members.map((member) => (
                        <MemberItem
                            key={member.id}
                            currentUserId={currentUserId}
                            member={member}
                            onPressingItem={onSelect}
                        />
                    ))}
                </View>
            </View>
            <View style={styles.footer}>
                <Text style={styles.text}>Criado por {creationData.name} em {renderDate(creationData.date)}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { height: "80%", flexDirection: "column", justifyContent: "space-between", gap: 10, backgroundColor: Colors.light.surface, padding: 10, borderRadius: 10 },
    header: { flexDirection: "row", justifyContent: "space-between", padding: 10 }, viewer: { gap: 10 },
    text: { fontSize: 12, fontStyle: 'italic' }, footer: { padding: 10 }, title: { fontSize: 16, alignSelf: "center" },
    memberItem: {
        backgroundColor: Colors.light.primary, borderColor: Colors.light.border,
        padding: 10, borderRadius: 10, borderWidth: 0.5, flexDirection: "row", justifyContent: "space-between"
    }
});
