import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { MemberData } from "@/app/types/Group";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { Pressable, Text, View } from "react-native";
import MemberViewItem from "./memberViewItem";
import { styles } from "./styles";

interface Props {
    currentUserId: string,
    members: MemberData[],
    onPressAddButton: () => void,
    onSelect: (member: MemberData) => void
};

export default function MembersViewer({ currentUserId, members, onSelect, onPressAddButton }: Props) {
    const { preferences } = useContext(PreferencesContext);

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: Colors[preferences.theme.appearance].surface }
            ]}
        >
            <View>
                <View
                    style={styles.header}
                >
                    <Text
                        style={[
                            styles.title,
                            {
                                color: Colors[preferences.theme.appearance].textPrimary,
                                fontSize: Typography[preferences.fontSizeType].md.fontSize
                            }
                        ]}
                    >
                        Membros
                    </Text>
                    <Pressable
                        onPress={onPressAddButton}
                    >
                        <MaterialIcons
                            name="add"
                            size={24}
                            color={Colors[preferences.theme.appearance].iconPrimary}
                        />
                    </Pressable>
                </View>

                <View
                    style={styles.viewer}
                >
                    {members.map((member) => (

                        <MemberViewItem
                            key={member.id}
                            currentUserId={currentUserId}
                            member={member}
                            onPressingItem={onSelect}
                        />

                    ))}
                </View>
            </View>
        </View>
    );
};

