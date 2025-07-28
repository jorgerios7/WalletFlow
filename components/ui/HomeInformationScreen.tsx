import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

export interface FirestoreMemberMap {
    [userId: string]: string;
}

interface MemberItem {
    id: string;
    role: string;
}

export default function HouseInformationScreen({
    homeName,
    createdAt,
    createdBy,
    memberList,
}: {
    homeName: string;
    createdAt: string;
    createdBy: string;
    memberList: FirestoreMemberMap;
}) {

    const parsedMembers: MemberItem[] = Object.entries(memberList).map(
        ([id, role]) => ({
            id,
            role,
        })
    );

    const Item: React.FC<{
        member: MemberItem;
    }> = ({ member }) => {
        return (
            <Pressable
                style={styles.container}
                onPress={() => console.log('user: ', member.id)}
            >
                <View style={styles.content}>
                    <View style={{ gap: 10, flexDirection: "row" }}>
                        <Text
                            style={{
                                alignSelf: "center",
                                color: Colors.light.background,
                            }}
                        >
                            {member.id}
                        </Text>

                        {member.role === "owner" ? (
                            <MaterialIcons
                                name="people"
                                size={20}
                                color={Colors.light.background}
                            />
                        ) : null}
                    </View>

                    <MaterialIcons
                        name="more-vert"
                        size={20}
                        color={Colors.light.background}
                    />
                </View>
            </Pressable>
        );
    };

    const RecyclerItem = () => {
        return (
            <View style={styles.RecyclerItemContainer}>
                <View style={styles.RecyclerItemHeader}>
                    <Text style={styles.text}>Membros</Text>
                    <View>
                        <MaterialIcons
                            name="add"
                            size={28}
                            color={Colors.light.highlightBackgroun_1}
                        />
                    </View>
                </View>

                {parsedMembers.map((item) => (
                    <Item key={item.id} member={item} />
                ))}
            </View>
        );
    };

    return (
        <View style={{ padding: 10, gap: 10 }}>
            <Text style={styles.title}>Home {homeName}</Text>
            <Text>Criado por: {createdBy}</Text>
            <Text>Criado em: {createdAt}</Text>
            <RecyclerItem />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 10,
        width: "100%",
        backgroundColor: Colors.light.highlightBackgroun_1,
        borderWidth: 0.5,
        borderColor: Colors.light.highlightBackgroun_1,
        borderRadius: 999,
        padding: 10,
    },
    content: {
        width: "100%",
        borderColor: Colors.light.highlightBackgroun_1,
        borderRadius: 999,
        borderWidth: 0.5,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        alignSelf: "center",
    },
    text: {
        alignSelf: "center",
    },
    RecyclerItemContainer: {
        gap: 10,
        backgroundColor: Colors.light.shadow,
        padding: 10,
        borderRadius: 20,
    },
    RecyclerItemHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
