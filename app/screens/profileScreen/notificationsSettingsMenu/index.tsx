import { ThemeType } from "@/app/types/appearance";
import { View } from "react-native";
import MenuModal from "../menuModal";

interface Props {
    theme: ThemeType,isVisible: boolean, onDismiss: () => void
}

export default function NotificationsSettingsMenu({ theme, isVisible, onDismiss }: Props) {

    return (
     <MenuModal 
        theme={theme}
        isVisible={isVisible}
        title={'Notificações'}
        onDismiss={onDismiss}
        children={
            <View/>
        }
     
     />
    )
}