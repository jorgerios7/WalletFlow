import { User } from '@/app/types/User';
import { Colors } from '@/constants/Colors';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home } from '../types/Home';

type ProfileScreenRouteProp = RouteProp<{ Data: { user: User, home: Home } }, 'Data'>;

export default function ProfileScreen() {
    const route = useRoute<ProfileScreenRouteProp>();
    const { user, home } = route.params;
    const insets = useSafeAreaInsets();

    return (
        <View style={{
            width: '100%',
            height: '100%',
            paddingBottom: insets.bottom + 60,
            paddingTop: insets.top,
            gap: 10,
            backgroundColor: Colors.light.shadow
        }}>

            <View style={{
                width: 150,
                height: 150,
                borderColor: 'black',
                borderWidth: 0.5,
                borderRadius: 75,
                backgroundColor: 'orange',
                alignSelf: 'center'
            }}>

            </View>

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