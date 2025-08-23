import { User } from '@/app/types/User';
import FloatingMenuButton from '@/components/ui/FloatingMenuButton';
import GroupInformationScreen from '@/components/ui/GroupInformationScreen';
import Header from '@/components/ui/Header';
import MenuButton from '@/components/ui/MenuButton';
import PersonalDataChange, { Function } from '@/components/ui/PersonalDataChange';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FetchGroupData } from '../services/firebase/GroupService';
import { FetchUserData } from '../services/firebase/UserService';
import { Group } from '../types/Group';

interface Props {
    onLogout: () => void;
}

export default function ProfileScreen({ onLogout }: Props) {

    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) return;

    const [update, setUpdate] = useState(false);

    useEffect(() => { fetchData() }, [update]);

    const insets = useSafeAreaInsets();
    const { width, height } = useWindowDimensions();
    const [collapseMenu, setCollapseMenu] = useState(false);
    const [isDataChange, setIsDataChange] = useState(false);
    const [editField, setEditField] = useState<Function | null>(null);
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
            if (isLogout) onLogout();
        }, 300);
    };

    const ItemMenu2: React.FC<{
        onPress: () => void;
        name: string;
        iconName: keyof typeof MaterialIcons.glyphMap;
        iconSize?: number
    }> = ({ onPress, name, iconName, iconSize }) => {
        return (
            <Pressable
                onPress={onPress}
                style={{
                    width: '100%',
                    height: 50,
                    gap: 20,
                    backgroundColor: Colors.light.border,
                    flexDirection: 'row',
                    padding: 10,
                    borderBottomColor: Colors.light.highlightBackgroun_1,
                    borderBottomWidth: 0.5,

                }}>

                <MaterialIcons
                    name={iconName}
                    size={iconSize ? iconSize : 28}
                    color={Colors.light.highlightBackgroun_1}
                />

                <Text style={{ alignSelf: 'center', fontSize: 14, fontWeight: 'bold' }}>
                    {name}
                </Text>
            </Pressable>
        );
    }

    const menuItems = [
        { text: 'Editar nome', action: Function.ChangeName },
        { text: 'Alterar email', action: Function.ChangeEmail },
        { text: 'Mudar senha', action: Function.ChangePassword },
    ];

    return (
        <View
            style={{
                width: width,
                height: height,
                paddingBottom: insets.bottom + 60,
                paddingTop: insets.top,
                gap: 10,
                backgroundColor: Colors.light.shadow,
            }}
        >
            <Header backgroundColor={Colors.light.shadow}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold'
                }}>
                    Olá, {userData?.identification.name} {userData?.identification.surname}!
                </Text>
            </Header>

            <FloatingMenuButton
                closedSize={80}
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
                    {menuItems.map((item, index) => (
                        <MenuButton
                            key={index}
                            onPress={() => {
                                setEditField(item.action);
                                setIsDataChange(true);
                                setUpdate(true);
                            }}
                            text={item.text}
                            iconName='arrow-right'
                            fontSize={14}
                        />
                    ))}

                    <MenuButton
                        onPress={() => onClose(true)}
                        text="Sair"
                        iconName="exit-to-app"
                        iconSize={24}
                        fontSize={14}
                    />

                    <MenuButton
                        onPress={() => onClose(true)}
                        text="Excluir conta"
                        isHighlightText
                        fontSize={14}
                        borderBottomColor="transparent"
                    />
                </View>
            </FloatingMenuButton>

            {userData?.groupId && (
                <PersonalDataChange
                    groupId={userData.groupId}
                    isVisible={isDataChange}
                    onCancel={() => {
                        setIsDataChange(false);
                        setEditField(null);
                        setUpdate(true)
                    }}
                    editField={editField!}
                />)}

            <View style={{ gap: 10 }}>
                {groupData && userData && (
                    <GroupInformationScreen
                        createdAt={groupData.createdAt}
                        createdBy={groupData.createdBy}
                        currentUserId={currentUser.uid}
                        groupId={userData.groupId}
                        groupName={groupData.name}
                        memberList={groupData.members}
                        update={() => setUpdate(true)}
                    />
                )}

                <View style={{ width: '100%', height: 0.5, backgroundColor: 'black', marginVertical: 10 }} />

                <ItemMenu2
                    name={'Configuraçõs'}
                    iconName={'settings'}
                    onPress={() => console.log('item pressed!')}
                />

                <ItemMenu2
                    name={'Ajuda'}
                    iconName={'help'}
                    onPress={() => console.log('item pressed!')}
                />

                <ItemMenu2
                    name={'Feedback'}
                    iconName={'feedback'}
                    onPress={() => console.log('item pressed!')}
                />
            </View>
        </View>
    );
}
