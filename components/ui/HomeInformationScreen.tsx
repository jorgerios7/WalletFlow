import { auth } from "@/app/config/firebaseConfig";
import { DeleteMember, PromoteOrDemote } from "@/app/services/firebase/HomeService";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MemberOptionMenu } from "./MemberOptionMenu";

interface FirestoreMemberMap {
  [userId: string]: {
    name: string;
    role: string;
  };
}

interface MemberItem {
  id: string;
  name: string;
  role: string;
}

export default function HomeInformationScreen({
  userId,
  homeId,
  homeName,
  createdAt,
  createdBy,
  memberList,
  update
}: {
  userId: string;
  homeId: string;
  homeName: string;
  createdAt: string;
  createdBy: string;
  memberList: FirestoreMemberMap;
  update: () => void
}) {

  const user = auth.currentUser;

  if (!user) return null;

  const [menuItemVisibility, setMenuItemVisibility] = useState(false);
  const [menuItemData, setMenuItemData] = useState({ id: '', name: '', role: '' });
  const [action, setAction] = useState({ promote: false, demote: false, delete: false });

  const parsedMembers: MemberItem[] = Object.entries(memberList).map(
    ([id, data]) => ({
      id,
      name: data.name,
      role: data.role,
    })
  );

  const Item: React.FC<{
    member: MemberItem;
    onPress: (id: string, name: string, role: string) => void;
  }> = ({ member, onPress }) => {
    return (
      <View
        style={styles.container}
      >
        <View style={styles.content}>
          <View style={{ gap: 10, flexDirection: "row", marginStart: 10 }}>
            <Text
              style={{
                alignSelf: "center",
                color: Colors.light.background,
              }}
            >
              {member.name}
            </Text>

            {member.role === "owner" && (
              <View style={{ alignSelf: 'center' }}>
                <MaterialIcons
                  name="people"
                  size={20}
                  color={Colors.light.background}
                />
              </View>
            )}
          </View>
          <Pressable
            style={{ alignSelf: 'center', padding: 10, borderRadius: 20 }}
            onPress={() => onPress(member.id, member.name, member.role)}
          >
            <MaterialIcons
              name="more-vert"
              size={20}
              color={Colors.light.background}
            />
          </Pressable>
        </View>
      </View>
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
            onPress={(id, name, role) => {
              setMenuItemData(prev => ({ ...prev, id: id, name: name, role: role }));
              setMenuItemVisibility(true);
            }}
          />
        ))}
      </View>
    );
  };

  function renderDate(createdAt: string) {
    const dateFull = createdAt.split("T")[0];
    const part = dateFull.split("-");
    const day = part[2];
    const monthNumber = parseInt(part[1], 10);
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

  function renderUserRole() {
    if (!parsedMembers || parsedMembers.length === 0 || !user?.uid) return 'member';

    const role = parsedMembers.find(
      member => member.id.trim() === user.uid.trim()
    );

    return role?.role ?? 'member';
  }

  return (
    <View style={{ padding: 10, gap: 10 }}>
      <Text style={styles.title}>Home {homeName}</Text>
      <Text>Criado por {nameCreator()} em {renderDate(createdAt)}</Text>
      <RecyclerItem />
      <MemberOptionMenu
        isStarted={menuItemVisibility}
        role={renderUserRole()}
        selectedItem={menuItemData}
        onCancel={() => setMenuItemVisibility(false)}
        condition={'owner'}
        currentUid={userId}
        onConfirm={(variables) => {
          console.log(variables);
          if (variables.delete) {
            DeleteMember(homeId, variables.member);
          } else if (variables.promote) {
            PromoteOrDemote(true, homeId, variables.member)
          } else if (variables.demote) {
            PromoteOrDemote(false, homeId, variables.member)
          }

          update();
        }}
      />
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
