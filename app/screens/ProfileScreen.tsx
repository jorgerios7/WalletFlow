import { User } from '@/app/types/User';
import FloatingMenuButton from '@/components/ui/FloatingMenuButton';
import Header from '@/components/ui/Header';
import HouseInformationScreen from '@/components/ui/HomeInformationScreen';
import MenuButton from '@/components/ui/MenuButton';
import PersonalDataChange, { Function } from '@/components/ui/PersonalDataChange'; // Corrigido nome do enum
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { doc, getDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { db } from '../config/firebaseConfig';
import { Home } from '../types/Home';

interface Props {
    user: User;
    home: Home;
    onLogout: () => void;
}

export default function ProfileScreen({ user, home, onLogout }: Props) {
    const insets = useSafeAreaInsets();
    const { width, height } = useWindowDimensions();

    const [collapseMenu, setCollapseMenu] = useState(false);
    const [isDataChange, setIsDataChange] = useState(false);
    const [editField, setEditField] = useState<Function | null>(null);

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

    const fetchHomedata = async () => {
        try {
            const homeRef = doc(db, "homes", user.homeId);
            const homeDoc = await getDoc(homeRef);

            if (homeDoc.exists()) {
                const homeData = homeDoc.data();
                const memberIds: string[] = homeData.members; // assume que members é um array de UIDs
                console.log("Membros:", memberIds);
                return memberIds;
            } else {
                console.warn("Documento da casa não encontrado.");
                return [];
            }

        } catch (error) {
            console.error("Erro ao buscar dados da casa:", error);
            return [];
        }
    };

    const menuItems = [
        { text: 'Editar nome', action: Function.ChangeName },
        { text: 'Alterar email', action: Function.ChangeEmail },
        { text: 'Mudar senha', action: Function.ChangePassword },
    ];

    const members = [
        { name: 'Evelin Rios', type: 'adm' },
        { name: 'Kauana Rios', type: 'member' },
        { name: 'Ragnar Rios', type: 'member' },
        { name: 'Jorge Rios', type: 'member' }
    ]

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
                    Olá, {user.identification.name} {user.identification.surname}!
                </Text>
            </Header>

            <FloatingMenuButton
                closedSize={80}
                menuHeight={height - insets.bottom - 42}
                menuWidth={width - 20}
                title={user.identification.name}
                topPosition={10}
                rightPosition={10}
                profilePhoto={user.identification.profilePhoto}
                collapseMenu={collapseMenu}
            >
                <View style={{ width: '100%', gap: 5 }}>
                    {menuItems.map((item, index) => (
                        <MenuButton
                            key={index}
                            onPress={() => {
                                setEditField(item.action);
                                setIsDataChange(true);
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

            <PersonalDataChange
                isVisible={isDataChange}
                onCancel={() => {
                    setIsDataChange(false);
                    setEditField(null);
                }}
                editField={editField!}
            />

            <View style={{ gap: 10 }}>

                <HouseInformationScreen
                    createdAt={home.createdAt}
                    createdBy={home.createdBy}
                    homeName={home.name}
                    memberList={home.members}
                />

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
