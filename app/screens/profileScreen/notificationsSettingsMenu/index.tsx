import { View } from "react-native";
import MenuModal from "../menuModal";

interface Props {
    isVisible: boolean, onDismiss: () => void
}

export default function NotificationsSettingsMenu({ isVisible, onDismiss }: Props) {
    return (
        <MenuModal
            isVisible={isVisible}
            title={'Notificações'}
            onDismiss={onDismiss}
            children={
                <View />
            }

        />
    );
}