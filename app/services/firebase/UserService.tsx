import { auth, db } from "@/app/config/firebaseConfig";
import { User } from "@/app/types/User";
import { HandleErroMessage } from "@/components/ui/HandleErroMessage";
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
    throw error; 
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
    const msg = ValidateEmptyFields(inputs, labels);
    if (msg) {
      Alert.alert("Erro", msg);
      throw new Error(msg);
    }
    return;
  } else if (isNotTheSame) {
    const msg = `As senhas não coicidem. Certifique-se de que os campos nova senha e repetir senha sejam iguais.`
    Alert.alert('Erro', msg);
    throw new Error(msg);
  }

  try {
    const credential = EmailAuthProvider.credential(
      user.email, currentPassword
    );

    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
    
    Alert.alert("Sucesso", "Senha atualizada.");
  } catch (error: any) {
    const msg = HandleErroMessage(error.code);
    Alert.alert("Erro", msg);
    throw error; 
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
    if (msg) {
      Alert.alert("Erro", msg);
      throw new Error(msg);
    }   
    return;
  } else if (isValid) {
    const msg = `Formato de email incorreto. Digite um email válido.`
    Alert.alert(msg);
    throw new Error(msg);
  } else if (isNotTheSame) {
    const msg = `Os e-mails não coincidem. Certifique-se de que ambos os e-mails sejam iguais.`
    Alert.alert('Erro', msg);
    throw new Error(msg);
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
  } catch (error: any) {
    const msg = HandleErroMessage(error.code)
    Alert.alert("Erro", msg);
    throw error; 
  }
}

export async function UpdateName(groupId: string, name: string, surname: string) {
  const user = auth.currentUser;
  if (!user) throw new Error("Usuário não autenticado.");

  const inputs = { name: name, surname: surname }
  const labels = { name: 'nome', surname: 'sobrenome' }

  const isEmpty = !name || !surname;
  if (isEmpty) {
    const msg = ValidateEmptyFields(inputs, labels);
    if (msg) {
      Alert.alert("Erro", msg);
      throw new Error(msg);
    }
  }

  const fullName = `${name} ${surname}`;

  try {
    await updateDoc(doc(db, "users", user.uid), {
      "identification.name": name.trim(),
      "identification.surname": surname.trim(),
    });

    await updateDoc(doc(db, 'groups', groupId), {
      [`members.${user.uid}.name`]: fullName.trim(),
    });

    Alert.alert("Sucesso", "Nome e sobrenome foram atualizados.");
  } catch (error: any) {
    const msg = HandleErroMessage(error.code)
    Alert.alert("Erro", msg);
    throw error; 
  }
}

