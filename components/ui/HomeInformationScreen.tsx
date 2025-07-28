import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface FirestoreMemberMap {
  [userId: string]: {
    name: string;
    type: string;
  };
}

interface MemberItem {
  id: string;
  name: string;
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
    ([id, data]) => ({
      id,
      name: data.name,
      role: data.type,
    })
  );

  const Item: React.FC<{
    member: MemberItem;
    onPress: (id: string, role: string) => void;
  }> = ({ member, onPress }) => {
    return (
      <Pressable
        style={styles.container}
      >
        <View style={styles.content}>
          <View style={{ gap: 10, flexDirection: "row" }}>
            <Text
              style={{
                alignSelf: "center",
                color: Colors.light.background,
              }}
            >
              {member.name}
            </Text>

            {member.role === "owner" && (
              <MaterialIcons
                name="people"
                size={20}
                color={Colors.light.background}
              />
            )}
          </View>
          <Pressable
            style={{ alignSelf: 'center' }}
            onPress={() => onPress(member.id, member.role)}
          >
            <MaterialIcons
              name="more-vert"
              size={20}
              color={Colors.light.background}
            />
          </Pressable>
        </View>
      </Pressable>
    );
  };

  const RecyclerItem = () => {
    return (
      <View style={styles.RecyclerItemContainer}>
        <View style={styles.RecyclerItemHeader}>
          <Text style={styles.text}>Membros</Text>
          <Pressable>
            <MaterialIcons
              name="add"
              size={28}
              color={Colors.light.highlightBackgroun_1}
            />
          </Pressable>
        </View>

        {parsedMembers.map((member) => (
          <Item
            key={member.id}
            member={member}
            onPress={(id, role) => console.log('id: ', id, ' role: ', role )}
          />
        ))}
      </View>
    );
  };

  function renderDate(createdAt: string) {
    const dateFull = createdAt.split("T")[0];
    const part = dateFull.split("-");
    const day = part[2];
    const monthNumber = parseInt(part[1], 10); // transforma em número
    const year = part[0];

    const monthNames = [
      "janeiro", "fevereiro", "março", "abril", "maio", "junho",
      "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];

    const monthName = monthNames[monthNumber - 1];

    return `${day} de ${monthName} de ${year}`;
  }

  function nameCreator() {
    if (!parsedMembers || parsedMembers.length === 0) return null;

    const creator = parsedMembers.find(member => String(member.id).trim() === String(createdBy).trim());

    return creator?.name ?? "Desconhecido";
  }

  return (
    <View style={{ padding: 10, gap: 10 }}>
      <Text style={styles.title}>Home {homeName}</Text>
      <Text>Criado por {nameCreator()} em {renderDate(createdAt)}</Text>
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
    padding: 10
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
