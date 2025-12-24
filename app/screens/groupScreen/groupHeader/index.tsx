import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { useUser } from "@/app/context/UserProvider";
import SpaceFlight from "@/components/animations/spaceFlight";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";

interface Props {
    userRole: string;
    onPressButtonEdit: () => void;
}

export default function GroupHeader({ userRole, onPressButtonEdit }: Props) {
    const { preferences } = useContext(PreferencesContext);
    const { group } = useUser();

    if (!group?.name) return null;

    const groupName = group.name;

    return (
        <View style={styles.header}>
            <SpaceFlight height={100}>
                <View style={styles.headerContent}>
                    <View
                        style={[
                            styles.groupNameContent,
                            { backgroundColor: Colors[preferences.theme.appearance].bgTranspPrimary }
                        ]}
                    >
                        <Text
                            style={[
                                styles.title, {
                                    color: Colors[preferences.theme.appearance].textPrimary,
                                    fontSize: Typography[preferences.fontSizeType].lg.fontSize,
                                    lineHeight: Typography[preferences.fontSizeType].lg.lineHeight
                                }
                            ]}
                        >
                            {groupName}
                        </Text>

                        {userRole === "owner" && (
                            <Pressable onPress={onPressButtonEdit} style={{ marginLeft: 5 }}>
                                <MaterialIcons
                                    name="mode-edit"
                                    size={20}
                                    color={Colors[preferences.theme.appearance].iconPrimary}
                                />
                            </Pressable>
                        )}
                    </View>
                </View>
            </SpaceFlight>
        </View>
    );
}

