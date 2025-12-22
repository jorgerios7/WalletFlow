import { auth, db } from "@/app/config/firebaseConfig";
import { UpdateUsernameProps } from "@/app/types/User";
import { HandleErroMessage } from "@/components/ui/HandleErroMessage";
import ValidateEmptyFields from "@/components/ValidateEmptyFields";
import { doc, updateDoc } from "firebase/firestore";
import { Alert } from "react-native";

export default async function UpdateUserName(value: UpdateUsernameProps) {
  const user = auth.currentUser;
  if (!user) throw new Error("Usuário não autenticado.");

  const inputs = { name: value.newName, surname: value.newSurname }
  const labels = { name: 'nome', surname: 'sobrenome' }

  const isEmpty = !value.newName || !value.newSurname;
  if (isEmpty) {
    const msg = ValidateEmptyFields(inputs, labels);
    if (msg) {
      Alert.alert("Erro", msg);
      throw new Error(msg);
    }
  }

  const fullName = `${value.newName} ${value.newSurname}`;

  try {
    await updateDoc(doc(db, "users", user.uid), {
      "identification.name": value.newName.trim(),
      "identification.surname": value.newSurname.trim(),
    });

    await updateDoc(doc(db, 'groups', value.groupId), {
      [`members.${user.uid}.name`]: fullName.trim(),
    });

    Alert.alert("Sucesso", "Nome e sobrenome foram atualizados.");
  } catch (error: any) {
    const msg = HandleErroMessage(error.code)
    Alert.alert("Erro", msg);
    throw error;
  }
}

