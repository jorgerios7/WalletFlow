import { auth, db } from "@/app/config/firebaseConfig";
import { User } from "@/app/types/User";
import ValidateEmptyFields from "@/components/ValidateEmptyFields";
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail, updatePassword } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Alert } from "react-native";

export async function FetchUserData(uid: string): Promise<User | null> {
  if (!uid || uid.trim() === "") return null;

  let data: User | null = null;

  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      data = userSnap.data() as User;
    }

  } catch (error) {

    console.error("(UserService) Erro ao buscar usuário:", error);
  } finally {

    console.log("(UserService.tsx) Os dados do usuário foram atualizados com sucesso!");
    return data;
  }
}

export async function UpdatePassword(
  currentPassword: string, newPassword: string, repeatNewPassword: string
) {
  const user = auth.currentUser;
  if (!user || !user.email) return;

  const inputs = { cPassword: currentPassword, nPassword: newPassword, rNewPassword: repeatNewPassword }
  const labels = { cPassword: 'senha atual', nPassword: 'nova senha', rNewPassword: 'repetir nova senha' }

  const isEmpty = !currentPassword || !newPassword || !repeatNewPassword;
  const isNotTheSame = newPassword !== repeatNewPassword;

  if (isEmpty) {
    const msg = ValidateEmptyFields(inputs, labels)
    { msg && Alert.alert("Erro", msg) }
    return;
  } else if (isNotTheSame) {
    Alert.alert("As senhas não coincidem", "Certifique-se de que ambas as senhas sejam iguais.");
    return;
  }

  try {
    const credential = EmailAuthProvider.credential(
      user.email, currentPassword
    );

    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
    
    Alert.alert("Sucesso", "Senha atualizada.");
  } catch (error) {
    console.error("(UserService.tsx) Erro ao atualizar senha:", error);
  }
}

export async function UpdateEmail(
  currentPassword: string, newEmail: string, repeatNewEmail: string
) {

  const user = auth.currentUser;
  if (!user || !user.email) return;

  const inputs = { cPassword: currentPassword, nEmail: newEmail, rNewEmail: repeatNewEmail }
  const labels = { cPassword: 'senha atual', nEmail: 'novo email', rNewEmail: 'repetir novo email' }

  const isEmpty = !currentPassword || !newEmail || !repeatNewEmail;
  const isValid = !newEmail.includes("@");
  const isNotTheSame = newEmail !== repeatNewEmail;

  if (isEmpty) {
    const msg = ValidateEmptyFields(inputs, labels)
    { msg && Alert.alert("Erro", msg) }
    return;
  } else if (isValid) {
    Alert.alert("Formato de email incorreto", "Digite um email válido.");
    return;
  } else if (isNotTheSame) {
    Alert.alert("Os e-mails não coincidem", "Certifique-se de que ambos os e-mails sejam iguais.");
    return;
  }

  try {
    const credential = EmailAuthProvider.credential(
      user.email, currentPassword
    );

    await reauthenticateWithCredential(user, credential);
    await updateEmail(user, newEmail);
    
    await updateDoc(doc(db, "users", user.uid), {
      "identification.email": newEmail,
    });

    console.log("(UserService.tsx) Email atualizado com sucesso!");
    Alert.alert("Sucesso", "Email atualizado.");

    //await sendEmailVerification(user); // ✅ Envia verificação
  } catch (error) {
    console.error("(UserService.tsx) Erro ao atualizar email:", error);
  }
}

export async function UpdateName(groupId: string, name: string, surname: string) {
  const user = auth.currentUser;
  if (!user) return;

  const inputs = { name: name, surname: surname }
  const labels = { name: 'nome', surname: 'sobrenome' }

  const isEmpty = !name || !surname;

  if (isEmpty) {
    const msg = ValidateEmptyFields(inputs, labels)
    { msg && Alert.alert("Erro", msg) }

    return;
  }

  const fullName = `${name} ${surname}`

  try {
    await updateDoc(doc(db, "users", user.uid), {
      "identification.name": name.trim(),
      "identification.surname": surname.trim(),
    });

    await updateDoc(doc(db, 'groups', groupId), {
      [`members.${user.uid}.name`]: fullName.trim(),
    });
    Alert.alert("Sucesso", "Nome e sobrenome foram atualizados.");
  } catch (error) {
    Alert.alert("Erro", "Não foi possível atualizar o nome!");
    console.error("Erro", "Falha ao atualizar o nome: ", error);
  }
}
