import { PreferencesContext } from '@/app/context/PreferencesProvider';
import { PersonalDataChange, User } from '@/app/types/User';
import { Colors } from '@/constants/Colors';
import { useContext, useState } from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ConfigurationsMenu from './configurationsMenu';
import EditPersonalDataModal from './editPersonalDataModal';
import ProfileMenu from './profileMenu';

interface Props { userData: User, onUpdating: () => void, onDismiss: () => void }

export default function ProfileScreen({ userData, onUpdating, onDismiss }: Props) {
    const insets = useSafeAreaInsets();
    const { preferences } = useContext(PreferencesContext);
    const { width, height } = useWindowDimensions();
    const [collapseMenu, setCollapseMenu] = useState(false);
    const [editPersonalData, setEditPersonalData] = useState({ isVisible: false, field: "none" as PersonalDataChange });

    return (
        <View style={{ flex: 1, padding: 10, backgroundColor: Colors[preferences.theme.appearance].background, marginBottom: insets.bottom - 48 }}>
            <View style={{ height: 100, width: width }} />

            <ProfileMenu
                screen={{ width: width, height: height - insets.bottom - 120 }}
                user={{
                    email: userData?.identification.email as string,
                    name: userData
                        ? `${userData.identification.name} ${userData.identification.surname}`
                        : ""
                }}
                onSelect={(field) => setEditPersonalData({ isVisible: true, field: field })}
                collapse={collapseMenu}
            />

            <EditPersonalDataModal
                isVisible={editPersonalData.isVisible}
                field={editPersonalData.field}
                groupId={userData ? userData.groupId : ""}
                onSuccess={onUpdating}
                onDismiss={(isBackToInitScreen) => isBackToInitScreen
                    ? onDismiss()
                    : setEditPersonalData({ isVisible: false, field: "none" })}
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
