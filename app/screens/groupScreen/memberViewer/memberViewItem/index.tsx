import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { MemberData } from "@/app/types/Group";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";

interface Props {
    currentUserId: string,
    member: MemberData;
    onPressingItem: (member: MemberData) => void
}

export default function MemberViewItem({ currentUserId, member, onPressingItem }: Props) {
    const { preferences } = useContext(PreferencesContext);

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: Colors[preferences.theme.appearance].accent }
            ]}
        >
            <View
                style={styles.content}
            >
                <Text
                    style={[
                        styles.text,
                        {
                            color: Colors[preferences.theme.appearance].textContrast,
                            fontSize: Typography[preferences.fontSizeType].sm.fontSize,
                            lineHeight: Typography[preferences.fontSizeType].sm.lineHeight
                        }
                    ]}
                >
                    {member.name}
                </Text>

                {currentUserId === member.id && (
                    <Text
                        style={[
                            styles.text,
                            {
                                color: Colors[preferences.theme.appearance].textContrast,
                                fontSize: Typography[preferences.fontSizeType].sm.fontSize,
                                lineHeight: Typography[preferences.fontSizeType].sm.lineHeight
                            }
                        ]}
                    >
                        (você)
                    </Text>
                )}

                {member.role === "owner" && (
                    <View
                        style={styles.containerOwnerIcon}
                    >
                        <MaterialIcons name="people" size={20} color={Colors[preferences.theme.appearance].iconContrast} />
                    </View>
                )}
            </View>
            <Pressable
                style={styles.containerShare}
                onPress={() => onPressingItem({ id: member.id, name: member.name, role: member.role })}
            >
                <MaterialIcons
                    name="more-vert"
                    size={20}
                    color={Colors[preferences.theme.appearance].iconContrast}
                />
            </Pressable>
        </View>
    );
};