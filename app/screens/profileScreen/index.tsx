import { PersonalDataChange, User } from '@/app/types/User';
import { ThemeContext } from '@/components/ThemeProvider';
import { Colors } from '@/constants/Colors';
import { useContext, useState } from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppearanceSettingsMenu from './appearanceSettingsMenu';
import EditPersonalDataModal from './editPersonalDataModal';
import MenuTabButton from './menuTabButton';
import NotificationsSettingsMenu from './notificationsSettingsMenu';
import ProfileMenu from './profileMenu';

interface Props { userData: User, onUpdating: () => void, onDismiss: () => void }

export default function ProfileScreen({ userData, onUpdating, onDismiss }: Props) {
    const insets = useSafeAreaInsets();
    const { theme } = useContext(ThemeContext);
    const { width, height } = useWindowDimensions();
    const [collapseMenu, setCollapseMenu] = useState(false);
    const [editPersonalData, setEditPersonalData] = useState({ isVisible: false, field: "none" as PersonalDataChange });
    const [notificationsSettingsMenu, setNotificationsSettingsMenu] = useState({ isVisible: false });

    const [isExpanded, setIsExpanded] = useState(false);

    return (

        <View style={{ flex: 1, padding: 10, backgroundColor: Colors[theme.appearance].background, marginBottom: insets.bottom - 48 }}>
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

            <NotificationsSettingsMenu
                isVisible={notificationsSettingsMenu.isVisible}
                onDismiss={() => setNotificationsSettingsMenu({ isVisible: false })}
            />

            <ScrollView
                nestedScrollEnabled
                showsVerticalScrollIndicator
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: 20 }}
            >
                <View style={{ gap: 10 }}>
                    <MenuTabButton
                        openHeightSize={490}
                        iconName='color-lens' name={'Aparência'} iconSize={30}
                        onExpanding={(expanded) => setIsExpanded(!expanded)}
                    >
                        <AppearanceSettingsMenu expanded={isExpanded} />
                    </MenuTabButton>
                    <MenuTabButton
                        openHeightSize={200}
                        iconName='notifications' name={'Notificações'} iconSize={30}
                        onExpanding={() => console.log("notifications isExpanded")}
                        children={
                            <View />
                        }
                    />

                    <MenuTabButton
                        openHeightSize={200}
                        iconName='tune' name={'Preferências'} iconSize={30}
                        onExpanding={() => console.log("notifications isExpanded")}
                        children={
                            <View />
                        }
                    />
                </View>
            </ScrollView>
        </View>
    );
}
