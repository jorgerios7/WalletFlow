import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { useUser } from "@/app/context/UserProvider";
import DeleteMember from "@/app/services/firebase/groupService/deleteMember";
import PromoteOrDemote from "@/app/services/firebase/groupService/demote_or_demote";
import { UpdateField } from "@/app/services/firebase/groupService/updateField";
import { Delete, MemberData } from "@/app/types/Group";
import { Colors } from "@/constants/Colors";
import { useContext, useState } from "react";
import { View } from "react-native";
import { EditDataViewer } from "./editDataViewer";
import GroupHeader from "./groupHeader";
import { MemberOptionMenu } from "./memberOptionMenu";
import MembersViewer from "./memberViewer";
import { styles } from "./styles";

export default function GroupScreen() {
    const { preferences } = useContext(PreferencesContext);
    const { userId, user, group, refresh } = useUser();

    if (!user?.groupId || !group?.name || !group?.creation) return null;

    const currentUserId = userId;
    const groupId = user.groupId;
    const groupName = group.name;
    const memberList = group.members;

    const [menuItemVisibility, setMenuItemVisibility] = useState(false);
    const [menuItemData, setMenuItemData] = useState({ id: '', name: '', role: '' });
    const [editDataViewer, setEditDataViewer] = useState(false);

    const parsedMembers: MemberData[] = Object.entries(memberList).map(([id, data]) => ({ id, name: data.name, role: data.role }));

    function renderUserRole() {
        if (!parsedMembers || parsedMembers.length === 0 || !currentUserId) {
            return 'member'
        };

        const role = parsedMembers.find(member => member.id.trim() === currentUserId.trim());

        return role?.role ?? 'member';
    };

    async function memberOptionsMenuActions(
        variables: { member: string, promote: boolean, demote: boolean, delete: { who: Delete; value: boolean } }
    ) {
        if (variables.delete.value) {
            if (variables.delete.who === "deleteMyself") {
                await DeleteMember(groupId, variables.member);
                console.log("GroupScreen.tsx - return to init");
            } else if (variables.delete.who === "deleteMember") {
                await DeleteMember(groupId, variables.member);
                refresh();
            };

            return;
        } else if (variables.promote) {
            await PromoteOrDemote(true, groupId, variables.member);
            refresh();
            return;
        } else if (variables.demote) {
            await PromoteOrDemote(false, groupId, variables.member);
            refresh();
            return;
        }
    };

    async function handleEditTitleName(newName: string) {
        await UpdateField({ label: "name", name: newName, groupId: groupId });
        refresh();
    };

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: Colors[preferences.theme.appearance].background }
            ]}
        >
            <GroupHeader
                userRole={renderUserRole()}
                onPressButtonEdit={() => setEditDataViewer(true)}
            />

            <View
                style={styles.content}
            >
                <MembersViewer
                    currentUserId={currentUserId as string}
                    members={parsedMembers}
                    onSelect={({ id, name, role }) => {
                        setMenuItemData(prev => ({ ...prev, id: id, name: name, role: role }));
                        setMenuItemVisibility(true);
                    }}
                    onPressAddButton={() => console.log('(GroupScreen.tsx) add button has been pressed!')}
                />

                <MemberOptionMenu
                    isStarted={menuItemVisibility}
                    role={renderUserRole()}
                    selectedItem={menuItemData}
                    onCancel={() => setMenuItemVisibility(false)}
                    currentUid={currentUserId as string}
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
