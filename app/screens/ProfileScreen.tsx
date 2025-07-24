import { User } from '@/app/types/User';
import FloatingMenuButton from '@/components/ui/FloatingMenuButton';
import Header from '@/components/ui/Header';
import MenuButton from '@/components/ui/MenuButton';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';
import { Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home } from '../types/Home';

interface Props {
    user: User,
    home: Home,
    onLogout: () => void
}

export default function ProfileScreen({ user, home, onLogout }: Props) {
    const insets = useSafeAreaInsets();
    const { width, height } = useWindowDimensions();
    const [collapseMenu, setCollapseMenu] = useState(false);

    return (
        <View style={{
            width: '100%',
            height: '100%',
            paddingBottom: insets.bottom + 60,
            paddingTop: insets.top,
            gap: 10,
            backgroundColor: Colors.light.shadow
        }}>

            <Header backgroundColor={Colors.light.shadow}>
                <Text>Olá, {user.identification.name} {user.identification.surname}!</Text>
            </Header>

            <FloatingMenuButton
                closedSize={45}
                menuHeight={height - insets.bottom - 42}
                menuWidth={width - 20}
                title={user.identification.name}
                topPosition={37}
                rightPosition={10}
                profilePhoto={user.identification.profilePhoto}
                collapseMenu={collapseMenu}
            >
                <View style={{
                    width: '100%',
                    gap: 5,
                }}>
                    <MenuButton
                        onPress={() => console.log('edit name pressed!')}
                        text={'Editar nome'}
                        iconName={'arrow-right'}
                        isHighlightText={false}
                        fontSize={14}
                    />

                    <MenuButton
                        onPress={() => console.log('edit name pressed!')}
                        text={'Alterar email'}
                        iconName={'arrow-right'}
                        isHighlightText={false}
                        fontSize={14}
                    />

                    <MenuButton
                        onPress={() => console.log('edit name pressed!')}
                        text={'Mudar senha'}
                        iconName={'arrow-right'}
                        isHighlightText={false}
                        fontSize={14}
                    />

                    <MenuButton
                        onPress={() => {
                            setCollapseMenu(true);

                            console.log('menuClose pressed');
                            setTimeout(() => {
                                onLogout(); // <- executando a função corretamente
                                setCollapseMenu(false);

                                console.log('timeOut is terminted!');
                            }, 300);
                        }}
                        text={'Sair'}
                        iconName={'exit-to-app'}
                        isHighlightText={false}
                        iconSize={24}
                        fontSize={14}
                    />


                    <MenuButton
                        onPress={onLogout}
                        text={'Excluir conta'}
                        isHighlightText={true}
                        fontSize={14}
                        borderBottomColor={'transparent'}
                    />
                </View>
            </FloatingMenuButton>

            <View style={{
                gap: 10
            }}>
                <Text>
                    Idade: 32 anos
                </Text>

                <Text>
                    Email: {user.identification.email}
                </Text>





                <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center' }}>
                    Informações da Casa
                </Text>

                <Text>
                    Nome: {home.name}
                </Text>

                <Text>
                    Membros
                </Text>

                <View style={{
                    gap: 10,
                    flexDirection: 'row'
                }}>
                    <Text>
                        Nome: Evelin Rios
                    </Text>

                    <Text>
                        Administrador
                    </Text>
                </View>








            </View>


        </View>
    );
}