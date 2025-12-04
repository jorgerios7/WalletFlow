import { ThemeType } from '@/app/types/appearance';
import { PersonalDataChange, User } from '@/app/types/User';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppearanceSettingsMenu from './appearanceSettingsMenu';
import EditPersonalDataModal from './editPersonalDataModal';
import MenuTabButton from './menuTabButton';
import NotificationsSettingsMenu from './notificationsSettingsMenu';
import ProfileMenu from './profileMenu';

interface Props { theme: ThemeType, userData: User, onUpdating: () => void, onDismiss: () => void }

export default function ProfileScreen({ theme, userData, onUpdating, onDismiss }: Props) {
    const insets = useSafeAreaInsets();
    const { width, height } = useWindowDimensions();
    const [collapseMenu, setCollapseMenu] = useState(false);
    const [editPersonalData, setEditPersonalData] = useState({ isVisible: false, field: "none" as PersonalDataChange });
    const [appearanceSettingsMenu, setAppearanceSettingsMenu] = useState({ isVisible: false });
    const [notificationsSettingsMenu, setNotificationsSettingsMenu] = useState({ isVisible: false });

    return (
        <View style={{ flex: 1, backgroundColor: Colors[theme].background, paddingBottom: insets.bottom + 60 }}>
            <View style={{ height: 150, width: width }} />

            <ProfileMenu
                theme={theme}
                screen={{ width: width, height: height - insets.bottom - 110 }}
                user={{
                    name: userData
                        ? `${userData.identification.name} ${userData.identification.surname}`
                        : "",
                    email: userData?.identification.email as string
                }}
                onSelect={(field) => setEditPersonalData({ isVisible: true, field: field })}
                collapse={collapseMenu}
            />

            <EditPersonalDataModal
                theme={theme}
                isVisible={editPersonalData.isVisible}
                field={editPersonalData.field}
                groupId={userData ? userData.groupId : ""}
                onSuccess={onUpdating}
                onDismiss={(isBackToInitScreen) => isBackToInitScreen
                    ? onDismiss()
                    : setEditPersonalData({ isVisible: false, field: "none" })}
            />

            <AppearanceSettingsMenu
                isVisible={appearanceSettingsMenu.isVisible}
                onDismiss={() => setAppearanceSettingsMenu({ isVisible: false })}
            />

            <NotificationsSettingsMenu
                theme={theme}
                isVisible={notificationsSettingsMenu.isVisible}
                onDismiss={() => setNotificationsSettingsMenu({ isVisible: false })}
            />

            <View style={{ gap: 5 }}>
                <MenuTabButton
                    theme={theme}
                    iconName='color-lens' name={'Aparência'} iconSize={30} onPress={() =>
                        setAppearanceSettingsMenu({ isVisible: true })
                    }
                />
                <MenuTabButton
                    theme={theme}
                    iconName='notifications' name={'Notificações'} iconSize={30} onPress={() =>
                        setNotificationsSettingsMenu({ isVisible: true })
                    }
                />
            </View>
        </View>
    );
}
