import { DeleteMember, PromoteOrDemote } from "@/app/services/firebase/GroupService";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MemberOptionMenu } from "./memberOptionMenu";
import MembersViewer from "./memberViewer";

interface Props {
    currentUserId: string, groupId: string, groupName: string, createdAt: string, createdBy: string,
    memberList: FirestoreMemberMap, onPressingEditTitle: () => void, onUpdating: (isUpdate: boolean) => void
}

interface FirestoreMemberMap { [userId: string]: { name: string, role: string } }

interface MemberProps { id: string, name: string, role: string }

export default function GroupScreen({ currentUserId, groupId, groupName, createdAt, createdBy, memberList, onPressingEditTitle, onUpdating }: Props) {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) return;

    const [menuItemVisibility, setMenuItemVisibility] = useState(false);
    const [menuItemData, setMenuItemData] = useState({ id: '', name: '', role: '' });

    const parsedMembers: MemberProps[] = Object.entries(memberList).map(([id, data]) => ({ id, name: data.name, role: data.role }));

    function renderUserRole() {
        if (!parsedMembers || parsedMembers.length === 0 || !currentUserId) return 'member';

        const role = parsedMembers.find(member => member.id.trim() === currentUserId.trim());

        return role?.role ?? 'member';
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{groupName}</Text>
                <Pressable style={{ padding: 10 }} onPress={onPressingEditTitle}>
                    <MaterialIcons name="mode-edit" size={20} color={Colors.light.highlightBackgroun_1} />
                </Pressable>
            </View>
            <MembersViewer
                currentUserId={currentUserId}
                members={parsedMembers}
                creationData={{ name: "?", date: createdAt }}
                onSelect={({ id, name, role }) => {
                    setMenuItemData(prev => ({ ...prev, id: id, name: name, role: role }));
                    setMenuItemVisibility(true);
                }}
                onPressAddButton={() => console.log('add button has been pressed!')}
            />

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
    container: { padding: 10 }, header: { padding: 30, flexDirection: "row", alignSelf: "center" },
    title: { fontSize: 18, fontWeight: "bold", alignSelf: "center" }, text: { fontSize: 16, alignSelf: "center" },
});
