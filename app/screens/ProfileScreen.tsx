import { User } from '@/app/types/User';
import FloatingMenuButton from '@/components/ui/FloatingMenuButton';
import Header from '@/components/ui/Header';
import { Colors } from '@/constants/Colors';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home } from '../types/Home';

type ProfileScreenRouteProp = RouteProp<{ Data: { user: User, home: Home } }, 'Data'>;

export default function ProfileScreen() {
    const route = useRoute<ProfileScreenRouteProp>();
    const { user, home } = route.params;
    const insets = useSafeAreaInsets();
    const { width, height } = useWindowDimensions();

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
                <Text>Olá, Jorge!</Text>
            </Header>

            <FloatingMenuButton
                buttonSize={45}
                menuHeight={height - insets.bottom - 42}
                menuWidth={width - 20}
                buttonLabel={'Olá usuário!'}
                topPosition={37}
                rightPosition={10}
            >
                <View style={{alignSelf: 'center'}}>
                    <Text style={{ fontSize: 50, fontWeight: 'bold', color: 'black', flexWrap: 'wrap', flexShrink: 1, }}>
                        Conteúdo aqui
                    </Text>
                </View>
            </FloatingMenuButton>

            <Text style={{
                fontSize: 18,
                fontWeight: 'bold',
                alignSelf: 'center'
            }}>
                {user.identification.name} {user.identification.surname}
            </Text>

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