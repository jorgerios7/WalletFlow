import { PreferencesContext } from '@/app/context/PreferencesProvider';
import { useUser } from '@/app/context/UserProvider';
import { Colors } from '@/constants/Colors';
import { useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ConfigurationsMenu from './configurationsMenu';
import ProfileHeader from './profileHeader';

export default function ProfileScreen() {
    const { preferences } = useContext(PreferencesContext);
    const { user } = useUser();

    if (!user?.identification.name) return null;

    const userName = user.identification.name;
    const userSurname = user.identification.surname;
    const userEmail = user.identification.email;

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: Colors[preferences.theme.appearance].background }
            ]}
        >
            <ProfileHeader
                user={{
                    name: userName,
                    surname: userSurname,
                    email: userEmail,
                }}
            />

            <ScrollView
                nestedScrollEnabled
                showsVerticalScrollIndicator
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: 10 }}
            >
                <ConfigurationsMenu />

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 10,
        padding: 10
    }
});
