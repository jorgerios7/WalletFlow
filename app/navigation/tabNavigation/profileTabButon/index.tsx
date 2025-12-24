import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { useUser } from "@/app/context/UserProvider";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useContext } from "react";
import { GestureResponderEvent, Image, Pressable, View } from "react-native";
import { styles } from "../styles";

interface Props { 
    onPress?: (event: GestureResponderEvent) => void;
};

const ProfileTabButton: React.FC<Props> = ({ onPress }) => {
    const { preferences } = useContext(PreferencesContext);
    const { profilePhotoUri } = useUser();

    const isFocused = useIsFocused();

    const dynamicBorderColor = isFocused
        ? Colors[preferences.theme.appearance].iconBackgroundPrimary
        : Colors[preferences.theme.appearance].background;

    return (
        <Pressable
            onPress={onPress}
            style={styles.tabButtonProfile}
        >
            <View
                style={[styles.photoContainer, { borderColor: dynamicBorderColor }]}
            >
                {profilePhotoUri ? (
                    <Image
                        source={{ uri: profilePhotoUri }}
                        style={styles.image}
                    />
                ) : (
                    <MaterialIcons
                        name={'person'}
                        size={28}
                        color={Colors[preferences.theme.appearance].iconPrimary}
                    />
                )}
            </View>
        </Pressable>
    );
};

export default ProfileTabButton