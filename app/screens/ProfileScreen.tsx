import { User } from '@/app/types/User';
import FloatingMenuButton from '@/components/ui/FloatingMenuButton';
import Header from '@/components/ui/Header';
import MenuButton from '@/components/ui/MenuButton';
import PersonalDataChange, { Function } from '@/components/ui/PersonalDataChange'; // Corrigido nome do enum
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
                    <MenuButton
                        onPress={() => {
                            setEditField(Function.ChangeName);
                            setIsDataChange(true);
                        }}
                        text="Editar nome"
                        iconName="arrow-right"
                        isHighlightText={false}
                        fontSize={14}
                    />

                    <MenuButton
                        onPress={() => {
                            setEditField(Function.ChangeEmail);
                            setIsDataChange(true);
                        }}
                        text="Alterar email"
                        iconName="arrow-right"
                        isHighlightText={false}
                        fontSize={14}
                    />

                    <MenuButton
                        onPress={() => {
                            setEditField(Function.ChangePassword);
                            setIsDataChange(true);
                        }}
                        text="Mudar senha"
                        iconName="arrow-right"
                        isHighlightText={false}
                        fontSize={14}
                    />

                    <MenuButton
                        onPress={() => onClose(true)}
                        text="Sair"
                        iconName="exit-to-app"
                        isHighlightText={false}
                        iconSize={24}
                        fontSize={14}
                    />

                    <MenuButton
                        onPress={() => onClose(true)}
                        text="Excluir conta"
                        isHighlightText={true}
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


                <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center' }}>
                    Informações da Casa
                </Text>

                <Text>Nome: {home.name}</Text>
                <Text>Membros</Text>

                <View style={{ gap: 10, flexDirection: 'row' }}>
                    <Text>Nome: Evelin Rios</Text>
                    <Text>Administrador</Text>
                </View>

                <View style={{ width: '100%', height: 0.5, backgroundColor: 'black', marginVertical: 10}}/>

                <ItemMenu2
                    name={'Configuraçõs'}
                    iconName={'settings'}
                    onPress={() => console.log('item pressed!')}
                />

                <ItemMenu2
                    name={'Aparência'}
                    iconName={'style'}
                    onPress={() => console.log('item pressed!')}
                />

                <View style={{ width: '100%', height: 0.5, backgroundColor: 'black', marginVertical: 10}}/>

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
