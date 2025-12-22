import { auth, db } from "@/app/config/firebaseConfig";
import { UpdateEmailProps } from "@/app/types/User";
import { HandleErroMessage } from "@/components/ui/HandleErroMessage";
import ValidateEmptyFields from "@/components/ValidateEmptyFields";
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { Alert } from "react-native";

export default async function UpdateEmail(value: UpdateEmailProps) {

  const user = auth.currentUser;
  if (!user || !user.email) return;

  const inputs = { cPassword: value.currentPassword, nEmail: value.newEmail, rNewEmail: value.repeatNewEmail }
  const labels = { cPassword: 'senha atual', nEmail: 'novo email', rNewEmail: 'repetir novo email' }

  const isEmpty = !value.currentPassword || !value.newEmail || !value.repeatNewEmail;
  const isValid = !value.newEmail.includes("@");
  const isNotTheSame = value.newEmail !== value.repeatNewEmail;

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
      user.email, value.currentPassword
    );

    await reauthenticateWithCredential(user, credential);
    await updateEmail(user, value.newEmail);

    await updateDoc(doc(db, "users", user.uid), {
      "identification.email": value.newEmail,
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