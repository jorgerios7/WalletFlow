import { User } from '@/app/types/User';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Text, View } from 'react-native';

type ProfileScreenRouteProp = RouteProp<{ Perfil: { user: User } }, 'Perfil'>;

export default function ProfileScreen() {
    const route = useRoute<ProfileScreenRouteProp>();
    const { user } = route.params;

    return (
        <View >
            <Text >
                Olá, {user.identification.name} {user.identification.surname}!
            </Text>
        </View>
    );
}