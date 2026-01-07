import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { useUser } from "@/app/context/UserProvider";
import JoinGroup from "@/app/services/firebase/groupService/joinGroup";
import CustomButton from "@/components/ui/CustomButton";
import DynamicLabelInput from "@/components/ui/DynamicLabelInput";
import TextButton from "@/components/ui/TextButton";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
    onDismiss: () => void;
}

export default function JoinGroupScreen({ onDismiss }: Props) {
    const {
        user,
        userId,
        refresh
    } = useUser();

    if (!userId || !user) return null;

    const { preferences } = useContext(PreferencesContext);

    const [groupId, setGroupId] = useState<string>("");
    const [failure, setFailure] = useState<string>("");

    const handleJoinGroup = async () => {
        await JoinGroup({
            userId: userId,
            groupId: groupId,
            userFullName: `${user.identification.name} ${user.identification.surname}`,
            onSuccess: () => refresh(),
            onFailure: setFailure
        });
    }

    return (
        <View
            style={styles.content}
        >
            {failure !== "" ? (
                <>
                    <Text
                        style={{
                            color: Colors[preferences.theme.appearance].textPrimary,
                            fontSize: Typography[preferences.fontSizeType].md.fontSize,
                            textAlign: "center", padding: 50
                        }}
                    >
                        {failure}
                    </Text>

                    <CustomButton
                        text={"Ok"}
                        onPress={() => setFailure("")}
                    />
                </>
            ) : (
                <>
                    <DynamicLabelInput
                        label="ID do grupo"
                        initialText={groupId}
                        colorLabel={Colors[preferences.theme.appearance].surface}
                        onTextChange={setGroupId}
                    />

                    <CustomButton
                        text={'Continuar'}
                        onPress={handleJoinGroup}
                    />

                    <TextButton
                        text={'Voltar'}
                        adjustPadding={10}
                        onPress={onDismiss}
                    />
                </>
            )}
        </View>
    );

}

const styles = StyleSheet.create({
    content: {
        width: "100%",
        gap: 10,
        alignSelf: "center",
        flexDirection: "column",
        backgroundColor: "transparent",
    }
});