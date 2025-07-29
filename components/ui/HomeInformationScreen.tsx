import { auth } from "@/app/config/firebaseConfig";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import CustomButton from "./CustomButton";
import RadioButton from "./RadioButton";
import TextButton from "./TextButton";

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

  const user = auth.currentUser;

  if (!user) return null;

  const [menuItemVisibility, setMenuItemVisibility] = useState(false);
  const [menuItemData, setMenuItemData] = useState({ id: '', name: '' });

  const parsedMembers: MemberItem[] = Object.entries(memberList).map(
    ([id, data]) => ({
      id,
      name: data.name,
      role: data.type,
    })
  );

  const Item: React.FC<{
    member: MemberItem;
    onPress: (id: string, name: string) => void;
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
            onPress={() => onPress(member.id, member.name)}
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
            onPress={(id, name) => {
              setMenuItemData(prev => ({ ...prev, id: id, name: name }));
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


  function MenuItem({
    visibility,
    onCancel,
    selectedItem,
    role
  }: {
    visibility: boolean;
    onCancel: () => void;
    role: string;
    selectedItem: {
      id: string;
      name: string;
    };
  }) {
    type Option = {
      label: string;
      value: string;
    };

    const options: Option[] = [
      { label: "Promovê-lo a administrador", value: "promote" },
      { label: "Excluir usuário", value: "delete" },
    ];


    return (
      <Modal visible={visibility} animationType="fade" transparent>
        <View style={styles.overlay}>
          <View style={styles.menuItemContent}>
            {role !== 'owner' ? (
              <Text style={{ alignSelf: 'center' }}>
                Você ainda não tem permissões para administrar outros usuários!
              </Text>
            ) : (
              <>
                <Text style={styles.title}>
                  {selectedItem.name}
                </Text>
                <RadioButton
                  options={options}
                  onSelecting={(option) => console.log('selected option: ', option)}
                />
              </>
            )}


            {role === 'owner' && (
              <CustomButton text="Confirmar" />
            )}
            <TextButton
              text={role !== 'owner' ? ('Ok') : ('Cancel')}
              onPress={onCancel} />
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <View style={{ padding: 10, gap: 10 }}>
      <Text style={styles.title}>Home {homeName}</Text>
      <Text>Criado por {nameCreator()} em {renderDate(createdAt)}</Text>
      <RecyclerItem />
      <MenuItem
        visibility={menuItemVisibility}
        role={renderUserRole()}
        selectedItem={menuItemData}
        onCancel={() => setMenuItemVisibility(false)}
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
  overlay: {
    flex: 1,
    backgroundColor: "#00000088",
    justifyContent: "center",
    alignItems: "center",
  },
  menuItemContent: {
    width: "90%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    gap: 20,
    elevation: 4,
  },
});
