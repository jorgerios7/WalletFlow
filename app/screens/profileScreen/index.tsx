import LoadGroup from '@/app/services/firebase/groupService/loadGroup';
import { FetchUserData } from '@/app/services/firebase/UserService';
import { Group } from '@/app/types/Group';
import { PersonalDataChange, User } from '@/app/types/User';
import { Colors } from '@/constants/Colors';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AnimatedProfileMenu from './animatedProfileMenu';
import PersonalDataChangeScreen from './personalDataChangeScreen';

interface Props { onLogout: () => void; onDeleteAccount: () => void}

export default function ProfileScreen({ onLogout, onDeleteAccount}: Props) {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) return;

    const [update, setUpdate] = useState(false);

    useEffect(() => { fetchData() }, [update]);

    const insets = useSafeAreaInsets();
    const { width, height } = useWindowDimensions();
    const [collapseMenu, setCollapseMenu] = useState(false);
    const [isDataChange, setIsDataChange] = useState(false);
    const [editField, setEditField] = useState<PersonalDataChange>('none');
    const [userData, setUserData] = useState<User | null>(null)
    const [groupData, setGroupData] = useState<Group | null>(null);

    const fetchData = async () => {
        let user_data: User | null = null;
        let group_data: Group | null = null;

        try {
            user_data = await FetchUserData(currentUser.uid);
            if (user_data?.groupId) {
                group_data = await LoadGroup(user_data.groupId);
            }

            setUserData(user_data);
            setGroupData(group_data);

            setUpdate(false);
        } catch (error) {
            console.log('(ProfileScreen.tsx) erro ao baixar dados: ', error);
        }
    };

    const onClose = (isLogout: boolean) => {
        setCollapseMenu(true);
        setTimeout(() => {
            setCollapseMenu(false);
            if (isLogout) {
                onLogout();
            } else {
                onDeleteAccount();
            };
        }, 300);
    };

    return (
        <View>
            <View style={{
                width: width, height: height, paddingBottom: insets.bottom + 60, gap: 10,
                backgroundColor: Colors.light.shadow
            }}>
                <AnimatedProfileMenu
                    closedSize={45}
                    menuHeight={height - insets.bottom - 42}
                    menuWidth={width - 20}
                    title={`${userData?.identification.name} ${userData?.identification.surname}`}
                    subtitle={userData?.identification.email}
                    topPosition={10}
                    rightPosition={10}
                    profilePhoto={userData?.identification.profilePhoto}
                    collapseMenu={collapseMenu}
                    onEditingField={setEditField}
                    onDataChange={setIsDataChange}
                    onUpdating={setUpdate}
                    onDismiss={onClose}
                />

                <PersonalDataChangeScreen
                    editField={editField}
                    groupId={userData ? userData.groupId : ""}
                    isVisible={isDataChange}
                    onCancel={() => {
                        setIsDataChange(false);
                        setEditField('none');
                        setUpdate(true)
                    }}
                />

                <View style={{ gap: 10 }}>

                    
                </View>
            </View>
        </View>
    );
}
