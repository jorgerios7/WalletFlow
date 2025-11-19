import { DeleteMember, PromoteOrDemote } from "@/app/services/firebase/GroupService";
import { MemberOptionMenu } from "@/components/ui/MemberOptionMenu";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
    currentUserId: string, groupId: string, groupName: string, createdAt: string, createdBy: string,
    memberList: FirestoreMemberMap, onUpdating: (isUpdate: boolean) => void
}

interface FirestoreMemberMap { [userId: string]: { name: string, role: string } }

interface MemberItem { id: string, name: string, role: string }

export default function GroupScreen({ currentUserId, groupId, groupName, createdAt, createdBy, memberList, onUpdating }: Props) {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) return;

    const [menuItemVisibility, setMenuItemVisibility] = useState(false);
    const [menuItemData, setMenuItemData] = useState({ id: '', name: '', role: '' });

    const parsedMembers: MemberItem[] = Object.entries(memberList).map(([id, data]) => ({ id, name: data.name, role: data.role }));

    const MemberItem: React.FC<{ member: MemberItem; onPress: (id: string, name: string, role: string) => void }> = ({ member, onPress }) => {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={{ flexDirection: "row", marginStart: 10, gap: 5 }}>
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
                        style={{ alignSelf: 'center', padding: 10, borderRadius: 20 }}
                        onPress={() => onPress(member.id, member.name, member.role)}
                    >
                        <MaterialIcons name="more-vert" size={20} color={Colors.light.background} />
                    </Pressable>
                </View>
            </View>
        );
    };

    const GroupMembersViewer = () => {
        return (
            <View style={styles.RecyclerItemContainer}>
                <View style={styles.RecyclerItemHeader}>
                    <Text style={styles.text}>Membros</Text>
                    <Pressable>
                        <MaterialIcons name="add" size={28} color={Colors.light.highlightBackgroun_1} />
                    </Pressable>
                </View>

                {parsedMembers.map((member) => (
                    <MemberItem
                        key={member.id}
                        member={member}
                        onPress={(id, name, role) => {
                            setMenuItemData(prev => ({ ...prev, id: id, name: name, role: role }));
                            setMenuItemVisibility(true);
                        }}
                    />
                ))}
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

    function nameCreator() {
        if (!parsedMembers || parsedMembers.length === 0) return null;

        const creator = parsedMembers.find(member => String(member.id).trim() === String(createdBy).trim());

        return creator?.name ?? "Desconhecido";
    }

    function renderUserRole() {
        if (!parsedMembers || parsedMembers.length === 0 || !currentUserId) return 'member';

        const role = parsedMembers.find(member => member.id.trim() === currentUserId.trim());

        return role?.role ?? 'member';
    }

    return (
        <View style={{ padding: 10, gap: 10 }}>
            <Text style={styles.title}>{groupName}</Text>

            <Text>Criado por {nameCreator()} em {renderDate(createdAt)}</Text>

            <GroupMembersViewer />

            <MemberOptionMenu
                isStarted={menuItemVisibility}
                role={renderUserRole()}
                selectedItem={menuItemData}
                onCancel={() => setMenuItemVisibility(false)}
                condition={'owner'}
                currentUid={currentUserId}
                onConfirm={(variables) => {
                    if (variables.delete) {
                        DeleteMember(groupId, variables.member);
                    } else if (variables.promote) {
                        PromoteOrDemote(true, groupId, variables.member)
                    } else if (variables.demote) {
                        PromoteOrDemote(false, groupId, variables.member)
                    }
                    onUpdating(false);
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 10,
        width: "100%",
        backgroundColor: Colors.light.highlightBackgroun_1,
        borderWidth: 0.5,
        borderColor: Colors.light.highlightBackgroun_1,
        borderRadius: 999,
        padding: 10,
    },
    content: {
        width: "100%",
        borderColor: Colors.light.highlightBackgroun_1,
        borderRadius: 999,
        borderWidth: 0.5,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        alignSelf: "center",
    },
    text: {
        alignSelf: "center",
    },
    RecyclerItemContainer: {
        gap: 10,
        backgroundColor: Colors.light.shadow,
        padding: 10,
        borderRadius: 20,
    },
    RecyclerItemHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
