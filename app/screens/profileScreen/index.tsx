import { LoadScreen } from '@/app/pages/LoadScreen';
import { FetchGroupData } from '@/app/services/firebase/GroupService';
import { FetchUserData } from '@/app/services/firebase/UserService';
import { Group } from '@/app/types/Group';
import { User } from '@/app/types/User';
import GroupInformationScreen from '@/components/ui/GroupInformationScreen';
import Header from '@/components/ui/Header';
import MenuButton from '@/components/ui/MenuButton';
import { Colors } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Pressable, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MenuTabButton from './menuTabButton';
import PersonalDataChangeScreen, { Function } from './personalDataChangeScreen';
import ProfileMenuButton from './profileMenuButton';

interface Props {
    onLogout: () => void;
    onDeleteAccount: () => void;
    onNavigate: (locate: string) => void;
}

export default function ProfileScreen({ onLogout, onDeleteAccount, onNavigate }: Props) {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) return;

    const [update, setUpdate] = useState(false);

    useEffect(() => { fetchData() }, [update]);

    const insets = useSafeAreaInsets();
    const { width, height } = useWindowDimensions();
    const [collapseMenu, setCollapseMenu] = useState(false);
    const [isDataChange, setIsDataChange] = useState(false);
    const [editField, setEditField] = useState<Function>('');
    const [userData, setUserData] = useState<User | null>(null)
    const [groupData, setGroupData] = useState<Group | null>(null);

    const fetchData = async () => {
        let user_data: User | null = null;
        let group_data: Group | null = null;

        try {
            user_data = await FetchUserData(currentUser.uid);
            if (user_data?.groupId) {
                group_data = await FetchGroupData(user_data.groupId);
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
            {!userData || !groupData ? (
                <LoadScreen />
            ) : (
                <View style={{
                    width: width,
                    height: height,
                    paddingBottom: insets.bottom + 60,
                    marginTop: insets.top,
                    gap: 10,
                    backgroundColor: Colors.light.shadow,
                }}>
                    <Header direction='normal' backgroundColor={Colors.light.shadow}>

                        <Pressable
                            onPress={() => onNavigate('Tabs')}
                            style={{
                                padding: 12,
                                backgroundColor: 'transparent',
                                alignSelf: 'flex-start'
                            }}
                        >
                            <Feather
                                style={{ padding: 3.8 }}
                                name="chevron-left"
                                color={Colors.light.highlightBackgroun_1}
                                size={30}
                            />
                        </Pressable>
                    </Header>

                    <ProfileMenuButton
                        closedSize={45}
                        menuHeight={height - insets.bottom - 42}
                        menuWidth={width - 20}
                        title={`${userData?.identification.name} ${userData?.identification.surname}`}
                        subtitle={userData?.identification.email}
                        topPosition={10}
                        rightPosition={10}
                        profilePhoto={userData?.identification.profilePhoto}
                        collapseMenu={collapseMenu}
                    >
                        <View style={{ width: '100%', gap: 5 }}>

                            <MenuButton
                                text="Editar Nome"
                                iconName="arrow-right"
                                iconSize={24}
                                fontSize={14}
                                onPress={() => {
                                    setEditField('ChangeName');
                                    setIsDataChange(true);
                                    setUpdate(true);
                                }}
                            />

                            <MenuButton
                                text="Alterar Email"
                                iconName="arrow-right"
                                iconSize={24}
                                fontSize={14}
                                onPress={() => {
                                    setEditField('ChangeEmail');
                                    setIsDataChange(true);
                                    setUpdate(true);
                                }}
                            />

                            <MenuButton
                                text="Mudar Senha"
                                iconName="arrow-right"
                                iconSize={24}
                                fontSize={14}
                                onPress={() => {
                                    setEditField('ChangePassword');
                                    setIsDataChange(true);
                                    setUpdate(true);
                                }}
                            />

                            <MenuButton
                                onPress={() => onClose(true)}
                                text="Sair"
                                iconName="exit-to-app"
                                iconSize={24}
                                fontSize={14}
                            />

                            <MenuButton
                                onPress={() => onClose(false)}
                                text="Excluir conta"
                                isHighlightText
                                fontSize={14}
                                borderBottomColor="transparent"
                            />
                        </View>
                    </ProfileMenuButton>

                    <PersonalDataChangeScreen
                        editField={editField}
                        groupId={userData.groupId}
                        isVisible={isDataChange}
                        onCancel={() => {
                            setIsDataChange(false);
                            setEditField('');
                            setUpdate(true)
                        }}
                    />

                    <View style={{ gap: 10 }}>
                        <GroupInformationScreen
                            createdAt={groupData.createdAt}
                            createdBy={groupData.createdBy}
                            currentUserId={currentUser.uid}
                            groupId={userData.groupId}
                            groupName={groupData.name}
                            memberList={groupData.members}
                            update={() => setUpdate(true)}
                        />

                        <View style={{ width: '100%', height: 0.5, backgroundColor: 'black', marginVertical: 10 }} />

                        <MenuTabButton
                            name={'Configurações'}
                            iconName={'settings'}
                            onPress={() => onNavigate("ConfigurationScreen")}
                        />

                        <MenuTabButton
                            name={'Ajuda'}
                            iconName={'help'}
                            onPress={() => onNavigate("HelpScreen")}
                        />

                        <MenuTabButton
                            name={'Feedback'}
                            iconName={'feedback'}
                            onPress={() => onNavigate("FeedbackScreen")}
                        />
                    </View>
                </View>
            )}
        </View>
    );
}
