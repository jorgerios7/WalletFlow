import { PreferencesContext } from "@/app/context/PreferencesProvider";
import DeleteMember from "@/app/services/firebase/groupService/deleteMember";
import PromoteOrDemote from "@/app/services/firebase/groupService/demote_or_demote";
import { UpdateField } from "@/app/services/firebase/groupService/updateField";
import { Creator, Delete, FirestoreMemberMap, MemberData } from "@/app/types/Group";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { MaterialIcons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { EditDataViewer } from "./editDataViewer";
import { MemberOptionMenu } from "./memberOptionMenu";
import MembersViewer from "./memberViewer";

interface Props {
    currentUserId: string, groupId: string, groupName: string, creator: Creator,
    memberList: FirestoreMemberMap, onUpdating: (isUpdating: boolean) => void, onExiting: () => void
};

export default function GroupScreen({ currentUserId, groupId, groupName, creator, memberList, onUpdating, onExiting }: Props) {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) return null;

    const { preferences } = useContext(PreferencesContext);

    const [menuItemVisibility, setMenuItemVisibility] = useState(false);
    const [menuItemData, setMenuItemData] = useState({ id: '', name: '', role: '' });
    const [editDataViewer, setEditDataViewer] = useState(false);

    const parsedMembers: MemberData[] = Object.entries(memberList).map(([id, data]) => ({ id, name: data.name, role: data.role }));

    function renderUserRole() {
        if (!parsedMembers || parsedMembers.length === 0 || !currentUserId) return 'member';

        const role = parsedMembers.find(member => member.id.trim() === currentUserId.trim());

        return role?.role ?? 'member';
    };

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
    };

    async function handleEditTitleName(newName: string) {
        await UpdateField({ label: "name", name: newName, groupId: groupId });
        onUpdating(true);
    };

    return (
        <View style={[styles.container, { backgroundColor: Colors[preferences.theme.appearance].background }]}>

            <View style={[styles.header, { backgroundColor: Colors[preferences.theme.appearance].headerBackground }]}>

                <View style={{ borderRadius: 999, backgroundColor: Colors[preferences.theme.appearance].accent, alignItems: 'center' }}>
                    <MaterialIcons name="groups" size={100} color={Colors[preferences.theme.appearance].textContrast} />
                </View>

                <View style={styles.headerContent}>
                    <Text style={[styles.title,
                    {
                        color: Colors[preferences.theme.appearance].textContrast, fontSize: Typography[preferences.fontSizeType].lg.fontSize,
                        lineHeight: Typography[preferences.fontSizeType].lg.lineHeight
                    }
                    ]}
                    >
                        {groupName}
                    </Text>
                    {renderUserRole() === "owner" && (
                        <Pressable style={{ padding: 10 }} onPress={() => setEditDataViewer(true)}>
                            <MaterialIcons name="mode-edit" size={20} color={Colors[preferences.theme.appearance].iconContrast} />
                        </Pressable>)
                    }
                </View>
            </View>

            <View style={[styles.container, { backgroundColor: 'transparent', padding: 10 }]} >
                <MembersViewer
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
                    currentName={groupName}
                    onSelected={handleEditTitleName}
                    onDismiss={() => setEditDataViewer(false)}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 }, title: { fontSize: 18, fontWeight: "bold", alignSelf: "center" }, text: { fontSize: 16, alignSelf: "center" },
    header: { padding: 30, borderBottomStartRadius: 10, borderBottomEndRadius: 10, justifyContent: 'center' },
    headerContent: { flexDirection: "row", justifyContent: 'center' }
});
