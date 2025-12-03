import DeleteMember from "@/app/services/firebase/groupService/deleteMember";
import PromoteOrDemote from "@/app/services/firebase/groupService/demote_or_demote";
import { UpdateField } from "@/app/services/firebase/groupService/updateField";
import { ThemeType } from "@/app/types/appearance";
import { Creator, Delete } from "@/app/types/Group";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { EditDataViewer } from "./editDataViewer";
import { MemberOptionMenu } from "./memberOptionMenu";
import MembersViewer from "./memberViewer";

interface Props {
    theme: ThemeType, currentUserId: string, groupId: string, groupName: string, creator: Creator,
    memberList: FirestoreMemberMap, onUpdating: (isUpdating: boolean) => void, onExiting: () => void
}

interface FirestoreMemberMap { [userId: string]: { name: string, role: string } }

interface MemberProps { id: string, name: string, role: string }

export default function GroupScreen({ theme, currentUserId, groupId, groupName, creator, memberList, onUpdating, onExiting }: Props) {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) return;

    const [menuItemVisibility, setMenuItemVisibility] = useState(false);
    const [menuItemData, setMenuItemData] = useState({ id: '', name: '', role: '' });
    const [editDataViewer, setEditDataViewer] = useState(false);

    const parsedMembers: MemberProps[] = Object.entries(memberList).map(([id, data]) => ({ id, name: data.name, role: data.role }));

    function renderUserRole() {
        if (!parsedMembers || parsedMembers.length === 0 || !currentUserId) return 'member';

        const role = parsedMembers.find(member => member.id.trim() === currentUserId.trim());

        return role?.role ?? 'member';
    }

    async function memberOptionsMenuActions(
        variables: { member: string, promote: boolean, demote: boolean, delete: { who: Delete; value: boolean } }
    ) {
        if (variables.delete.value) {
            if (variables.delete.who === "deleteMyself") {
                await DeleteMember(groupId, variables.member);
                onExiting()
            } else if (variables.delete.who === "deleteMember") {
                await DeleteMember(groupId, variables.member);
                onUpdating(true);
            };
            return;
        } else if (variables.promote) {
            await PromoteOrDemote(true, groupId, variables.member);
            onUpdating(true);
            return;
        } else if (variables.demote) {
            await PromoteOrDemote(false, groupId, variables.member);
            onUpdating(true);
            return;
        }
    }

    async function handleEditTitleName(newName: string) {
        await UpdateField({ label: "name", name: newName, groupId: groupId });
        onUpdating(true);
    }

    return (
        <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
            <View style={styles.header}>

                <Text style={[styles.title, { color: Colors[theme].textPrimary }]}>{groupName}</Text>
                {renderUserRole() === "owner" && (
                    <Pressable style={{ padding: 10 }} onPress={() => setEditDataViewer(true)}>
                        <MaterialIcons name="mode-edit" size={20} color={Colors[theme].primary} />
                    </Pressable>)
                }
            </View>
            <MembersViewer
                theme={theme}
                currentUserId={currentUserId}
                members={parsedMembers}
                creationData={{ name: creator.name, date: creator.createdAt }}
                onSelect={({ id, name, role }) => {
                    setMenuItemData(prev => ({ ...prev, id: id, name: name, role: role }));
                    setMenuItemVisibility(true);
                }}
                onPressAddButton={() => console.log('add button has been pressed!')}
            />

            <MemberOptionMenu
                theme={theme}
                isStarted={menuItemVisibility}
                role={renderUserRole()}
                selectedItem={menuItemData}
                onCancel={() => setMenuItemVisibility(false)}
                currentUid={currentUserId}
                onConfirm={(variables) => {
                    console.log('variable: ', variables)
                    memberOptionsMenuActions(variables)
                }}
            />

            <EditDataViewer
                isVisible={editDataViewer}
                theme={theme}
                currentName={groupName}
                onSelected={handleEditTitleName}
                onDismiss={() => setEditDataViewer(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 10 }, header: { padding: 30, flexDirection: "row", alignSelf: "center" },
    title: { fontSize: 18, fontWeight: "bold", alignSelf: "center" }, text: { fontSize: 16, alignSelf: "center" },
});
