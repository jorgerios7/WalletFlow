import { auth } from "@/app/config/firebaseConfig";
import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { useUser } from "@/app/context/UserProvider";
import CreateGroup from "@/app/services/firebase/groupService/createGroup";
import CustomButton from "@/components/ui/CustomButton";
import DynamicLabelInput from "@/components/ui/DynamicLabelInput";
import TextButton from "@/components/ui/TextButton";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { signOut } from "firebase/auth";
import { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import IdAccessLink from "../IdAccessLink";

interface Props {
    onJoinGroup: () => void;
}

export default function CreateGroupScreen({ onJoinGroup }: Props) {
    const {
        user,
        userId,
        refresh
    } = useUser();

    if (!userId || !user) return null;

    const { preferences } = useContext(PreferencesContext);

    const [name, setName] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const handleCreateGroup = async () => {
        await CreateGroup({
            groupName: name,
            userId: userId,
            userFullName: `${user.identification.name} ${user.identification.surname}`,
            onSuccess: () => refresh(),
            onFailure: setMessage
        });
    };

    const handleLogout = async () => {
        await signOut(auth);
    }

    return (
        <View
            style={styles.content}
        >
            {message !== "" ?
                (
                    <View>
                        <Text
                            style={{
                                color: Colors[preferences.theme.appearance].textPrimary,
                                fontSize: Typography[preferences.fontSizeType].md.fontSize,
                                textAlign: "center", padding: 50
                            }}
                        >
                            {message}
                        </Text>

                        <CustomButton
                            text={"Ok"}
                            onPress={() => setMessage("")}
                        />

                    </View>
                ) : (
                    <>
                        <DynamicLabelInput
                            label="Nome do grupo"
                            initialText={name}
                            colorLabel={Colors[preferences.theme.appearance].surface}
                            onTextChange={setName}
                        />

                        <CustomButton
                            text={'Continuar'}
                            onPress={handleCreateGroup}
                        />

                        <IdAccessLink
                            onPress={onJoinGroup}
                        />

                        <TextButton
                            text={'Sair'}
                            adjustPadding={10}
                            onPress={handleLogout}
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